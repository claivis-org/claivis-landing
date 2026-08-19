import { NextResponse } from "next/server";
import Airtable from "airtable";
import { Resend } from "resend";
import { getWaitlistEmailHtml } from "./emailTemplate";

export const runtime = "nodejs";

type WaitlistRequestBody = {
  full_name?: unknown;
  name?: unknown;
  email?: unknown;
  school_name?: unknown;
  school?: unknown;
  phone?: unknown;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validationError(details: Record<string, string>) {
  return NextResponse.json(
    {
      error: {
        code: "invalid_request",
        message: "Please complete the required waitlist fields.",
        details,
      },
    },
    { status: 400 },
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistRequestBody;
    const fullName = cleanString(body.full_name || body.name);
    const schoolName = cleanString(body.school_name || body.school);
    const email = cleanString(body.email).toLowerCase();
    const phone = cleanString(body.phone);

    const errors: Record<string, string> = {};

    if (!fullName) {
      errors.full_name = "required";
    }

    if (!schoolName) {
      errors.school_name = "required";
    }

    if (!email) {
      errors.email = "required";
    } else if (!isValidEmail(email)) {
      errors.email = "invalid";
    }

    if (!phone) {
      errors.phone = "required";
    }

    if (Object.keys(errors).length > 0) {
      return validationError(errors);
    }

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      console.warn("Airtable credentials are not set. Simulating waitlist success.");
      return NextResponse.json({ success: true, mode: "local" });
    }

    const base = new Airtable({ apiKey }).base(baseId);
    const tableName = process.env.AIRTABLE_TABLE_NAME || "Waitlist";
    const nameFieldName = process.env.AIRTABLE_NAME_FIELD_NAME || "Name";
    const emailFieldName = process.env.AIRTABLE_EMAIL_FIELD_NAME || "Email";
    const schoolFieldName = process.env.AIRTABLE_SCHOOL_FIELD_NAME || "School";
    const phoneFieldName = process.env.AIRTABLE_PHONE_FIELD_NAME || "Phone";
    const statusFieldName = process.env.AIRTABLE_STATUS_FIELD_NAME || "Status";
    const defaultStatus = process.env.AIRTABLE_DEFAULT_STATUS;

    const fields: Record<string, string> = {
      [nameFieldName]: fullName,
      [emailFieldName]: email,
      [schoolFieldName]: schoolName,
      [phoneFieldName]: phone,
    };

    if (defaultStatus) {
      fields[statusFieldName] = defaultStatus;
    }

    try {
      await base(tableName).create([{ fields }]);
    } catch (error: unknown) {
      const airtableError = error as { error?: string };
      const shouldRetryWithoutStatus =
        Boolean(defaultStatus) && airtableError?.error === "INVALID_MULTIPLE_CHOICE_OPTIONS";

      if (!shouldRetryWithoutStatus) {
        throw error;
      }

      console.warn(
        `Airtable rejected ${statusFieldName}="${defaultStatus}". Retrying without the status field.`,
      );

      delete fields[statusFieldName];
      await base(tableName).create([{ fields }]);
    }

    // Send Welcome Email via Resend if API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Wisdom from Claivis <welcome@mail.useclaivis.com>";

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: fromEmail,
          to: [email],
          subject: "Welcome to the Claivis Waitlist!",
          html: getWaitlistEmailHtml({ fullName, schoolName }),
        });
      } catch (emailErr) {
        console.error("Failed to send welcome email via Resend:", emailErr);
        // We catch email errors so the waitlist submission itself does not fail for the user
      }
    } else {
      console.warn("RESEND_API_KEY is not set. Skipping welcome email delivery.");
    }

    return NextResponse.json({ success: true, mode: "airtable" });
  } catch (error) {
    console.error("Error saving waitlist request:", error);

    return NextResponse.json(
      {
        error: {
          code: "waitlist_submit_failed",
          message: "We could not save your waitlist request. Please try again.",
        },
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  const defaultFallback = {
    count: 0,
    recentNames: [] as string[],
  };

  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      return NextResponse.json(defaultFallback);
    }

    const base = new Airtable({ apiKey }).base(baseId);
    const tableName = process.env.AIRTABLE_TABLE_NAME || "Waitlist";
    const nameFieldName = process.env.AIRTABLE_NAME_FIELD_NAME || "Name";

    // Fetch latest records from Airtable
    const records = await base(tableName)
      .select({
        maxRecords: 100,
        fields: [nameFieldName],
      })
      .all();

    const count = records.length > 0 ? records.length : defaultFallback.count;
    const recentNames: string[] = [];

    // Get up to 4 most recent names
    for (let i = records.length - 1; i >= 0 && recentNames.length < 4; i--) {
      const val = records[i].get(nameFieldName);
      if (typeof val === "string" && val.trim()) {
        recentNames.push(val.trim());
      }
    }

    // Fill with default names if less than 4 exist in Airtable yet
    while (recentNames.length < 4) {
      recentNames.push(defaultFallback.recentNames[recentNames.length]);
    }

    return NextResponse.json({
      count,
      recentNames,
    });
  } catch (error) {
    console.error("Error fetching waitlist stats from Airtable:", error);
    return NextResponse.json(defaultFallback);
  }
}

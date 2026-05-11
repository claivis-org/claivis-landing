import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, school } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Initialize Airtable only if credentials exist
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      console.warn("Airtable credentials are not set. Simulating a successful request for development.");
      // If no credentials, simulate success so the frontend still works during testing
      return NextResponse.json({ success: true, message: 'Simulated success (no Airtable credentials found)' });
    }

    const base = new Airtable({ apiKey }).base(baseId);
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Waitlist';
    const statusFieldName = process.env.AIRTABLE_STATUS_FIELD_NAME || 'Status';
    const defaultStatus = process.env.AIRTABLE_DEFAULT_STATUS;

    const fields: Record<string, string> = {
      Name: name || '',
      Email: email,
      School: school || '',
    };

    if (defaultStatus) {
      fields[statusFieldName] = defaultStatus;
    }

    // Column names must match the Airtable base exactly.
    try {
      await base(tableName).create([{ fields }]);
    } catch (error: unknown) {
      const airtableError = error as { error?: string };
      const shouldRetryWithoutStatus =
        Boolean(defaultStatus) &&
        airtableError?.error === 'INVALID_MULTIPLE_CHOICE_OPTIONS';

      if (!shouldRetryWithoutStatus) {
        throw error;
      }

      console.warn(
        `Airtable rejected ${statusFieldName}=\"${defaultStatus}\". Retrying without the status field.`
      );

      delete fields[statusFieldName];
      await base(tableName).create([{ fields }]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving to Airtable:', error);
    return NextResponse.json({ error: 'Failed to save to waitlist' }, { status: 500 });
  }
}

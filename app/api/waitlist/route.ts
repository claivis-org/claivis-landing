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

    // Create a new record in the 'Waitlist' table
    // Important: The table name must be 'Waitlist' and the column names must match exactly!
    await base('Waitlist').create([
      {
        fields: {
          'Name': name || '',
          'Email': email,
          'School': school || '',
          'Status': 'New'
        }
      }
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving to Airtable:', error);
    return NextResponse.json({ error: 'Failed to save to waitlist' }, { status: 500 });
  }
}

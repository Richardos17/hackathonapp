import { google } from 'googleapis';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { timeSlot } = req.body; // Expecting a timeSlot in request body

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: 'v3', auth });

  try {
    const event = await calendar.events.insert({
      calendarId: process.env.CALENDAR_ID,
      requestBody: {
        summary: 'Football Pitch Reservation',
        start: { dateTime: timeSlot.start },
        end: { dateTime: timeSlot.end },
      },
    });

    res.status(200).json({ message: 'Reservation created', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating reservation', error });
  }
}

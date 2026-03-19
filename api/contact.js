import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(2000),
});

const sanitize = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = ContactSchema.parse(req.body || {});

    const payload = {
      name: sanitize(data.name),
      email: sanitize(data.email),
      subject: sanitize(data.subject),
      message: sanitize(data.message),
      receivedAt: new Date().toISOString(),
    };

    // --- NEW GOOGLE SHEETS FORWARDING LOGIC ---
    // 1. Paste your Google Web App URL here
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxtCysmjMVjAQjJJHDUEgorxuRG08eqEOgLqCl1kXhBJOEWo2Pzh_qizVKIiCaq004_/exec";

    // 2. Format the data so Google Apps Script can read it easily
    const formBody = new URLSearchParams();
    formBody.append("Name", payload.name);
    formBody.append("Email", payload.email);
    formBody.append("Subject", payload.subject);
    formBody.append("Message", payload.message);

    // 3. Send the data to Google
    const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formBody,
    });

    if (!googleResponse.ok) {
      throw new Error('Failed to forward data to Google Sheets');
    }
    // ------------------------------------------

    console.log('contact_submission forwarded successfully', payload);
    return res.status(200).json({ ok: true });

  } catch (err) {
    const message = err?.errors?.[0]?.message || err.message || 'Invalid input';
    return res.status(400).json({ error: message });
  }
}
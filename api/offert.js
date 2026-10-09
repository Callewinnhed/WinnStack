// Tar emot offertformuläret och skickar det vidare som mejl via Resend.
// Kräver miljövariabeln RESEND_API_KEY i Vercel. OFFERT_TO och OFFERT_FROM är valfria.
const TO = process.env.OFFERT_TO || 'c.winnhed@hotmail.com';
const FROM = process.env.OFFERT_FROM || 'WinnStack <offert@winnstack.com>';

function clean(value, max) {
  return String(value || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Not configured' });

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  // Dolt fält som bara robotar fyller i
  if (body.website) return res.status(200).json({ ok: true });

  const name = clean(body.name, 200);
  const email = clean(body.email, 200);
  const company = clean(body.company, 200);
  const type = clean(body.type, 100) || 'Övrigt';
  const current = clean(body.current, 500);
  const message = String(body.message || '').trim().slice(0, 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const text = [
    'Namn: ' + name,
    'E-post: ' + email,
    'Företag: ' + (company || 'Privatperson'),
    'Vad vill du ha hjälp med: ' + type,
    'Hur de löser det idag: ' + current,
    '',
    message
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject: 'Offertförfrågan: ' + type, text: text })
  });

  if (!response.ok) {
    console.error('Resend error', response.status, await response.text());
    return res.status(502).json({ error: 'Send failed' });
  }
  return res.status(200).json({ ok: true });
};

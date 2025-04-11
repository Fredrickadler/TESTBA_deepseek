// api/webhook.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = await req.json?.() ?? req.body;
    console.log('✅ دریافت اعلان:', body);

    // اینجا می‌تونی هر کاری کنی: ذخیره، ارسال پاسخ، لاگ و غیره
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
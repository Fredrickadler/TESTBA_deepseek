import { saveToken } from '../../lib/tokens';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, url } = req.body;
    if (!token || !url) return res.status(400).json({ error: 'Missing token or url' });

    saveToken({ token, url });
    console.log('✅ Token saved:', token);
    res.status(200).json({ ok: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
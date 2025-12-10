// send-notification.ts

import { getTokens } from '../../lib/tokens';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, body, targetUrl, notificationId, sendToAll } = req.body;

  const tokens = getTokens();
  if (!sendToAll || tokens.length === 0) {
    return res.status(400).json({ error: 'No tokens or sendToAll flag missing' });
  }

  try {
    for (const { token, url } of tokens) {
      await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notificationId,
          title,
          body,
          targetUrl,
          tokens: [token],
        }),
      });
    }

    res.status(200).json({ success: true });
  } catch (e) {
    console.error('Notification error:', e);
    res.status(500).json({ success: false, error: e.message });
  }
}
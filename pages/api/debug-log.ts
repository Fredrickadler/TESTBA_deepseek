// debug-log.ts
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { logs, userAgent, url, timestamp } = req.body;

    // Log to console for debugging
    console.log('=== DEBUG LOGS ===');
    console.log('Timestamp:', timestamp);
    console.log('User Agent:', userAgent);
    console.log('URL:', url);
    console.log('Logs:', JSON.stringify(logs, null, 2));
    console.log('==================');

    // You can also save to a database or external service here
    // For now, we just log to console

    return res.status(200).json({ 
      success: true,
      message: 'Logs received',
      received: logs.length 
    });
  } catch (error) {
    console.error('Debug log error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}


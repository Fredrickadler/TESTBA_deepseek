export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fid } = req.body;

  if (!fid) {
    return res.status(400).json({ error: 'FID is required' });
  }

  // دریافت API key و Wallet ID از environment variables
  const apiKey = process.env.NEYNAR_API_KEY;
  const walletId = process.env.NEYNAR_WALLET_ID;

  if (!apiKey || !walletId) {
    return res.status(500).json({ 
      error: 'Neynar API key or Wallet ID not configured' 
    });
  }

  // آدرس قرارداد جدید
  const contractAddress = '0xE3285ae14Ce5407AAa6F0135671108B237DaA789';

  try {
    // فراخوانی Neynar API برای مینت NFT
    const response = await fetch('https://api.neynar.com/v2/farcaster/nft/mint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'x-wallet-id': walletId,
      },
      body: JSON.stringify({
        network: 'base', // Base network
        contract_address: contractAddress,
        recipients: [
          {
            fid: parseInt(fid),
            quantity: 1,
          },
        ],
        async: false, // منتظر می‌مونیم تا تراکنش کامل بشه
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Neynar API error:', data);
      return res.status(response.status).json({ 
        error: data.message || 'Failed to mint NFT',
        details: data 
      });
    }

    // اگر تراکنش موفق بود
    if (data.transactions && data.transactions.length > 0) {
      const transaction = data.transactions[0];
      return res.status(200).json({
        success: true,
        transactionHash: transaction.transaction_hash,
        receipt: transaction.receipt,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    console.error('Mint NFT error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}


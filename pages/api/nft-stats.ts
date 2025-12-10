// nft-stats.ts

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const contractAddress = '0xE3285ae14Ce5407AAa6F0135671108B237DaA789';
  const totalSupply = 1000;
  const baseRpcUrl = 'https://mainnet.base.org';

  try {
    const functionSelector = '0x18160ddd';
    const data = functionSelector.padEnd(66, '0');

    const rpcResponse = await fetch(baseRpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            to: contractAddress,
            data: data,
          },
          'latest',
        ],
        id: 1,
      }),
    });

    const rpcData = await rpcResponse.json();
    
    let mintedCount = 0;
    if (rpcData.result && rpcData.result !== '0x') {
      mintedCount = parseInt(rpcData.result, 16);
    }

    const percentage = totalSupply > 0 
      ? Math.round((mintedCount / totalSupply) * 100) 
      : 0;

    const clampedPercentage = Math.min(100, Math.max(0, percentage));

    return res.status(200).json({
      success: true,
      minted: mintedCount,
      totalSupply: totalSupply,
      percentage: clampedPercentage,
    });

  } catch (error) {
    console.error('NFT Stats error:', error);
    
    return res.status(200).json({
      success: true,
      minted: 0,
      totalSupply: totalSupply,
      percentage: 0,
    });
  }
}

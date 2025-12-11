// nft-stats.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getMintCount } from '../../lib/db';

const TOTAL_SUPPLY = 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // دریافت تعداد مینت شده از دیتابیس
    const mintedCount = await getMintCount();

    // محاسبه درصد
    const percentage = TOTAL_SUPPLY > 0
      ? Math.round((mintedCount / TOTAL_SUPPLY) * 100)
      : 0;

    const clampedPercentage = Math.min(100, Math.max(0, percentage));

    return res.status(200).json({
      success: true,
      minted: mintedCount,
      totalSupply: TOTAL_SUPPLY,
      percentage: clampedPercentage,
    });

  } catch (error) {
    console.error('NFT Stats error:', error);
    
    // Fallback: استفاده از RPC اگر دیتابیس خطا داد
    try {
      const contractAddress = '0xE3285ae14Ce5407AAa6F0135671108B237DaA789';
      const baseRpcUrl = 'https://mainnet.base.org';
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

      const percentage = TOTAL_SUPPLY > 0
        ? Math.round((mintedCount / TOTAL_SUPPLY) * 100)
        : 0;

      const clampedPercentage = Math.min(100, Math.max(0, percentage));

      return res.status(200).json({
        success: true,
        minted: mintedCount,
        totalSupply: TOTAL_SUPPLY,
        percentage: clampedPercentage,
      });
    } catch (fallbackError) {
      console.error('Fallback RPC error:', fallbackError);
      
      return res.status(200).json({
        success: true,
        minted: 0,
        totalSupply: TOTAL_SUPPLY,
        percentage: 0,
      });
    }
  }
}

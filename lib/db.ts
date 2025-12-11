// db.ts
// Database connection and utilities

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Using fallback mode.');
}

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Helper function to get mint count
export async function getMintCount(): Promise<number> {
  if (!supabase) {
    // Fallback: return 0 if database not configured
    return 0;
  }

  try {
    const { count, error } = await supabase
      .from('nft_mints')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error getting mint count:', error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.error('Error in getMintCount:', err);
    return 0;
  }
}

// Helper function to save mint transaction
export async function saveMintTransaction(
  fid: number,
  transactionHash: string,
  tokenId?: number
): Promise<boolean> {
  if (!supabase) {
    console.warn('Database not configured. Mint not saved.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('nft_mints')
      .insert({
        fid,
        transaction_hash: transactionHash,
        token_id: tokenId,
      });

    if (error) {
      console.error('Error saving mint transaction:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error in saveMintTransaction:', err);
    return false;
  }
}

// Helper function to check if user already minted
export async function hasUserMinted(fid: number): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from('nft_mints')
      .select('id')
      .eq('fid', fid)
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking user mint:', error);
      return false;
    }

    return !!data;
  } catch (err) {
    console.error('Error in hasUserMinted:', err);
    return false;
  }
}


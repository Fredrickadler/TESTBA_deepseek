import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

sdk.configure({
    button: {
        wallet: '#connectWallet',
        mint: '#mintButton'
    }
});
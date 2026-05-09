import { createConfig, getRoutes, type RoutesRequest, Solana } from '@lifi/sdk';

// Initialize LI.FI Config with Solana support
createConfig({
  integrator: 'OpportunityOS',
  providers: [
    Solana({
      async getWalletClient() {
        return (window as any).solana;
      },
      async getSwitchChainHook() {
        return (async () => (window as any).solana) as any;
      },
    }),
  ],
});

/**
 * Fetches the best bridge/swap route from LI.FI
 * @param fromChain Chain ID (e.g., 'sol' for Solana, '137' for Polygon)
 * @param toChain Chain ID
 * @param fromToken Token address
 * @param toToken Token address
 * @param fromAmount Amount in atomic units (strings)
 */
export async function getLifiRoute(
  fromChain: string,
  toChain: string,
  fromToken: string,
  toToken: string,
  fromAmount: string
) {
  try {
    const request: RoutesRequest = {
      fromChainId: fromChain,
      toChainId: toChain,
      fromTokenAddress: fromToken,
      toTokenAddress: toToken,
      fromAmount: fromAmount,
      options: {
        slippage: 0.03,
        order: 'RECOMMENDED',
      },
    };

    console.log('Fetching LI.FI route with request:', request);
    const result = await getRoutes(request);
    
    if (!result.routes || result.routes.length === 0) {
      throw new Error('No routes found for this token/chain combination.');
    }

    return result.routes[0];
  } catch (error: any) {
    console.error('LI.FI route fetch failed details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
}

// Chain IDs for reference (LI.FI standard)
export const LIFI_CHAINS = {
  SOLANA: '115111108109', // Solana Mainnet
  POLYGON: '137',
  ETHEREUM: '1',
  ARBITRUM: '42161',
};

// Common token addresses on Solana (Mainnet)
export const SOL_TOKENS = {
  SOL: '11111111111111111111111111111111',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
};

// Common token addresses on Polygon
export const POLYGON_TOKENS = {
  MATIC: '0x0000000000000000000000000000000000001010',
  USDC: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
};

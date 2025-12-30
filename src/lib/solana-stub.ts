/**
 * Stub module for Solana dependencies that Privy optionally uses.
 * Since we're only using Ethereum embedded wallets, we don't need Solana functionality.
 * This stub prevents build errors from optional peer dependencies.
 */

// Stub for @solana-program/system
export function getTransferSolInstruction() {
  throw new Error('Solana functionality is not enabled in this application');
}

export default {};

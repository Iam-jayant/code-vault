import { x402Paywall } from "x402plus";

export const paywallMiddleware = x402Paywall(
  process.env.MOVEMENT_PAY_TO as string,
  {
    "POST /api/transactions": {
      network: "movement",
      asset: "0x1::aptos_coin::AptosCoin",
      maxAmountRequired: "100000000", // 1 MOVE
      description: "Unlock transaction features",
      mimeType: "application/json",
      maxTimeoutSeconds: 600
    },
    "GET /api/access/private-resource": {
      network: "movement",
      asset: "0x1::aptos_coin::AptosCoin",
      maxAmountRequired: "50000000", // 0.5 MOVE
      description: "Premium access",
      mimeType: "application/json",
      maxTimeoutSeconds: 600
    }
  },
  {
    url: "https://facilitator.stableyard.fi"
  }
);

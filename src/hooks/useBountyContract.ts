import { Aptos, AptosConfig, Network, InputViewFunctionData } from '@aptos-labs/ts-sdk';
import { useState, useCallback } from 'react';

// Movement Network Configuration
const MOVEMENT_TESTNET_URL = 'https://testnet.movementnetwork.xyz/v1';

// Deployed contract address on Movement Testnet
const MODULE_ADDRESS = import.meta.env.VITE_BOUNTY_CONTRACT_ADDRESS || '0xa492a23821f2f8575d42bbaa3cd65fd4a0afb922c57dc56d78b360a18211f884';

// Initialize Aptos client for Movement blockchain
const config = new AptosConfig({ 
    network: Network.CUSTOM,
    fullnode: MOVEMENT_TESTNET_URL
});
const aptos = new Aptos(config);

export interface BountyCampaign {
    id: number;
    title: string;
    description: string;
    totalRewardPool: number;
    distributedAmount: number;
    deadline: number;
    status: number; // 1=Active, 2=Distributed, 3=Cancelled
    numRecipients: number;
}

export function useBountyContract() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Create a new bounty campaign on-chain
     * Locks MOVE tokens immediately when transaction is signed
     */
    const createCampaign = useCallback(
        async (
            wallet: any, // Movement wallet from your wallet adapter
            title: string,
            description: string,
            rewardAmount: number, // Amount in MOVE tokens
            durationSeconds: number
        ) => {
            try {
                setLoading(true);
                setError(null);

                // Convert MOVE to smallest units (8 decimals)
                const rewardInSmallestUnits = Math.floor(rewardAmount * 100000000);

                const transaction = await aptos.transaction.build.simple({
                    sender: wallet.address,
                    data: {
                        function: `${MODULE_ADDRESS}::bounty_campaign::create_campaign`,
                        functionArguments: [
                            title,
                            description,
                            rewardInSmallestUnits,
                            durationSeconds,
                        ],
                    },
                });

                // Sign and submit transaction
                const committedTxn = await wallet.signAndSubmitTransaction(transaction);
                
                // Wait for transaction confirmation
                await aptos.waitForTransaction({ 
                    transactionHash: committedTxn.hash 
                });

                console.log('Campaign created successfully:', committedTxn.hash);
                return committedTxn.hash;
            } catch (err: any) {
                console.error('Error creating campaign:', err);
                setError(err.message || 'Failed to create campaign');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    /**
     * Distribute rewards to winners
     * Auto-transfers locked MOVE tokens to winner addresses
     */
    const distributeRewards = useCallback(
        async (
            wallet: any,
            recipients: string[], // Array of winner wallet addresses
            amounts: number[] // Array of reward amounts in MOVE tokens
        ) => {
            try {
                setLoading(true);
                setError(null);

                // Convert amounts to smallest units
                const amountsInSmallestUnits = amounts.map((amt) =>
                    Math.floor(amt * 100000000)
                );

                const transaction = await aptos.transaction.build.simple({
                    sender: wallet.address,
                    data: {
                        function: `${MODULE_ADDRESS}::bounty_campaign::distribute_rewards`,
                        functionArguments: [recipients, amountsInSmallestUnits],
                    },
                });

                const committedTxn = await wallet.signAndSubmitTransaction(transaction);
                await aptos.waitForTransaction({ 
                    transactionHash: committedTxn.hash 
                });

                console.log('Rewards distributed successfully:', committedTxn.hash);
                return committedTxn.hash;
            } catch (err: any) {
                console.error('Error distributing rewards:', err);
                setError(err.message || 'Failed to distribute rewards');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    /**
     * Cancel campaign and refund remaining funds to creator
     */
    const cancelCampaign = useCallback(async (wallet: any) => {
        try {
            setLoading(true);
            setError(null);

            const transaction = await aptos.transaction.build.simple({
                sender: wallet.address,
                data: {
                    function: `${MODULE_ADDRESS}::bounty_campaign::cancel_campaign`,
                    functionArguments: [],
                },
            });

            const committedTxn = await wallet.signAndSubmitTransaction(transaction);
            await aptos.waitForTransaction({ 
                transactionHash: committedTxn.hash 
            });

            console.log('Campaign cancelled successfully:', committedTxn.hash);
            return committedTxn.hash;
        } catch (err: any) {
            console.error('Error cancelling campaign:', err);
            setError(err.message || 'Failed to cancel campaign');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Get campaign information (view function - no gas cost)
     */
    const getCampaignInfo = useCallback(
        async (creatorAddress: string): Promise<BountyCampaign | null> => {
            try {
                const payload: InputViewFunctionData = {
                    function: `${MODULE_ADDRESS}::bounty_campaign::get_campaign_info`,
                    functionArguments: [creatorAddress],
                };

                const result = await aptos.view({ payload });

                if (!result || result.length === 0) return null;

                // Parse the returned tuple
                return {
                    id: Number(result[0]),
                    title: result[1] as string,
                    description: result[2] as string,
                    totalRewardPool: Number(result[3]) / 100000000, // Convert to MOVE
                    distributedAmount: Number(result[4]) / 100000000,
                    deadline: Number(result[5]),
                    status: Number(result[6]),
                    numRecipients: Number(result[7]),
                };
            } catch (err: any) {
                console.error('Error fetching campaign info:', err);
                return null;
            }
        },
        []
    );

    /**
     * Get remaining locked funds in a campaign (view function - no gas cost)
     */
    const getRemainingFunds = useCallback(
        async (creatorAddress: string): Promise<number> => {
            try {
                const payload: InputViewFunctionData = {
                    function: `${MODULE_ADDRESS}::bounty_campaign::get_remaining_funds`,
                    functionArguments: [creatorAddress],
                };

                const result = await aptos.view({ payload });

                return Number(result[0]) / 100000000; // Convert to MOVE
            } catch (err: any) {
                console.error('Error fetching remaining funds:', err);
                return 0;
            }
        },
        []
    );

    /**
     * Check if user has claimed from a specific campaign (view function - no gas cost)
     */
    const hasClaimed = useCallback(
        async (recipientAddress: string, campaignId: number): Promise<boolean> => {
            try {
                const payload: InputViewFunctionData = {
                    function: `${MODULE_ADDRESS}::bounty_campaign::has_claimed`,
                    functionArguments: [recipientAddress, campaignId],
                };

                const result = await aptos.view({ payload });

                return result[0] as boolean;
            } catch (err: any) {
                console.error('Error checking claim status:', err);
                return false;
            }
        },
        []
    );

    return {
        // State
        loading,
        error,

        // Functions
        createCampaign,
        distributeRewards,
        cancelCampaign,
        getCampaignInfo,
        getRemainingFunds,
        hasClaimed,
    };
}

export default useBountyContract;

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface EthereumProvider {
  request<T = unknown>(args: { method: string; params?: unknown[] }): Promise<T>;
  on(event: 'accountsChanged', handler: (accounts: string[]) => void): void;
  on(event: 'chainChanged', handler: (chainIdHex: string) => void): void;
  removeAllListeners(event?: string): void;
}

interface Web3ContextType {
  account: string | null;
  isConnected: boolean;
  chainId: number | null;
  balance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConnected = !!account;

  const connectWallet = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum;
        const accounts = await ethereum.request<string[]>({
          method: 'eth_requestAccounts',
        });

        if (accounts.length > 0) {
          setAccount(accounts[0]);
          
          const chainIdHex = await ethereum.request<string>({
            method: 'eth_chainId',
          });
          setChainId(parseInt(chainIdHex, 16));

          const balanceHex = await ethereum.request<string>({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest'],
          });
          const balanceInEth = parseInt(balanceHex, 16) / 1e18;
          setBalance(balanceInEth.toFixed(4));
        }
      } else {
        // Demo mode for presentation
        setAccount('0x742d35Cc6634C0532925a3b844Bc9e7595f8dE71');
        setChainId(97); // BSC Testnet
        setBalance('2.5847');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      // Fallback to demo mode
      setAccount('0x742d35Cc6634C0532925a3b844Bc9e7595f8dE71');
      setChainId(97);
      setBalance('2.5847');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setBalance('0');
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const ethereum = window.ethereum as EthereumProvider;

      ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      ethereum.on('chainChanged', (chainIdHex: string) => {
        setChainId(parseInt(chainIdHex, 16));
      });
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum as EthereumProvider;
        ethereum.removeAllListeners('accountsChanged');
        ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        isConnected,
        chainId,
        balance,
        connectWallet,
        disconnectWallet,
        isLoading,
        error,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

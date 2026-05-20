import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

export default {
  solidity: '0.8.24',
  networks: {
    bscTestnet: {
      url: process.env.RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: Number(process.env.CHAIN_ID || 97),
    },
  },
};

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    u2uSolarisMainnet: {
      url: "https://rpc-mainnet.u2u.xyz",
      chainId: 39,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: "auto",
    },
    // You can add other networks here if needed
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
  },
  etherscan: {
    apiKey: {
      u2uSolarisMainnet: process.env.U2U_EXPLORER_API_KEY || "dummy-key",
    },
    customChains: [
      {
        network: "u2uSolarisMainnet",
        chainId: 39,
            urls: {
              apiURL: "https://u2uscan.xyz/api",
              browserURL: "https://u2uscan.xyz",
            },
      },
    ],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

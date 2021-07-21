require("dotenv").config();
const { alice } = require("./scripts/sandbox/accounts");

module.exports = {
  buildsDir: "builds",
  migrationsDir: "migrations",
  contractsDir: "contracts/main",
  ligoVersion: "0.19.0",
  networks: {
    development: {
      rpc: "http://localhost:8732",
      network_id: "*",
      secretKey: alice.sk,
    },
    edonet: {
      rpc: "https://testnet-tezos.giganode.io",
      network_id: "*",
      secretKey: alice.sk,
    },
    mainnet: {
      rpc: "https://mainnet.smartpy.io",
      network_id: "*",
      secretKey: alice.sk,
    },
  },
};
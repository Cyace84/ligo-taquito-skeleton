require("dotenv").config();
const { alice } = require("./scripts/sandbox/accounts");

module.exports = {
  buildsDir: "builds",
  migrationsDir: "migrations",
  contractsDir: "contracts/main",
  ligoVersion: "0.29.0",
  networks: {
    development: {
      rpc: "http://localhost:8732",
      network_id: "*",
      secretKey: alice.sk,
    },
    hangzhounet: {
      rpc: "https://hangzhounet.api.tez.ie/",
      port: 443,
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

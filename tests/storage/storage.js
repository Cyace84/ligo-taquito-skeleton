const { MichelsonMap } = require("@taquito/michelson-encoder/");
// const { attachKind } = require("@taquito/taquito/dist/types/operations/types");
const { alice, bob, eve } = require("../../scripts/sandbox/accounts");

module.exports = {
  owner: alice.pkh,
};

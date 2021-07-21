const { MichelsonMap } = require("@taquito/michelson-encoder");
const { alice } = require("../scripts/sandbox/accounts");


module.exports = {
  owner: alice.pkh,
  foo: 0
};

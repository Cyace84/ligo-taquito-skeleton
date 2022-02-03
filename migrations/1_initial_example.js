const { migrate } = require("../scripts/helpers");
const exampleStorage = require("../storage/Example");

module.exports = async tezos => {
  const contractAddress = await migrate(tezos, "example", exampleStorage);
  console.log(`Example contract address: ${contractAddress}`);
};

const { Tezos, signerAlice, signerBob } = require("./utils/cli");
const { migrate } = require("../scripts/helpers");
const { rejects, strictEqual, notStrictEqual } = require("assert");

const { alice } = require("../scripts/sandbox/accounts");

describe("Example test", async function () {
  let contract;

  before(async () => {
    try {
      Tezos.setSignerProvider(signerAlice);
      const storage = require("./storage/storage");

      const deployedContract = await migrate(
        Tezos,
        "Example",
        storage,
      );
      contract = await Tezos.contract.at(deployedContract);

    } catch (e) {
      console.log(e);
    }
  });

  describe("Testing entrypoint: Example", async function () {
    it("Revert example", async function () {
      await rejects(contract.methods.example(2).send(), err => {
        strictEqual(err.message, "Example");
        return true;
      });
    });
    it("Should allow example", async function () {
      const op = await contract.methods.example(1).send();
      await op.confirmation();
      const storage = await contract.storage()
      strictEqual(storage.foo.toNumber(), 42);
    });
  });
});

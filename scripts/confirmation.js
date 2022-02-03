const { OpKind } = require("@taquito/taquito");

const SYNC_INTERVAL = 10000;
const CONFIRM_TIMEOUT = 60000;

async function confirmOperation(
  tezos,
  opHash,
  { initializedAt, fromBlockLevel, signal } = {}
) {
  if (!initializedAt) initializedAt = Date.now();
  if (initializedAt && initializedAt + CONFIRM_TIMEOUT < Date.now()) {
    throw new Error("Confirmation polling timed out");
  }

  const startedAt = Date.now();
  let currentBlockLevel;

  try {
    const currentBlock = await tezos.rpc.getBlock();
    currentBlockLevel = currentBlock.header.level;

    for (
      let i = fromBlockLevel ?? currentBlockLevel;
      i <= currentBlockLevel;
      i++
    ) {
      const block =
        i === currentBlockLevel
          ? currentBlock
          : await tezos.rpc.getBlock({ block: i });

      const opEntry = await findOperation(block, opHash);
      if (opEntry) {
        return opEntry;
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }
  }

  if (signal?.aborted) {
    throw new Error("Cancelled");
  }

  const timeToWait = Math.max(startedAt + SYNC_INTERVAL - Date.now(), 0);
  await new Promise((r) => setTimeout(r, timeToWait));

  return confirmOperation(tezos, opHash, {
    initializedAt,
    fromBlockLevel: currentBlockLevel ? currentBlockLevel + 1 : fromBlockLevel,
    signal,
  });
}

async function findOperation(block, opHash) {
  for (let i = 3; i >= 0; i--) {
    for (const op of block.operations[i]) {
      if (op.hash === opHash) {
        return op;
      }
    }
  }
  return null;
}

function getOriginatedContractAddress(opEntry) {
  const results = Array.isArray(opEntry.contents)
    ? opEntry.contents
    : [opEntry.contents];
  const originationOp =
    results.find((op) => op.kind === OpKind.ORIGINATION) | undefined;
  return (
    originationOp?.metadata?.operation_result?.originated_contracts?.[0] ?? null
  );
}

async function confirmContract(Tezos, deployedContract) {
  let contract;
  do {
    contract = await Tezos.contract.at(deployedContract).catch((e) => {});
  } while (contract === undefined);
  return contract;
}

module.exports.confirmContract = confirmContract;
module.exports.confirmOperation = confirmOperation;
module.exports.findOperation = findOperation;
module.exports.getOriginatedContractAddress = getOriginatedContractAddress;

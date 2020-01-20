---
id: standard-exits
title: Standard Exits
sidebar_label: Standard Exits
---

Exits provide the ability to exit funds from the OmiseGO Network back onto the Rootchain. There are 2 types of exits, standard exits and in-flight exits. This section will only discuss standard exits.

A standard exit can be performed by a user who has access to the contents of a valid block where their transaction has been included.

> The exit protocol forms the crux of the Plasma design. This guide aims to only discuss implementation of these concepts with respect to the OmiseGO Network. If you want a deeper dive of these concepts, further discussion can be found on the [MoreVP Technical Overview](morevp-technical-overview).

> The standard exit process is the same for both ETH and ERC20 UTXOs.

## Implementation
Below are the necessary steps to take when performing a standard exit. Each step is explained in more detail in this guide.

1. Make sure that an exit queue exits for the token in the UTXO being exited.
2. Get the exiting UTXO's information.
3. Start the standard exit.

## Checking the Exit Queue
Exits are processed in queues. Before starting a standard exit, the exit queue for that token must exist. Calls are made directly to the Plasma framework contract to get this information.

```js
async function checkForExitQueue (tokenAddress) {
  // called to check for the existence of an exit queue
  const queueForTokenExists = await rootChain.hasToken(tokenAddress)

  if (!queueForTokenExists) {
    // add the exit queue for this token if it doesn't exist
    return rootChain.addToken({
      token: tokenAddress,
      txOptions: {
        from: Alice,
        privateKey: AlicePrivateKey
      }
    })
  }
}
```

## Getting UTXO Information
In order to start a standard exit, you first need to retrieve the UTXO information that you want to exit. This can be accomplished with calls to the Watcher. The Watcher is able to return Alice's UTXO information and provide the exit data necessary to start the standard exit.

```js
async function getUTXOInformation () {
  const alicesUtxos = await childChain.getUtxos(Alice)

  // we will naively take Alice's first UTXO for the sake of this example
  const exitData = await childChain.getExitData(alicesUtxos[0])
}
```

## Starting the Standard Exit
With a valid UTXO and exit data returned from the Watcher, Alice can now start her standard exit. A standard exit involves the `Payment Exit Game` contract, with the initiator of the standard exit commiting an `exit bond`. The purpose of this bond is simply an economic mechanism to incentivize users to act honestly when starting an exit, since the bond will be awarded to any user that can disprove the canonicity of the transaction.

```js
rootChain.startStandardExit({
  utxoPos: exitData.utxo_pos,
  outputTx: exitData.txbytes,
  inclusionProof: exitData.proof,
  txOptions: {
    from: Alice,
    privateKey: AlicePrivateKey
  }
})
```

> **Helpful Tip**
>
> You can only exit one UTXO at a time. Therefore, it is recommended that you consolidate your UTXOs to reduce the number of exits you'll need to perform. See the [transfer](transfers) guide for further information on merging UTXOs.

After the exit has started Alice has to wait for the [challenge period](challenges) to pass before being able to [process](process-exits) her exit.
---
id: version-0.0.1-challenging-exits
title: Challenging Exits
sidebar_label: Challenging Exits
original_id: challenging-exits
---

The process of challenging exits takes place during a defined challenge period after an exit has started. The challenge period exists to provide time for other users to challenge dishonest exits.

## Lifecycle

1. Standard exit or in-flight exit is initiated.
2. Challenge period starts.
3. If the exit is dishonest, the Watcher will report a byzantine event.
3. Users on the network challenge and respond to reported byzantine events.
4. Challenge period expires. Any exit that is unchallenged is finalized, while any exit that is successfully challenged is cancelled. Bonds are rewarded to successful challengers, or returned to users who committed them.


## Watcher Alerts
The Watcher broadcasts any byzantine event it detects on the OMG Network. Should the event be [challengeable](#challengeable-events), a user can decide whether or not to "challenge" based on this information. 

> These events are reported in the Watcher's `/status.get` endpoint providing an array of byzantine events. `omg-js` provides a helper function to get this report.

```js
childChain.status()
```

## Challengeable Events
These are byzantine events reported by the Watcher that require action by users. 

#### `invalid_exit`

Indicates that an invalid standard exit is occurring. It should be challenged.


**Scenario**

* Alice sends `UTXO1` to Bob. The associated transaction is included in a block.
* Alice initiates a standard exit on `UTXO1`. 

**Event** 

Watcher reports an `invalid_exit`:

```json
{
  "event": "invalid_exit",
  "details": {
    "eth_height": 3521678,
    "utxo_pos": 10000000010000000,
    "owner": "0xb3256026863eb6ae5b06fa396ab09069784ea8ea",
    "currency": "0x0000000000000000000000000000000000000000",
    "amount": 100
  }
}
```

**Solution**

* Anyone can challenge Alice’s exit by proving that Alice has already spent the UTXO in another transaction.
* If the challenge is successful, Alice does not exit the tokens and the challenger is awarded the exit bond that Alice put up when starting the exit.

**Implementation**

We can use the byzantine event information reported by the Watcher to retrieve the data required to challenge the exit. We then can make a call to the `Payment Exit Game` contract calling `challengeStandardExit()`. 

In the example below, Bob has seen the reported `invalid_exit` event and proceeds to challenge the exit. He will receive Alice's posted bond if the challenge is successful.

```js
async function challengeInvalidExit () {
  const challengeData = await childChain.getChallengeData(invalidExit.details.utxo_pos)
  return rootChain.challengeStandardExit({
    standardExitId: challengeData.exit_id,
    exitingTx: challengeData.exiting_tx,
    challengeTx: challengeData.txbytes,
    inputIndex: challengeData.input_index,
    challengeTxSig: challengeData.sig,
    txOptions: {
      from: Bob,
      privateKey: BobPrivateKey
    }
  })
}
```

#### `noncanonical_ife`
Indicates an in-flight exit of a non-canonical transaction has been started. It should be challenged.

**Scenario**

* Alice creates a transaction `TX1` to Bob, using `UTXO1` as an input. `TX1` is included in a block. 
* Alice then creates a non-canonical transaction `TX2` to Carol with the same input `UTXO1` (double spend). `TX2` is not included in a block. 
* Alice initiates an in-flight exit on `TX2`.

**Event**

* Watcher reports a `noncanonical_ife`:

```json
{
  "event": "noncanonical_ife",
  "details": {
    "txbytes": "0xf3170101c0940000..."
  }
}
```

**Solution**
* Bob sees that Alice has initiated an in-flight exit on a non-canonical transaction.
* Bob challenges Alice's in-flight exit by showing that `UTXO1` was spent in `TX1`.
* Alice is unable to exit `UTXO1` and loses her exit bond to Bob.


**Implementation**

```js
rootChain.challengeInFlightExitNonCanonical({
  inputTx,
  inputUtxoPos,
  inFlightTx,
  inFlightTxInputIndex,
  competingTx,
  competingTxInputIndex,
  competingTxPos,
  competingTxInclusionProof,
  competingTxWitness,
  txOptions: {
    from: Bob,
    privateKey: BobPrivateKey,
  }
})
```

#### `invalid_ife_challenge`
Indicates a canonical in-flight exit has been challenged. The challenge should be responded to.

**Scenario**

* Alice sends `UTXO1` to Bob, but Bob does not see the transaction `TX1` get included in a block. He assumes the operator is withholding, so he attempts to exit his output via an in-flight exit.
* Bob starts his in-flight exit on `TX1`.
* Alice sends a transaction `TX2` to Carol using the same `UTXO1` (double spend). This transaction is not included in a block.
* `TX1` is eventually included in a block.
* Carol sees that Bob is trying to exit a transaction with the same input that Alice has sent her.
* Carol uses `TX2`to challenge Bob's IFE as non-canonical.

**Event** 

The Watcher reports an `invalid_ife_challenge`: 


```json
{
  "event": "invalid_ife_challenge",
  "details": {
    "txbytes": "0xf3170101c0940000..."
  }
}
```

**Solution**

* Bob uses `TX1` (along with its inclusion proof) to prove that the challenge is invalid. 

**Implementation**

```js
async function respondToInvalidIFEChallenge () {
  const proof = await childChain.inFlightExitProveCanonical(invalidChallenge.details.txbytes)
  return rootChain.respondToNonCanonicalChallenge({
    inFlightTx: proof.in_flight_txbytes,
    inFlightTxPos: proof.in_flight_tx_pos,
    inFlightTxInclusionProof: proof.in_flight_proof,
    txOptions: {
      from: Bob
      privateKey: BobPrivateKey,
    }
  })
}
```


#### `invalid_piggyback`
Indicates an invalid piggyback is in process. Should be challenged.


**Scenario**

* Alice sends `UTXO1` to Bob in `TX1`. `TX1` is included in a block. 
* Bob initiates an in-flight exit on `TX1` and places an `exit_bond`.
* Bob piggybacks onto the exit referencing `UTXO1` and commiting a `piggyback bond`.
* Bob sends `UTXO1` to Carol in `TX2`. `TX2` is included in a block.

**Event**

The Watcher reports an `invalid_piggyback` event: 

```json
{
  "event": "invalid_piggyback",
  "details": {
    "txbytes": "0xf3170101c0940000...",
    "inputs": [1],
    "outputs": [0]
  }
}
```
Notes: 
- The Watcher does not report a `noncanonical_ife` event as `TX1` is a canonical transaction included in a valid block.
- The `invalid_piggyback` event can be reported only once `TX2` has been detected by the Watcher, either as part of a valid block (as in the scenario above) or if referenced by another in-flight exit.

**Solution**

 * Carol uses `TX2` to challenge Bob's piggyback. 
 * Bob does not exit his output, and Carol receives the `piggyback bond` committed by Bob,


**Implementation**

```js
async function challengeInvalidPiggyback () {
  const challengeData = await childChain.inFlightExitGetOutputChallengeData(exitData.in_flight_tx, inputIndex)
  return rootChain.challengeInFlightExitOutputSpent({
    inFlightTx: challengeData.in_flight_txbytes,
    inFlightTxInclusionProof: challengeData.in_flight_proof,
    inFlightTxOutputPos: challengeData.in_flight_output_pos,
    challengingTx: challengeData.spending_txbytes,
    challengingTxInputIndex: challengeData.spending_input_index,
    challengingTxWitness: challengeData.spending_sig,
    txOptions: {
      privateKey: CarolPrivateKey,
      from: Carol
    }
  })
}
```

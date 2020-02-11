---
id: version-0.0.1-merging-utxos
title: Merging UTXOs
sidebar_label: Merging UTXOs
original_id: merging-utxos
---

## Scenarios

There are two scenarios whereby it would be desirable to merge UTXOs on the OMG Network. 

1. **Exiting your funds as a single UTXO**

Standard exits are initated on a single UTXO and not a specified amount. However, a user may want to exit an amount greater than the value of any UTXO he or she owns. For example: 

- Alice owns 4 UTXOs worth 1 ETH each. 
- Alice would like to withdraw all her funds from the network. 
- To exit her funds, Alice would need to initiate a `Standard Exit` (each with an `exit bond`) on each UTXO.

In the above scenario, it would be more economical for Alice to merge these UTXOs and exit a single one.


2. **Fitting Inputs into a Transaction**

A transaction can have a maximum of four inputs, but a user may not own four UTXOs that can cover the amount needed for the transaction. For example: 

- Alice owns 5 UTXOs worth 1 ETH each. 
- Alice would like to send 5 ETH to Bob. 
- Alice cannot send 5 ETH to Bob in a single transaction as a transaction can only take four inputs. 

In the above scenario, Alice can merge her UTXOs in order to send the desired amount to Bob in a single transaction.

## Cost of Merge Transactions

No fee is charged for a merge transaction on the OMG Network. 

> For this purpose, a merge transaction is defined as a transaction whose inputs and outputs all belong to the same address.

## Implementation

A merge transaction is formatted as an ordinary transaction, but with the sender specified as the recipient.

**Code Example**

```js
const payments = [{
    owner: Bob,
    currency: <UTXO_CURRENCY>,
    amount: <UTXO_TOTAL_AMOUNT>
}];
const txBody = OmgUtil.transaction.createTransactionBody({
    fromAddress: Bob,
    fromUtxos: [BobsUTXO1, BobsUTXO2],
    payments,
    fee: {
    amount: 0,
    currency: transaction.ETH_CURRENCY
    }
});

... and type/sign/send
```



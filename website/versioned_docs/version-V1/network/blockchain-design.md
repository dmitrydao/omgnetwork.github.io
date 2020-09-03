---
id: version-V1-blockchain-design
title: Blockchain Design
sidebar_label: Blockchain Design
original_id: blockchain-design
---

This page describes the blockchain (consensus) design used by the first iteration of OMG Network Plasma-based implementation. This design is a modified version of [Minimal Viable Plasma design](https://ethresear.ch/t/minimal-viable-plasma/426).
 
> This content assumes that you have prior knowledge of Ethereum and general familiarity with Plasma.
 
### Tesuji Plasma architecture
Tesuji Plasma's architecture allows cheaper transactions and higher throughput, without sacrificing security. Users make transactions on a child chain that derives its security from a root chain. 
 
Child chain refers to a blockchain that coalesces multiple transactions into a child chain block, compacting them into a single, cheap transaction on a root chain. OMG Network's root chain is the Ethereum blockchain.
 
### OMG Network's blockchain design
The key features of OMG Network's blockchain design may be viewed as deviations from the big picture Plasma that is outlined by the original Plasma paper:
 
1. Only supports transactions transferring value between addresses.
 
   Value transfer can take the form of an atomic swap; that is two currencies being exchanged in a single transaction (multiple currencies: Eth + ERC20).
 
2. It is a non-p2p, proof-of-authority network. 
 
   The child chain is centrally controlled by a designated, fixed Ethereum address (the child chain operator); other participants (that is, users) connect to the child chain server.
 
3. Employs a single-tiered Plasma construction. That is, the child chain doesn't serve as a parent of any chain.
 
4. Does not allow cheap, coordinated mass exits. 
 
 
### Security and scalability
Security and scalability are built into the design, with the following features: 
 
1. Deposit funds into a contract on the root chain.
2. Make inexpensive, multiple transfers of funds deposited on the child chain.
3. Exit any funds held on the child chain, and securely reclaim them on the root chain.
4. Every exit of funds held on the child chain must come with proof that the exit is justified. The following sections clarify the nature of such proof (an attestation or evidence justifying the exit).
 
#### Proving a justified exit
Exits are allowed regardless of the state of the PoA child chain. Thus, funds held on the child chain and on the root chain may be treated as equivalent. Thus, if anything goes wrong on the child chain, everyone must exit to the root chain.
 
Plasma architecture presumes root chain availability.  
 
### Components driving consensus
 
The following components drive consensus: 
* Root chain contract
* Child chain server
* Watcher
 
Each component is discussed in this article.
 
## Root chain contract
The root chain contract secures the child chain. This includes the following:
 
* Holds funds deposited by other addresses.
* Tracks child chain block hashes that include information about funds deposit to the child chain.
* Manages secure exiting of funds, including exits of in-flight transactions.
 
The child chain, and the root chain contract that secures it, manage funds using the UTXO model.
 
### Deposits
Any Ethereum address may deposit ETH or ERC20 tokens into the root chain contract. Deposits increase the pool of funds held by the root chain contract and also signals to the child chain server that the funds should be accessible on the child chain.
 
Deposited funds are recognized as a single UTXO on the child chain. The UTXO can then be spent on the child chain (provided that the child chain server follows consensus), or it can be exited immediately on the root chain (regardless of whether the child chain server follows consensus).
 
Depositing involves forming a pseudo-block of the child chain. The pseudo block contains a single transaction with the deposited funds as a new UTXO.
 
### Exits w/ exit challenges
Exits are the most important part of the root chain contract. Exits provide the equivalence of funds sitting in the child chain vs funds on the root chain.
 
Exits must satisfy the following conditions:
| Condition | Description |
| ---       |   ---       |
| E1        | Only funds represented by UTXOs that were provably included in the child chain may be exited. This means that only funds that provably existed may be exited. |
| E2        | Attempts to exit funds that have been provably spent on the child chain, must be thwarted and punished. |
| E3        | If the attacking child chain operator submits a block with dishonest UTXOs attempting to exit them, the priority is given to earlier UTXOs. This allows all UTXOs created before the dishonest UTXOs to exit first. |
| E4        | In-flight funds (funds locked up in a transaction) that might be included in the child chain, must be able to exit funds with known inclusion. |
 
#### Submitting exit requests and challenging
 
The following mechanisms satisfy conditions E1 and E2, depending on the inclusion:
* Regular exit
* In-flight exit
 
##### Regular exit
May be used by UTXOs containing the transaction with details about the creation of these UTXOs.
 
Any Ethereum address that can prove possession of funds (UTXO) on the child chain can submit a request to exit.
 
The proof involves showing the transaction that contains the UTXO as output, and proving that the transaction is included in one of the submitted child chain blocks.
 
However, additional attestation is required to allow the withdrawal of funds from the root chain contract. The submitted exit request must still withstand a challenge period allowing anyone to provide evidence that the exited UTXO has been spent.
 
The evidence consists of a signed transaction, showing the spending of the exiting UTXO, regardless of its inclusion.
 
An exit challenge period counts from the exit request submission until this exit's scheduled finalization time.
 
A successful and timely exit challenge invalidates the exit.
 
##### In-flight exit
 
May be used by in-flight funds where the inclusion of the transaction manipulating such funds is not known or they're included in an invalid chain.
 
Assuming that the in-flight transaction has inputs that had been outputs of a transaction included in a valid chain, such funds can be recovered using the MoreVP protocol.
 
#### Finalizing exits at Scheduled Finalization Time (SFT)
Finalizing an exit means releasing funds from the root chain contract to the exitor. Exits finalize at their Scheduled finalization time (SFT).
 
Exit scheduling and priorities satisfy condition E3.
 
The table describes scheduled finalization time (SFT) for different types of exits: 
 
| Exit type | Scheduled finalization time (SFT) |
|   ---     |   ---     |
| Regular exits | `SFT = max(exit_request_block.timestamp + MFP, utxo_submission_block.timestamp + MFP + REP)` |
| In-flight exits   | `exitable_at = max(exit_request_block.timestamp + MFP, youngest_input_block.timestamp + MFP + REP)` |
| Deposits  |   The exit priority for deposits is elevated to protect against malicious operators: `SFT = max(exit_request_block.timestamp + MFP, utxo_submission_block.timestamp + MFP)` |
 
See [MoreVP Technical Overview](/contracts/morevp) for further details.
 
***
 
##### Configuration parameters for Scheduled Finalization Time (SFT)
The table describes the configuration parameters for Scheduled Finalization Time (SFT): 
 
| Parameter | Description |
|   ---     |   ---     |
| exit_request_block  | The root chain block where the exit request is mined. |
| utxo_submission_block | The root chain block where the exiting UTXO was created in a child chain block. |
| youngest_input_block  | The root chain block where the youngest input of the exiting transaction was created. |
 
##### Exit waiting period
All exits must wait at least the Minimum Finalization Period (MFP) to ensure the required challenge period process. 
 
Freshly exited UTXOs must wait an additional Required Exit Period (REP), counting from their submission to the root chain contract. 
 
Example values for these exit waiting periods, as in Minimal Viable Plasma:
 
- MFP - 1 week
- REP - 1 week
 
##### Exit priority
Root chain contract allows finalizing exits after their Scheduled Finalization Time (SFT) had passed. In this case, exits are processed in ascending order of exit priority:
 
Exit priority has two keys:
- Primary key: The SFT (Scheduled Finalization Time)
- Secondary key: The UTXO position
 
#### Child chain validation frequency
There are maximum periods of time a user can spend offline without validating a particular aspect of the chain exposing themselves to the risk of fund loss. 
 
User must validate with the following frequency:
 
* Validate the child chain every `REP` to ensure you have enough time to submit an exit request in case the chain is invalid.
* Validate exits every `MFP` to challenge invalid regular exits.
* Validate in-flight exits every `MFP/2` to challenge invalid actions in the in-flight exit protocol.
 
> To cover all possible misbehaviors that may occur in the network, user must validate at rarest every `min(REP, MFP/2)`.
 
#### Example exit scenario
Scenario:  MFP = 1 day, REP = 2 day.
 
The table illustrates the relation between MFP and REP in the scenario:  
 
* Day 1: Operator creates, includes, and starts to exit an invalid UTXO. 
* Day 3: User has been offline for two days. 
 
  User checks chain (REP) and sees the invalid transaction.
 
  The user exits his old UTXO.
 
* Day 4: Both operator and user can exit (after MFP) but the user's exit takes precedence based on utxoPos.
 
### Block submissions
Only a designated address that belongs to the child chain operator may submit blocks.
 
Every block submitted to the root chain contract compacts multiple child chain transactions. Effectively, the block being submitted means that during exiting, ownership of funds (inclusion of transaction) can be now proven using a new child chain block hash.
 
### Network congestion
The child chain allows a maximum of N UTXOs at a given time on the child chain.
 
N is bound by the root chain's bandwidth limitations and is the maximum amount of UTXOs that can safely request to exit if the child chain becomes invalid.
 
Plasma assumes the root chain network and gas availability to start all users' exits in time. If network congestion occurs, time is frozen on the root chain contract until it becomes safe to operate again. 
 
> Important! The full implementation of this feature is reserved for future research and development. 
 
### Reorgs
Reorg refers to changing the order of blocks and transactions on the root chain. Reorgs can lead to spurious invalidity of the child chain. For instance, without any protection, a deposit can be placed and then spent quickly on the child chain.
 
Everything is valid if the submit block root chain transaction gets mined after the deposit (causing the honest child chain to allow the spend). However, if the order of these transactions gets reversed due to a reorg, the spend will appear before the deposit, rendering the child chain invalid.
 
OMG Network blockchain employs these mechanisms to protect itself against reorgs: 
 
* Only allow deposits to be used on the child chain N Ethereum Block confirmations.
 
  This allows you to make it expensive for miners who want to try invalidating the child chain.
  The rule is built into the child chain. The root chain contract won't enforce this in any way.
 
* Account nonce mechanism protects the submission of blocks to the root chain contract.
 
  Miners attempting to mine blocks in the wrong order will produce an incorrect Ethereum block.
 
* Child chain blocks are numbered independently from the numbering of deposit blocks.
 
  A deposit block that disappears won't invalidate the numbering of the child chain blocks.
 
## Child chain server
 
The child chain server creates and submits blocks. This includes the following:
 
* Collects valid transactions that move funds on the child chain.
* Submits child chain block hashes to the root chain contract.
* Publishes contents of child chain blocks.
 
### Collecting transactions
The child chain server collects transactions and immediately executes valid transactions.
 
The child chain has a transaction per block limit. It represents a maximum number of transactions that can go in a single child chain block.
 
A submitted transaction that exceeds the limit is queued and scheduled for inclusion in the next block. The queue is prioritized by transaction fee value. When there are too many transactions in the queue, transactions with the lowest fees are lost and must be resubmitted.
 
> Transaction per block limit is assumed to be 2^16, per Minimal Viable Plasma.
 
### Submitting and propagating blocks
The child chain server submits blocks to the root chain contract.
 
Every T amount of time, the child chain submits a block (in the form of blocks' transactions Merkle root hash) to the root chain contract, and shares the block's content with the Watcher. Watcher receives the block and extracts the required information. 
 
If the child chain operator withholds a submitted block or if it submits an invalid block hiding the block contents, then everyone must exit.
 
### Transactions
A transaction involves spending existing UTXO(s) (inputs), and creating new UTXO(s) (outputs).
 
A transaction typically specifies the following:
 
* Input sent
* Output owner
* Sender's amount (owner of the input)
* Recipient's amount (owner of the output)
 
A transaction must include the spender's signature, which is proof the sender consents to their funds being spent. 
 
Each transaction can have up to 4 UTXOs as inputs, and it can create up to 4 UTXOs as outputs.
 
The child chain operator is eligible to claim a transaction fee (the surplus of the amount being input over the amount being output) using the following model: 
 
`(sumAmount(spent UTXOs) - sumAmount(created UTXOs) >= 0)` ⁠— the fee that the child chain operator is eligible to claim later.
 
As a result, the child chain will have the following:
 
    [
      [sig1, sig2, sig3, sig4],
      [inpPos1, inpPos2, inpPos3, inpPos4],
      [
        [newOwner1, currency1, amount1],
        [newOwner2, currency2, amount2],
        [newOwner3, currency3, amount3],
        [newOwner4, currency4, amount4]
      ],
      metadata
    ]
 
* **inpPos**  
 
  Defines input to the transaction. Every `inpPos` is an output's unique position, derived from:
 
  * Child block number
  * Transaction index within the block
  * Output index
 
  The transaction is valid only when every output for the transaction is unspent.
 
  Value may be zero when less than 4 inputs are required.
 
* **sig** 
 
  Signature of all other fields in a transaction; RLP-encoded, and hashed.
 
  A transaction must have a non-zero signature per every non-zero input used, under the same indices. Any zero input must have a zero signature (65 zero bytes) delivered.
 
* **newOwner, currency, and amount**  
 
  A single output, specifying the address of the new owner, for a specified amount of currency.
 
* **metadata**  
 
  Optional. The maximum data limit is 32bytes. Requires zero logic, and is included only in the transaction hashes preimage. 
  
  To exclude this field, simply skip it in the array.
 
> All zero outputs, inputs must come after the non-zero ones.
 
> To create a valid transaction you must have access to the positions of all the UTXOs that you own.
 
> **Note:** *Detailed documentation for the transaction encoding scheme used is pending. In the meantime, please refer to the implementation details in the  `elixir-omg` GitHub repo: [here](https://github.com/omgnetwork/elixir-omg/blob/master/apps/omg/lib/omg/state/transaction/signed.ex#L35) and [here](https://github.com/omgnetwork/elixir-omg/blob/master/apps/omg/lib/omg/state/transaction/signed.ex#L41).
 
## Watcher
 
The Watcher validates the child chain, ensuring the child chain consensus mechanism is working properly. It also performs the following operations:
 
* Tracks the root chain contract, published blocks and transactions.
* Reports any breach of consensus.
* As an additional service, collects and stores the account information required to use the child chain.
* As an additional service, it provides a convenience API to access the child chain API and Ethereum.
* Protects user by restricting access only to those times the child chain is valid.
 
All cryptographic primitives used (signatures, hashes) are understood to be ones compatible with whatever EVM uses. The Watcher is assumed to be run by the users. Users on the child chain must be able to trust the Watcher. 
 
The proper functioning of the Watcher is critical to keeping deposited funds secure.
 
The Watcher performs these tasks:
 
* Pings the child chain server to ensure everything is valid.
* Monitors the root chain contract for a lockSubmitted event log (a submission of a child chain block).
* Pings the child chain for the full block, when it receives a log.
* Verifies the validity of the block, and checks that its root matches the child chain root that was submitted.
 
### Invalid chain and funds exit
 
The Watcher checks for the following conditions, which will optionally prompt for an exit challenge:
 
* Exits during their challenge period referencing UTXOs that have already been spent on the child chain.
* Invalid actions taken during the in-flight exit game. Check [MoreVP Technical Overview](/contracts/morevp) for more details.
 
As soon as one Watcher detects an invalid child chain, all Watchers trigger a notification to anyone with assets on the child chain to exit immediately.
 
The Watcher also monitors for any of the following conditions, which signals an invalid chain and causes the Watcher to prompt for an exit of funds:
 
1. Invalid blocks.
 
  The following may signal invalid blocks:
 
  * Transactions spending an input spent in any prior block.
  * Transactions spending exited inputs, if unchallenged or challenge failed or was too late.
  * Transactions with deposits that haven't happened.
  * Transactions with invalid inputs.
  * Transactions with invalid signatures.
 
2. The operator exits more fees than they're due.  
 
  The Watcher must ensure that the operator never exits more fees than they're due because funds covering exited fees come from the same pool as deposited funds. So if the child chain operator exits too much in fees, there may not be enough funds left in the root chain contract for the exit.
 
3. Unable to validate a submitted child chain block.
 
  The Watcher needs information to validate a child chain block that's been submitted to the root chain. If it can't acquire the information or it takes too long to get this information, this will trigger a funds exit prompt.
 
4. Invalid claim on root chain contract left unchallenged for too long risks security on fund on child chain.
 
  Any invalid claim is done on the root chain contract (e.g. an invalid exit) that goes without challenge for too long and becomes a risk to the security of the funds held on the child chain.
 
### Watcher storage facilities
The storage facilities of the Watcher are also known as *account information*.
 
Watcher takes on an additional responsibility: collecting and storing data relevant to secure handling of user's assets on the child chain, such as:
 
1. UTXOs in possession of the address holding assets.
2. Full transaction history (child chain blocks).
 
## Exchange
For a high-level discussion about exchange designs on top of Tesuji plasma, see [OMG Network Decentralized Exchange](https://github.com/omgnetwork/elixir-omg/blob/master/docs/dex_design.md) (ODEX).
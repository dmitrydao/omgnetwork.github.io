---
id: run-watcher-vps
title: How to Run a Watcher on VPS
sidebar_label: Run a Watcher on VPS
---

*By the end of this guide you should know how to run a Watcher on VPS or dedicated server. The guide is useful for enterprise clients who want to integrate with the OMG Network.*

## Goals

You should use this guide if you need to accomplish one of the following goals:
- Increase uptime and availability of Watcher's instance.
- Rely on personal Watcher to verify transactions.
- Host a redundant Watcher node to secure the network.
- Have an ability to challenge UTXOs.

## Prerequisites

1. Basic knowledge of Linux and blockchain technology.
2. A Linux server, preferably a Virtual Private Server (VPS).
3. A fully synced Ethereum client. 

Ethereum client is required to synchronize transactions on the OMG Network with the Ethereum Network. The easiest way to have a full ETH client is to use one of the Ethereum infrastructure providers: [Infura](https://infura.io), [QuickNode](https://www.quiknode.io/), [Fiews](https://fiews.io/), [Rivet](https://rivet.cloud/), etc.

## Supported Platforms

You can install Watcher on the following Linux OS:
- Ubuntu 16.04
- Ubuntu 18.04

> Note, it might be possible to run a Watcher on other versions of Linux. Above are provided the versions that have been tested.

## Minimum Hardware Requirements

The following hardware is required to run a Watcher on VPS or dedicated server:
- Storage: 16GB SSD
- CPU: 1 CPU Core with at least 2.2 GHz
- RAM: 4GB
- Bandwidth: 20 Mbps

> The requirements are based on the network's load in Q2 2020. It is recommended to use hardware with higher performance to avoid a potential increase in transaction volume.

## Costs

The costs of running a Watcher on VPS include the following components:
- A full Ethereum node (local or ETH provider).
- VPS or dedicated server that matches [the minimum hardware requirements](#minimum-hardware-requirements).
- DevOps setup and maintenance fee.

## Installation Process

### 1. Set Up VPS

It is possible to [run a Watcher locally](/watcher/run-watcher-locally) for testing purposes but it's recommended to use a remote or dedicated server to increase uptime, reduce latency, and configure advanced security measures for your instance.

The process takes a significant amount of time and may require help from your DevOps team. This step is fully covered in the [Manage VPS](/watcher/manage-vps) guide.

### 2. Log in to VPS

All of the subsequent operations require an active session with your server. You can log in using the following command from your terminal or command prompt:

```
ssh $USER@$REMOTE_SERVER -p $PORT
```

> - `$USER` - the name of the user with root privileges used to log into the remote server. Default: root.
> - `$REMOTE_SERVER` - an IP address of your remote server.
> - `$PORT` - a port used to connect to the server. Default: 22.

### 3. Install Dependencies

Running a Watcher requires Docker and Docker Compose tooling. If your server doesn't have these dependencies, you need to install them.

#### 3.1 Update Ubuntu Packages

First, make sure your system has the latest packages:

```
sudo apt-get update
```

#### 3.2 Install Docker

```
sudo curl -sSL https://get.docker.com/ | sh && sudo usermod -aG docker $USER && exit
```

> - `$USER` - the name of the user with root privileges used on a remote server.

#### 3.3 Install Docker Compose

Make sure to install the latest version of Docker Compose from the [official repository](https://github.com/docker/compose/releases).

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose && exit
```

#### 3.4 Install Postgres (optionally)

Some Linux servers don't have pre-installed Postgres. You might need to install it manually as follows:

```
sudo apt update && sudo apt install postgresql postgresql-contrib
```

#### 3.5 Verify

To verify the installed dependencies, use the following commands:

```
docker -v && docker-compose -v
```

Example output:
```
Docker version 19.03.9, build 9d988398e7
docker-compose version 1.25.5, build 8a1c60f6
```

### 4. Check TCP Ports

#### 4.1 System Ports

Each of the ports is used for running one of the following containers:
- 7434: `elixir-omg_watcher_1`, a light-weight Watcher to ensure the security of funds deposited into the child chain.
- 7534: `elixir-omg_watcher_info_1`, a convenient and performant API to the child chain data.
- 5432: `elixir-omg_postgres_1`, a PostgreSQL database that stores transactions and contains data needed for challenges and exits.

Ensure you are not running any processes that are listening to the corresponding ports: 7434, 7534, 5432. You can use `lsof`, `netstat` or other alternatives to accomplish that:

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->
```
sudo lsof -i -n -P | grep LISTEN
```
<!-- macOS -->
```
sudo lsof -i -n -P | grep TCP
```
<!--END_DOCUSAURUS_CODE_TABS-->

> Note, if you just installed Postgres, it is possible it will occupy 5432 port, so you need to kill the corresponding process.

If you found one of the ports is already in use, kill the process the port is occupied with as follows:

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->

View the process that occupies the port:
```
sudo lsof -t -i:$PORT
```

Kill the process with its ID:
```
sudo kill -9 $PID
```

<!-- macOS -->

View the process that occupies the port:
```
sudo lsof -i :$PORT
```

Kill the process with its ID:
```
sudo kill $PID
```
<!--END_DOCUSAURUS_CODE_TABS-->

> - `$PORT` - a port to clear from other processes.
> - `$PID` - process ID listening on a defined port.

#### 4.2 Docker Ports (optionally)

If you have Docker tooling installed earlier, check if one of the containers uses the required ports as follows:

```
docker ps
```

Example output:

```
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                 PORTS                                             NAMES
```

### 5. Create and Enter a New Directory

```
mkdir watcher && cd watcher
```

### 6. Set Up Configuration Files

The Watcher consists from `watcher` and `watcher_info` services. You can run `watcher` separately, however `watcher_info` relies on Postgres database where it stores the network's data. All releases and corresponding Docker images (starting from `1.0.1`) can be found in our [`official repository`](https://github.com/omgnetwork/elixir-omg/releases).

<!--DOCUSAURUS_CODE_TABS-->

<!-- Docker Compose -->

#### 6.1 Configure docker-compose-watcher.yml File

Docker Compose allows defining and running multi-container Docker applications. To launch a Watcher with Compose, first, create YAML file that will contain configurations for our services with `nano` or `vim` text editor:

```
nano docker-compose-watcher.yml
```

Then, copy and paste the [required configs](https://gist.github.com/dmitrydao/c69a886e30f29d49f853975bf7237cd6), save the changes with `ctrl+o` (Linux/Windows) or `control+o` (macOS) and `Enter` to confirm the changes respectively. Then exit the file with `ctrl+x` or `control+x`.

#### 6.2 Configure Environment File

The YAML file has several values that have to be configured in `.env` file. To edit them, open `.env` with `nano` or `vim` text editor and paste the following values:

```
WATCHER_IMAGE=${WATCHER_IMAGE}
WATCHER_INFO_IMAGE=${WATCHER_INFO_IMAGE}
ETHEREUM_RPC_URL=${ETHEREUM_RPC_URL}
ETHEREUM_NETWORK=${ETHEREUM_NETWORK}
CHILD_CHAIN_URL=https://childchain.mainnet.v1.omg.network
AUTHORITY_ADDRESS=0x22405c1782913fb676bc74ef54a60727b0e1026f
TXHASH_CONTRACT=0x1c29b67acc33eba0d26f52a1e4d26625f52b53e6fbb0a4db915aeb052f7ec849
CONTRACT_ADDRESS_PLASMA_FRAMEWORK=0x0d4c1222f5e839a911e2053860e45f18921d72ac
CONTRACT_ADDRESS_ETH_VAULT=0x3eed23ea148d356a72ca695dbce2fceb40a32ce0
CONTRACT_ADDRESS_ERC20_VAULT=0x070cb1270a4b2ba53c81cef89d0fd584ed4f430b
CONTRACT_ADDRESS_PAYMENT_EXIT_GAME=0x48d7a6bbc428bca019a560cf3e8ea5364395aad3
```

> - `$ETHEREUM_RPC_URL` - a full Ethereum node URL.
> - `$ETHEREUM_NETWORK` - an Ethereum network, all caps values: `RINKEBY`,`ROPSTEN`, `MAINNET`, etc.
> - `${WATCHER_IMAGE}` - the latest stable [`watcher`](https://hub.docker.com/r/omisego/watcher/tags) image (e.g. `omisego/watcher:1.0.1`).
> - `${WATCHER_INFO_IMAGE}` - the latest stable [`watcher_info`](https://hub.docker.com/r/omisego/watcher_info/tags) image (e.g. `omisego/watcher_info:1.0.1`).

Above are provided the values for `OMG NETWORK MAINNET BETA V1`. If you want to work with another environment, please refer to [`environments`](/environments).

<!--END_DOCUSAURUS_CODE_TABS-->

### 7. Run a Watcher Instance

To run a Watcher instance, you need to start the required Docker containers. The parameter `-d` allows running containers in the background.

```
docker-compose -f docker-compose-watcher.yml up -d
```

Example output:
```
Starting elixir-omg_watcher_1  ... done
Starting elixir-omg_postgres_1 ... done
Starting elixir-omg_watcher_info_1 ... done
```

To see logs, use the following command:
```
docker-compose -f docker-compose-watcher.yml logs -ft
```

Example output:
```
watcher_info_1  | 2020-05-15 06:53:30.434 [info] module=OMG.Watcher.BlockGetter.Core function=log_downloading_blocks/2 ⋅Child chain seen at block #216000. Downloading blocks [195000]⋅
watcher_info_1  | 2020-05-15 06:53:41.959 [info] module=OMG.State.Core function=deposit/2 ⋅Recognized deposits [%{amount: 10000000000000000, blknum: 145003, currency: <<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0>>, eth_height: 7764861, event_signature: "DepositCreated(address,uint256,address,uint256)", log_index: 12, owner: <<13, 200, 226, 64, 217, 15, 59, 13, 81, 27, 100, 71, 84, 59, 40, 234, 36, 113, 64, 26>>, root_chain_txhash: <<147, 29, 206, 246, 243, 3, 240, 87, 225, 47, 101, 89, 171, 173, 123, 55, 34, 14, 12, 79, 224, 233, 75, 247, 50, 245, 218, 29, 250, 116, 222, 116>>}, %{amount: 1, blknum: 145002, currency: <<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0>>, eth_height: 7764856, event_signature: "DepositCreated(address,uint256,address,uint256)", log_index: 52, owner: <<186, 193, 205, 64, 81, 195, 120, 191, 144, 0, 135, 204, 196, 69, 215, 231, 208, 42, 215, 69>>, root_chain_txhash: <<49, 33, 4, 79, 147, 239, 174, 12, 22, 112, 84, 38, 41, 10, 51, 142, 50, 212, 239, 179, 158, 160, 49, 147, 115, 17, 53, 146, 171, 104, 86, 125>>}, %{amount: 10000000000000000, blknum: 145001, currency: <<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0>>, eth_height: 7764842, event_signature: "DepositCreated(address,uint256,address,uint256)", log_index: 5, owner: <<13, 200, 226, 64, 217, 15, 59, 13, 81, 27, 100, 71, 84, 59, 40, 234, 36, 113, 64, 26>>, root_chain_txhash: <<232, 140, 248, 249, 218, 149, 111, 141, 157, 74, 252, 71, 121, 176, 107, 217, 187, 78, 120, 154, 150, 98, 168, 214, 104, 217, 78, 253, 122, 54, 129, 166>>}]⋅
watcher_info_1  | 2020-05-15 06:53:43.059 [info] module=OMG.Watcher.BlockGetter.Core function=log_downloading_blocks/2 ⋅Child chain seen at block #216000. Downloading blocks [196000, 197000]⋅
watcher_info_1  | 2020-05-15 06:53:43.062 [info] module=OMG.Watcher.BlockGetter function=handle_continue/2 ⋅Applied block: #146000, from eth height: 7765960 with 2 txs⋅
watcher_info_1  | 2020-05-15 06:53:43.230 [info] module=OMG.Watcher.BlockGetter function=handle_continue/2 ⋅Applied block: #147000, from eth height: 7765973 with 2 txs⋅
```

> Depending on the server's hardware and internet connection, the entire process can take up to an hour.

If you want to exit the logs without stopping containers, use `ctrl+c` or `control+c`.

### 8. Verify You're Synced 

To verify that you're fully synced, check the status of Watcher and Watcher Info:

#### 8.1 Watcher

```
curl -X POST "http://$REMOTE_SERVER:7434/status.get"
```

> - `$REMOTE_SERVER` - an IP address of your remote server.

Example output:
```
{
   "data":{
      "byzantine_events":[
         ...
      ],
      "contract_addr":{
         "erc20_vault":"0x18e15c2cdc003b845b056f8d6b6a91ab33d3f182",
         "eth_vault":"0x895cc6f20d386f5c0deae08b08ccfec9f821e7d9",
         "payment_exit_game":"0x08c569c5774110eb84a80b292e6d6f039e18915a",
         "plasma_framework":"0x96d5d8bc539694e5fa1ec0dab0e6327ca9e680f9"
      },
      "eth_syncing":false,
      "in_flight_exits":[
         ...
      ],
      "last_mined_child_block_number":232000,
      "last_mined_child_block_timestamp":1589538254,
      "last_seen_eth_block_number":7908163,
      "last_seen_eth_block_timestamp":1589549882,
      "last_validated_child_block_number":232000,
      "last_validated_child_block_timestamp":1589538254,
      "services_synced_heights":[
         ...
      ]
   },
   "service_name":"watcher",
   "success":true,
   "version":"1.0.0+6234ec5"
}
```

#### 8.2 Watcher Info

```
curl -X POST "http://$REMOTE_SERVER:7534/stats.get"
```

> - `$REMOTE_SERVER` - an IP address of your remote server.

Example output:
```
{
   "data":{
      "average_block_interval_seconds":{
         "all_time":4768.440056417489,
         "last_24_hours":1550.673076923077
      },
      "block_count":{
         "all_time":1419,
         "last_24_hours":53
      },
      "transaction_count":{
         "all_time":39299,
         "last_24_hours":100
      }
   },
   "service_name":"watcher_info",
   "success":true,
   "version":"1.0.0+6234ec5"
}
```

Notice, the server may not respond until the following line appears in the `watcher_info` logs:

```
watcher_info_1   | 2020-05-30 06:13:36.445 [info] module=Phoenix.Endpoint.CowboyAdapter function=start_link/3 ⋅Running OMG.WatcherRPC.Web.Endpoint with cowboy 1.1.2 at :::7434 (http)⋅
```

### 9. Test Your Watcher

There are two ways to test that your Watcher is working properly:
1. Use `http://$REMOTE_SERVER:7534` as a `WATCHER_URL` value in your configs to make a transfer in your own or one of the OMG Network projects, such as [OMG Samples](https://github.com/omgnetwork/omg-samples). 
2. Make a transaction or another operation using [Watcher Info API](https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Finfo_api_specs).

> - `$REMOTE_SERVER` - an IP address of your remote server.
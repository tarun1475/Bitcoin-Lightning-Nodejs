# Bitcoin Lightning Client

Welcome to the implementation of gRPC API reference documentation for LND in Nodejs , the Lightning Network Daemon.

The examples in this repo assume that the there is a local lnd instance running and listening for gRPC connections on port 10001. LND_DIR will be used as a placeholder to denote the base directory of the lnd instance. By default, this is ~/.lnd on Linux and ~/Library/Application Support/Lnd on macOS.

Lightning Network Daemon Installation: https://dev.lightning.community/guides/installation/

Concepts: https://dev.lightning.community/overview/

### What is this package for?

This package is for developers who want to integrate Bitcoin lightning Network in their app using nodejs.

### How do I get set up?

- npm i bitcoin-lightning-nodejs
- make sure you have node installed on your machine

### How to setup tls.cert, macaroon.admin , channel host ?

Check https://gitlab.com/coinsafedev/bitcoin-lightning-nodejs/blob/master/auth.js

## Table of contents

- [Generate Seed](#genseed)
- [Initiate Wallet](#initiate-wallet)
- [Unlock Wallet](#unlock-wallet)
- [Change Wallet Password](#change-wallet-password)
- [Wallet Balance](#wallet-balance)
- [Channel Balance](#channel-balance)
- [Get Transactions ](#get-transactions)
- [Send Coins](#send-coins)
- [Subscribe Trasactions](#subscribe-trasactions)
- [Send Multiple Requests](#send-multiple-requests)
- [All Available Options](#new-address)

---

## GenSeed

GenSeed is the first method that should be used to instantiate a new lnd instance. This method allows a caller to generate a new aezeed cipher seed given an optional passphrase. If provided, the passphrase will be necessary to decrypt the cipherseed to expose the internal wallet seed. Once the cipherseed is obtained and verified by the user, the InitWallet method should be used to commit the newly generated seed, and create the wallet.

```js
var lightning = require("bitcoin-lightning-nodejs");

var request = {
  aezeed_passphrase: paraphrase,
  seed_entropy: seed_entropy
};

lightning.walletUnlocker.genSeed(request, function(err, response) {
  console.log(response);
});
```

## Initiate Wallet

InitWallet is used when lnd is starting up for the first time to fully initialize the daemon and its internal wallet. At the very least a wallet password must be provided. This will be used to encrypt sensitive material on disk. In the case of a recovery scenario, the user can also specify their aezeed mnemonic and passphrase. If set, then the daemon will use this prior state to initialize its internal wallet. Alternatively, this can be used along with the GenSeed RPC to obtain a seed, then present it to the user. Once it has been verified by the user, the seed can be fed into this RPC in order to commit the new wallet.

```js
var lightning = require("bitcoin-lightning-nodejs");

var request = {
  wallet_password: wallet_password,
  cipher_seed_mnemonic: cipher_seed_mnemonic,
  aezeed_passphrase: paraphrase,
  recovery_window: recovery_window
};

lightning.walletUnlocker.initWallet(request, function(err, response) {
  console.log(response);
});
```

## Unlock Wallet

UnlockWallet is used at startup of lnd to provide a password to unlock the wallet database.

```js
var lightning = require("bitcoin-lightning-nodejs");

var request = {
  wallet_password: wallet_password,
  recovery_window: recovery_window
};

lightning.walletUnlocker.unlockWallet(request, function(err, response) {
  console.log(response);
});
```

## Change Wallet Password

ChangePassword changes the password of the encrypted wallet. This will automatically unlock the wallet database if successful.

```js
var lightning = require("bitcoin-lightning-nodejs");
var request = {
  current_password: current_password,
  new_password: new_password
};

lightning.walletUnlocker.changePassword(request, function(err, response) {
  console.log(response);
});
```

## Wallet Balance

WalletBalance returns total unspent outputs(confirmed and unconfirmed), all confirmed unspent outputs and all unconfirmed unspent outputs under control of the wallet.

```js
var request = {};
lightning.ln.walletBalance(request, function(err, response) {
  console.log(response);
});
```

## Channel Balance

ChannelBalance returns the total funds available across all open channels in satoshis.

```js
var lightning = require("bitcoin-lightning-nodejs");
var request = {};
lightning.ln.channelBalance(request, function(err, response) {
  console.log(response);
}););
```

## Get Transactions

GetTransactions returns a list describing all the known transactions relevant to the wallet.

```js
var lightning = require("bitcoin-lightning-nodejs");
var request = {};
lightning.ln.getTransactions(request, function(err, response) {
  console.log(response);
});
```

## Send Coins

SendCoins executes a request to send coins to a particular address. Unlike SendMany, this RPC call only allows creating a single output at a time. If neither target_conf, or sat_per_byte are set, then the internal wallet will consult its fee model to determine a fee for the default confirmation target.

```js
var lightning = require("bitcoin-lightning-nodejs");
var request = {
  addr: addr,
  amount: amount,
  target_conf: target_conf,
  sat_per_byte: sat_per_byte
};
lightning.ln.sendCoins(request, function(err, response) {
  console.log(response);
});
```

## Subscribe Trasactions

SubscribeTransactions creates a uni-directional stream from the server to the client in which any newly discovered transactions relevant to the wallet are sent over.

```js
var lightning = require("bitcoin-lightning-nodejs");
var request = {};
var call = lightning.ln.subscribeTransactions(request);
call.on("data", function(response) {
  // A response was received from the server.
  console.log(response);
});
call.on("status", function(status) {
  // The current status of the stream.
});
call.on("end", function() {
  // The server has closed the stream.
});
```

## Send Multiple Requests

SendMany handles a request for a transaction that creates multiple specified outputs in parallel. If neither target_conf, or sat_per_byte are set, then the internal wallet will consult its fee model to determine a fee for the default confirmation target.

```js
var lightning = require("bitcoin-lightning-nodejs");

var request = {
  AddrToAmount: AddrToAmount,
  target_conf: target_conf,
  sat_per_byte: sat_per_byte
};
lightning.ln.sendMany(request, function(err, response) {
  console.log(response);
});
```

## New Address

NewAddress creates a new address under control of the local wallet.

```js
var lightning = require("bitcoin-lightning-nodejs");
var request = {
  type: type
};
lightning.ln.newAddress(request, function(err, response) {
  console.log(response);
});
});
```

## Sign Message

SignMessage signs a message with this node’s private key. The returned signature string is zbase32 encoded and pubkey recoverable, meaning that only the message digest and signature are needed for verification.

```js
var lightning = require("bitcoin-lightning-nodejs");
var request = {
  msg: msg
};
lightning.ln.signMessage(request, function(err, response) {
  console.log(response);
});
```

## Verify Message

VerifyMessage verifies a signature over a msg. The signature must be zbase32 encoded and signed by an active node in the resident node’s channel database. In addition to returning the validity of the signature, VerifyMessage also returns the recovered pubkey from the signature.

```js
var lightning = require("bitcoin-lightning-nodejs");
var request = {
  msg: msg,
  signature: signature
};
lightning.ln.verifyMessage(request, function(err, response) {
  console.log(response);
});
```

## Connect Peer

ConnectPeer attempts to establish a connection to a remote peer. This is at the networking level, and is used for communication between nodes. This is distinct from establishing a channel with a peer.

```js
var lightning = require("bitcoin-lightning-nodejs");

var request = {
  addr: addr,
  perm: perm
};

lightning.ln.connectPeer(request, function(err, response) {
  console.log(response);
});
```

## Donating

Bitcoin Address: 14AaoxQLQ92rpMsXSKPAYs5yetCLkB64KF


### Core Contributor

- ([Tarun Gupta](https://github.com/tarun1475))

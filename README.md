# README #

Welcome to the implementation of gRPC API reference documentation for LNDin Nodejs , the Lightning Network Daemon.. 

The examples in this repo assume that the there is a local lnd instance running and listening for gRPC connections on port 10009. LND_DIR will be used as a placeholder to denote the base directory of the lnd instance. By default, this is ~/.lnd on Linux and ~/Library/Application Support/Lnd on macOS.


Lightening Network Daemon Installation: https://dev.lightning.community/guides/installation/

Concepts: https://dev.lightning.community/overview/


### What is this package for? ###

This package is for developers who want to integrate Bitcoin Lightening Network in their app using nodejs.

### How do I get set up? ###

* npm i bitcoin-lightening-nodejs
* make sure you have node installed on your machine

#Examples#

#GenSeed#

GenSeed is the first method that should be used to instantiate a new lnd instance. This method allows a caller to generate a new aezeed cipher seed given an optional passphrase. If provided, the passphrase will be necessary to decrypt the cipherseed to expose the internal wallet seed. Once the cipherseed is obtained and verified by the user, the InitWallet method should be used to commit the newly generated seed, and create the wallet.

```
var lightening = require('bitcoin-lightening-nodejs');

lightening.generateSeed(paraphrase, seed_entropy, (err , res) => {

});
```

#Initiate Wallet#

InitWallet is used when lnd is starting up for the first time to fully initialize the daemon and its internal wallet. At the very least a wallet password must be provided. This will be used to encrypt sensitive material on disk. In the case of a recovery scenario, the user can also specify their aezeed mnemonic and passphrase. If set, then the daemon will use this prior state to initialize its internal wallet. Alternatively, this can be used along with the GenSeed RPC to obtain a seed, then present it to the user. Once it has been verified by the user, the seed can be fed into this RPC in order to commit the new wallet.

```
var lightening = require('bitcoin-lightening-nodejs');

lightening.initiateWallet(wallet_password , cipher_seed_mnemonic, paraphrase, recovery_window, (err , res) => {

});

```

#Unlock Wallet#

UnlockWallet is used at startup of lnd to provide a password to unlock the wallet database.


```
var lightening = require('bitcoin-lightening-nodejs');

lightening.unlockWalletRequest(wallet_password ,recovery_window, (err , res) => {

});

```

#Change Wallet Password#

ChangePassword changes the password of the encrypted wallet. This will automatically unlock the wallet database if successful.


```
var lightening = require('bitcoin-lightening-nodejs');

lightening.changeWalletPassword(current_password , new_password, (err , res) => {

});

```

#Wallet Balance#

WalletBalance returns total unspent outputs(confirmed and unconfirmed), all confirmed unspent outputs and all unconfirmed unspent outputs under control of the wallet.

```
var lightening = require('bitcoin-lightening-nodejs');

lightening.walletBalanceRequest();

```

#Channel Balance#

ChannelBalance returns the total funds available across all open channels in satoshis.

```
var lightening = require('bitcoin-lightening-nodejs');

lightening.channelBalanceRequest();

```

#Get Transactions#

GetTransactions returns a list describing all the known transactions relevant to the wallet.

```
var lightening = require('bitcoin-lightening-nodejs');

lightening.getTransactionsRequest();

```

#Send Coins#

SendCoins executes a request to send coins to a particular address. Unlike SendMany, this RPC call only allows creating a single output at a time. If neither target_conf, or sat_per_byte are set, then the internal wallet will consult its fee model to determine a fee for the default confirmation target.

```
var lightening = require('bitcoin-lightening-nodejs');

lightening.sendCoinsRequest(addr , amount , target_conf, sat_per_byte, (err , res) => {

});

```

#Subscribe Trasactions#

SubscribeTransactions creates a uni-directional stream from the server to the client in which any newly discovered transactions relevant to the wallet are sent over.

```
var lightening = require('bitcoin-lightening-nodejs');

lightening.getTransactionsRequest();

```

#Send Multiple Requests#

SendMany handles a request for a transaction that creates multiple specified outputs in parallel. If neither target_conf, or sat_per_byte are set, then the internal wallet will consult its fee model to determine a fee for the default confirmation target.

```
var lightening = require('bitcoin-lightening-nodejs');

lightening.sendManyRequest(AddrToAmount, target_conf, sat_per_byte, (err , res) => {

});

```

#New Address#

NewAddress creates a new address under control of the local wallet.

```
var lightening = require('bitcoin-lightening-nodejs');

lightening.newAddressRequest(type, (err , res) => {

});

```

#Sign Message#

SignMessage signs a message with this node’s private key. The returned signature string is zbase32 encoded and pubkey recoverable, meaning that only the message digest and signature are needed for verification.

```
var lightening = require('bitcoin-lightening-nodejs');

lightening.signMessageRequest(msg, (err , res) => {

});

```

#Verify Message#

VerifyMessage verifies a signature over a msg. The signature must be zbase32 encoded and signed by an active node in the resident node’s channel database. In addition to returning the validity of the signature, VerifyMessage also returns the recovered pubkey from the signature.

```
var lightening = require('bitcoin-lightening-nodejs');

lightening.verifyMessageRequest(msg , signature, (err , res) => {

});

```



Developer Email: tarunkumargupta14@gmail.com
Future Tasks: Implementation of Daemon & Payment Channel related functions.
Project Repository
https://github.com/lightningnetwork/lnd 



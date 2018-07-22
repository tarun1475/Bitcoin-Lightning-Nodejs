# README #

Implementation of Bittrex Client in Nodejs. 

### What is this package for? ###

This package is for developers who want to integrate Bittrex Exchange apis in their app using  nodejs. All Public & Private Routes have been implemented and tested.

### How do I get set up? ###

* npm i bittrex-js-client
* make sure you have node installed on your machine

#Examples

```
var bittrex = require('bittrex-js-client');
bittrex.options({
  'key' : API_KEY,
  'secret' : API_SECRET,
});

bittrex.getMarkets();


//Result will be JSON object.
```

#Cancel an Order

```

var bittrex = require('bittrex-js-client');
bittrex.options({
  'key' : API_KEY,
  'secret' : API_SECRET,
});

bittrex.cancel(uuid,options);


//Result will be JSON object.
```

```
For More info and code repo have a look at : https://github.com/tarun1475/Nodejs-Bittrex-Client

Developer Email: tarunkumargupta14@gmail.com

Future Task: Account apis & Web Sockets.



const lightning = require("bitcoin-lightning-nodejs");

var request = {};
lightning.ln.walletBalance(request, function(err, response) {
  console.log(response);
});

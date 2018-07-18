var request = require('request');
var constants = require('./constants');
const crypto = require('crypto');


function calculateSign(url){
	var sign=crypto.createHmac('sha512',constants.bittrexCredentials.SECRET); 

	sign = sign.update(url,'ascii');
	sign = sign.digest('hex');
	return sign;
}


//Public Routes


var getMarkets = () => {
	var url = constants.baseUrl.PUBLIC + "/getmarkets";
	request(url, (error, response, body) => {
	console.log(JSON.parse(body));
});
};

var getCurrencies = () => {
	var url = constants.baseUrl.PUBLIC + "/getcurrencies";
	request(url, (error, response, body) => {
	console.log(JSON.parse(body));
});
};

var getTicker = (market) => {
	var url = constants.baseUrl.PUBLIC + "/getticker?market=" + market;
	request(url, (error, response, body) => {
	console.log(JSON.parse(body));
});
};

var getMarketSummaries = () => {
	var url = constants.baseUrl.PUBLIC + "/getmarketsummaries";
	request(url, (error, response, body) => {
	console.log(JSON.parse(body));
});
};

var getMarketSummary = (market) => {
	var url = constants.baseUrl.PUBLIC + "/getmarketsumary?market="+market;
	request(url, (error, response, body) => {
	console.log(JSON.parse(body));
});
};

var getOrderBook = (market,type) => {
	var url = constants.baseUrl.PUBLIC + "/getorderbook?market="+market+"&type="+type;
	request(url, (error, response, body) => {
	console.log(JSON.parse(body));
});
};

var getMarketHistory = (market) => {
	var url = constants.baseUrl.PUBLIC + "/getmarkethistory?market="+market;
	request(url, (error, response, body) => {
	console.log(JSON.parse(body));
});
};



//All Market Routes


var buyLimit  = (market, quantity, rate) => {
	$nonce=Date.now(); 
	var uri= constants.baseUrl.MARKET+'/buylimit?apikey='+constants.bittrexCredentials.KEY+'&nonce='+$nonce+'&market='+market+'&quantity='+quantity+'&rate='+rate; 
	var options = {
		  url: uri,
		  headers: {
		    'content-type': 'application/json',
		    'apisign':calculateSign(uri)
		  }

		};

	request(options, (error, response, body) => {
	console.log(JSON.parse(body));
});

};


var sellLimit  = () => {
	$nonce=Date.now(); 
	var uri= constants.baseUrl.MARKET+'/sellLimit?apikey='+constants.bittrexCredentials.KEY+'&nonce='+$nonce+'&market='+market+'&quantity='+quantity+'&rate='+rate; 
	var options = {
		  url: uri,
		  headers: {
		    'content-type': 'application/json',
		    'apisign':calculateSign(uri)
		  }

		};

	request(options, (error, response, body) => {
	console.log(JSON.parse(body));
});

};

var cancel  = (uuid) => {
	$nonce=Date.now(); 
	var uri= constants.baseUrl.MARKET+'/cancel?apikey='+constants.bittrexCredentials.KEY+'&nonce='+$nonce+'&uuid='+uuid; 
	var options = {
		  url: uri,
		  headers: {
		    'content-type': 'application/json',
		    'apisign':calculateSign(uri)
		  }

		};

	request(options, (error, response, body) => {
	console.log(JSON.parse(body));
});

};

var getOpenOrders  = () => {
	$nonce=Date.now(); 
	var uri= constants.baseUrl.MARKET+'/getopenorders?apikey='+constants.bittrexCredentials.KEY+'&nonce='+$nonce; 
	var options = {
		  url: uri,
		  headers: {
		    'content-type': 'application/json',
		    'apisign':calculateSign(uri)
		  }

		};

	request(options, (error, response, body) => {
	console.log(JSON.parse(body));
});

};





module.exports ={
	getMarkets,
	getCurrencies,
	getMarketSummaries,
	getMarketSummary,
	getTicker,
	getOrderBook,
	getMarketHistory,
	getOpenOrders
};

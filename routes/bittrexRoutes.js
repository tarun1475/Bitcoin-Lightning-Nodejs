var request = require('request');
var constants = require('./constants');


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







module.exports ={
	getMarkets,
	getCurrencies,
	getMarketSummaries,
	getMarketSummary,
	getTicker,
	getOrderBook,
	getMarketHistory
};

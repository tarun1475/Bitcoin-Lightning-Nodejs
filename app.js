const bittrexRoutes = require('./bittrexRoutes');


var options = {
	"key":"3f3f6a47e4064edab36fb3917d3e2a6a",
	"secret":"59327574fb42489f81df078ece36f258"
};

bittrexRoutes.getMarkets();
bittrexRoutes.getOpenOrders(options);
var grpc = require("grpc");
var fs = require("fs");
var auth = require("./auth");
var protoLoader = require("@grpc/proto-loader");
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync("rpc.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
var lnrpc = protoDescriptor.lnrpc;

var macaroonCreds = grpc.credentials.createFromMetadataGenerator(function(
  args,
  callback
) {
  var macaroon = fs.readFileSync(auth.config.AUTH).toString("hex");
  var metadata = new grpc.Metadata();
  metadata.add("macaroon", macaroon);
  callback(null, metadata);
});

var lndCert = fs.readFileSync(auth.config.CERT);
var sslCreds = grpc.credentials.createSsl(lndCert);
var walletUnlocker = new lnrpc.WalletUnlocker(auth.config.HOST, sslCreds);
var creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);
var ln = new lnrpc.Lightning(auth.config.HOST, creds);

module.exports = {
  ln,
  walletUnlocker
};

function define(obj, name, value) {
    Object.defineProperty(obj, name, {
        value:        value,
        enumerable:   true,
        writable:     false,
        configurable: false
    });
}


exports.config = {};
define(exports.config, "HOST"       , "localhost:10001");
define(exports.config, "CERT"     , "/home/tarun/.lnd/tls.cert");
define(exports.config, "AUTH"       , "/home/tarun/go/dev/alice/data/admin.macaroon");
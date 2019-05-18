var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "equal universe wish number major correct reform sheriff crouch fence upgrade inmate";

module.exports = {
  networks: {
    development: {
        host: '127.0.0.1',
        port: 8545,
        network_id: '*', // Match any network id
        gasPrice: 0
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/f184d5cd065d4740a2317f955553d27e")
      },
      network_id: 3
    }   
  }
};

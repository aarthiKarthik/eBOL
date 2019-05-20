const Tx = require('ethereumjs-tx');
const Web3 = require("web3")
const contract = require("truffle-contract");
const jsonfile = require("jsonfile");
const Config = require('../config/config');
const rpc = Config.getProps().rpc;
const thisweb3 = new Web3(new Web3.providers.HttpProvider(rpc));
const ebolABI = jsonfile.readFileSync('../tokens/build/contracts/BoL.json');
let coinbase;

thisweb3.eth.getAccounts().then(addres => {
    coinbase = addres[0];
    thisweb3.eth.defaultAccount = coinbase;
    console.log('coinbase is:' + coinbase);
});

const EbolContract = contract(ebolABI);
console.log(ebolABI);
EbolContract.setProvider(thisweb3.currentProvider);

EbolContract.currentProvider.sendAsync = function () {
    return EbolContract.currentProvider.send.apply(EbolContract.currentProvider, arguments);
};

async function getEbolAddress() {
    ltcAddress = await EbolContract.deployed().then(i=>i.address);
    console.log('ltc address is:' + ltcAddress);
}
getEbolAddress();

async function mintToken(shipperName, consignee, qty) {
    console.log('inside mintToken');
    let ebolInstance = await EbolContract.deployed();
    console.log('ebolinst is:' + ebolInstance);
    await ebolInstance.mintToken(shipperName, consignee, qty, {from: coinbase, gas:3000000});
};

module.exports = {
    mintToken
}

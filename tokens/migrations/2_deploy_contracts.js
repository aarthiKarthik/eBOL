const BoL = artifacts.require("BoL");

module.exports = (deployer, network, accounts) => {
  deployer.then(async () => {
    const token = await deployer.deploy(BoL);
  });
};

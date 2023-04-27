const hre = require("hardhat");

async function verifyContracts(contractInfo) {
	for (const info of contractInfo) {
		await hre.run("verify:verify", {
			address: info.address,
			constructorArguments: info.args || [],
			contract: info.con,
		});
	}
}

const contractsToVerify = [
	{
		address: "0x9DCEE07f8c4af95397fEE452f5504B631D63E685",
		args: [], // Add constructor arguments for Contract 1
		con: "contracts/Token.sol:Token",
	},

	{
		address: "0x97a3731d87c70982E9B7ad218A70D92884B9AAD6",
		args: [], // Add constructor arguments for Contract 3,
		con: "contracts/Swapper.sol:Swapper",
	},
];

verifyContracts(contractsToVerify);

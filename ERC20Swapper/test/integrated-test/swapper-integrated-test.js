const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

let amount = ethers.utils.parseEther("10000");

describe("Swapper", function () {
	let swapper, token, accounts;
	beforeEach(async () => {
		accounts = await ethers.getSigners();

		// deploy BioWasteSupplyChain
		const Swapper = await hre.ethers.getContractFactory("Swapper");
		swapper = await Swapper.deploy();

		await swapper.deployed();

		// deploy token

		const Token = await hre.ethers.getContractFactory("Token");
		token = await Token.deploy();

		await token.deployed();
	});

	describe("swapEtherToTokenIntegrated", function () {
		describe("Positive cases", function () {
			it("swap 100 tokens for 1 eth", async function () {
				// transfer tokens to Swapper contract
				await token.transfer(swapper.address, amount);
				await swapper
					.connect(accounts[5])
					.swapEtherToToken(token.address, ethers.utils.parseEther("100"), {
						value: ethers.utils.parseEther("1"),
					});

				const bal = await token.balanceOf(accounts[5].address);

				assert.equal(bal.toString(), ethers.utils.parseEther("100"));
			});
		});
	});
});

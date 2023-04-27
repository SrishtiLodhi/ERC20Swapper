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

	describe("swapEtherToToken", function () {
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

		describe("Negative cases", function () {
			it("reverts when msg.value is 0", async function () {
				// transfer tokens to Swapper contract
				await token.transfer(swapper.address, amount);

				await expect(
					swapper
						.connect(accounts[5])
						.swapEtherToToken(token.address, ethers.utils.parseEther("100"), {
							value: ethers.utils.parseEther("0"),
						})
				).to.be.revertedWith("No ether provided");
			});

			it("reverts when contract has 0 token balance", async function () {
				// transfer tokens to Swapper contract

				await expect(
					swapper
						.connect(accounts[5])
						.swapEtherToToken(token.address, ethers.utils.parseEther("100"), {
							value: ethers.utils.parseEther("1"),
						})
				).to.be.reverted;
			});

			it("reverts when no. of generated tokens less than minAmount", async function () {
				// transfer tokens to Swapper contract
				await token.transfer(swapper.address, amount);

				await expect(
					swapper
						.connect(accounts[5])
						.swapEtherToToken(token.address, ethers.utils.parseEther("101"), {
							value: ethers.utils.parseEther("1"),
						})
				).to.be.revertedWith(
					"Did not receive the minimum expected amount of tokens"
				);
			});
		});
	});
});

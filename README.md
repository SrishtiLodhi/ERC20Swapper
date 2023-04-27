#ERC20 Swapper

This project consists of two smart contracts, a Token contract and a Swapper contract. The Token contract is a basic ERC20 token, while the Swapper contract provides a function for swapping Ether for tokens.

#Getting Started

To get started with the ERC20 Swapper project, follow these steps:

Clone the repository to your local machine.
Install the dependencies by running npm install.
Compile the contracts by running npx hardhat compile.
Deploy the contracts by running npx hardhat run scripts/deploy.js --network <network_name>. Make sure to replace <network_name> with the name of the network you want to deploy to.
Verify the contracts by running npx hardhat run scripts/verify.js --network <network_name>. Make sure to replace <network_name> with the name of the network you want to verify the contracts on.
Usage
Once the contracts have been deployed, you can use the Swapper contract to swap Ether for tokens. To do so, call the swapEtherToToken function on the Swapper contract, passing in the address of the token you want to receive and the minimum number of tokens you expect to receive. The function will convert the Ether to tokens and transfer them to your account.

#Development
To run the tests, run npx hardhat test.

#License
This project is licensed under the MIT License - see the LICENSE file for details.

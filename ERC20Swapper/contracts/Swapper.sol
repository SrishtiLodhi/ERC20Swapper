// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

interface ERC20Swapper {
    function swapEtherToToken(address token, uint minAmount) external payable returns (uint);
}

contract Swapper is ERC20Swapper {
    
    function swapEtherToToken(address token, uint minAmount) public payable override returns (uint) {
        require(msg.value > 0, "No ether provided");
        
        IERC20 tokenContract = IERC20(token);
        uint tokenBalanceBefore = tokenContract.balanceOf(msg.sender);
        
       // no. of tokens will be 100 times the ethers passed
       uint noOfToken = 100 * (msg.value);

       require(tokenContract.transfer(msg.sender, noOfToken));



        uint tokenBalanceAfter = tokenContract.balanceOf(msg.sender);
        
        require(tokenBalanceAfter - tokenBalanceBefore >= minAmount, "Did not receive the minimum expected amount of tokens");
        
        return (tokenBalanceAfter - tokenBalanceBefore);
    }
}

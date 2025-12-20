// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockUSDT
 * @dev A mock USDT token for testing and development purposes
 * @notice This is a simplified version of USDT for use on U2U Solaris Mainnet
 */
contract MockUSDT is ERC20, Ownable {
    uint8 private constant _DECIMALS = 6; // USDT uses 6 decimals
    
    constructor() ERC20("Mock USDT", "USDT") Ownable() {
        // Mint initial supply to the deployer (1,000,000 USDT)
        _mint(msg.sender, 1000000 * 10**_DECIMALS);
    }
    
    /**
     * @dev Returns the number of decimals used to get its user representation
     */
    function decimals() public pure override returns (uint8) {
        return _DECIMALS;
    }
    
    /**
     * @dev Mint new tokens (only owner can call this)
     * @param to The address to mint tokens to
     * @param amount The amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Burn tokens from caller's balance
     * @param amount The amount of tokens to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
    
    /**
     * @dev Burn tokens from a specific address (only owner can call this)
     * @param from The address to burn tokens from
     * @param amount The amount of tokens to burn
     */
    function burnFrom(address from, uint256 amount) external onlyOwner {
        _spendAllowance(from, msg.sender, amount);
        _burn(from, amount);
    }
}

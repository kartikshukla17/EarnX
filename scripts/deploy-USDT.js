const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
  console.log("🚀 Starting USDT Token deployment...");

  // Get the contract factory
  const MockUSDT = await ethers.getContractFactory("MockUSDT");
  
  // Deploy the contract
  console.log("📦 Deploying MockUSDT contract...");
  const mockUSDT = await MockUSDT.deploy();
  
  // Wait for deployment to complete
  await mockUSDT.waitForDeployment();
  
  const usdtAddress = await mockUSDT.getAddress();
  
  console.log("✅ MockUSDT deployed successfully!");
  console.log("📍 Contract Address:", usdtAddress);
      console.log("🔗 Explorer URL:", `https://u2uscan.xyz/address/${usdtAddress}`);
  
  // Verify the deployment
  const name = await mockUSDT.name();
  const symbol = await mockUSDT.symbol();
  const decimals = await mockUSDT.decimals();
  
  console.log("📋 Token Details:");
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Decimals:", decimals.toString());
  
  // Save the address to a file for other scripts to use
  const deploymentInfo = {
    network: "u2uSolarisMainnet",
    chainId: 39,
    contractName: "MockUSDT",
    address: usdtAddress,
    deployedAt: new Date().toISOString(),
    deployer: await ethers.provider.getSigner().getAddress()
  };
  
  fs.writeFileSync(
    './deployments/USDT-deployment.json', 
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("💾 Deployment info saved to ./deployments/USDT-deployment.json");
  
  return usdtAddress;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

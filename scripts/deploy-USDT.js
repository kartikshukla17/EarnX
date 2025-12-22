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

  // Get network information
  const network = await ethers.provider.getNetwork();
  const networkName = network.name === 'unknown' ? 'sepolia' : network.name;
  const chainId = Number(network.chainId);

  // Determine explorer URL based on network
  let explorerUrl;
  if (chainId === 11155111) {
    explorerUrl = `https://sepolia.etherscan.io/address/${usdtAddress}`;
  } else if (chainId === 39) {
    explorerUrl = `https://u2uscan.xyz/address/${usdtAddress}`;
  } else {
    explorerUrl = `Network ${chainId} - Address: ${usdtAddress}`;
  }

  console.log("✅ MockUSDT deployed successfully!");
  console.log("📍 Contract Address:", usdtAddress);
  console.log("🔗 Explorer URL:", explorerUrl);

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
    network: networkName,
    chainId: chainId,
    contractName: "MockUSDT",
    address: usdtAddress,
    explorerUrl: explorerUrl,
    deployedAt: new Date().toISOString(),
    deployer: await ethers.provider.getSigner().getAddress()
  };

  // Create deployments directory if it doesn't exist
  if (!fs.existsSync('./deployments')) {
    fs.mkdirSync('./deployments');
  }

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

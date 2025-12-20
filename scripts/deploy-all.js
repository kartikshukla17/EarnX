const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
  console.log("🚀 Starting complete deployment to U2U Solaris Mainnet...");
  console.log("=" .repeat(60));

  const deployments = {};

  try {
    // Step 1: Deploy USDT Token
    console.log("\n📦 Step 1: Deploying MockUSDT Token...");
    const MockUSDT = await ethers.getContractFactory("MockUSDT");
    const mockUSDT = await MockUSDT.deploy();
    await mockUSDT.waitForDeployment();
    const usdtAddress = await mockUSDT.getAddress();
    
    console.log("✅ MockUSDT deployed at:", usdtAddress);
    deployments.USDT = usdtAddress;

    // Step 2: Deploy Bounty Contract
    console.log("\n📦 Step 2: Deploying Allin1Bounty Contract...");
    const Allin1Bounty = await ethers.getContractFactory("Allin1Bounty");
    const bounty = await Allin1Bounty.deploy(usdtAddress);
    await bounty.waitForDeployment();
    const bountyAddress = await bounty.getAddress();
    
    console.log("✅ Allin1Bounty deployed at:", bountyAddress);
    deployments.Bounty = bountyAddress;

    // Step 3: Deploy Freelance Contract
    console.log("\n📦 Step 3: Deploying FreelanceGigEscrow Contract...");
    const FreelanceGigEscrow = await ethers.getContractFactory("FreelanceGigEscrow");
    const freelance = await FreelanceGigEscrow.deploy(usdtAddress);
    await freelance.waitForDeployment();
    const freelanceAddress = await freelance.getAddress();
    
    console.log("✅ FreelanceGigEscrow deployed at:", freelanceAddress);
    deployments.Freelance = freelanceAddress;

    // Get deployer address
    const deployer = await ethers.provider.getSigner().getAddress();

    // Create comprehensive deployment summary
    const deploymentSummary = {
      network: "u2uSolarisMainnet",
      chainId: 39,
      deployedAt: new Date().toISOString(),
      deployer: deployer,
      contracts: {
        MockUSDT: {
          address: usdtAddress,
          explorer: `https://u2uscan.xyz/address/${usdtAddress}`,
          name: await mockUSDT.name(),
          symbol: await mockUSDT.symbol(),
          decimals: (await mockUSDT.decimals()).toString()
        },
        Allin1Bounty: {
          address: bountyAddress,
          explorer: `https://u2uscan.xyz/address/${bountyAddress}`,
          owner: await bounty.owner(),
          usdtToken: usdtAddress
        },
        FreelanceGigEscrow: {
          address: freelanceAddress,
          explorer: `https://u2uscan.xyz/address/${freelanceAddress}`,
          owner: await freelance.owner(),
          mockUSDT: usdtAddress,
          platformFee: (await freelance.platformFeePercent()).toString(),
          stakingGracePeriod: (await freelance.stakingGracePeriod()).toString()
        }
      }
    };

    // Save deployment summary
    fs.writeFileSync(
      './deployments/complete-deployment.json', 
      JSON.stringify(deploymentSummary, null, 2)
    );

    // Create individual deployment files
    fs.writeFileSync(
      './deployments/USDT-deployment.json', 
      JSON.stringify(deploymentSummary.contracts.MockUSDT, null, 2)
    );

    fs.writeFileSync(
      './deployments/Bounty-deployment.json', 
      JSON.stringify(deploymentSummary.contracts.Allin1Bounty, null, 2)
    );

    fs.writeFileSync(
      './deployments/Freelance-deployment.json', 
      JSON.stringify(deploymentSummary.contracts.FreelanceGigEscrow, null, 2)
    );

    // Display final summary
    console.log("\n" + "=" .repeat(60));
    console.log("🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!");
    console.log("=" .repeat(60));
    console.log("\n📋 Contract Addresses:");
    console.log("   MockUSDT:     ", usdtAddress);
    console.log("   Allin1Bounty: ", bountyAddress);
    console.log("   Freelance:    ", freelanceAddress);
    
    console.log("\n🔗 Explorer Links:");
    console.log("   USDT:     https://u2uscan.xyz/address/" + usdtAddress);
    console.log("   Bounty:   https://u2uscan.xyz/address/" + bountyAddress);
    console.log("   Freelance: https://u2uscan.xyz/address/" + freelanceAddress);
    
    console.log("\n💾 Deployment files saved:");
    console.log("   ./deployments/complete-deployment.json");
    console.log("   ./deployments/USDT-deployment.json");
    console.log("   ./deployments/Bounty-deployment.json");
    console.log("   ./deployments/Freelance-deployment.json");

    console.log("\n📝 Next Steps:");
    console.log("   1. Update your frontend contract addresses in lib/contracts.ts");
    console.log("   2. Verify contracts on the explorer (optional)");
    console.log("   3. Test the deployed contracts");

  } catch (error) {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });

const { ethers } = require("hardhat");

async function main() {
    console.log("🔍 Testing Sepolia Network Connection...\n");

    try {
        // Get network information
        const network = await ethers.provider.getNetwork();
        console.log("✅ Network Name:", network.name);
        console.log("✅ Chain ID:", Number(network.chainId));

        // Get signer
        const [signer] = await ethers.getSigners();
        const address = await signer.getAddress();
        console.log("\n👤 Deployer Address:", address);

        // Check balance
        const balance = await ethers.provider.getBalance(address);
        const balanceInEth = ethers.formatEther(balance);
        console.log("💰 Balance:", balanceInEth, "ETH");

        if (Number(balanceInEth) === 0) {
            console.log("\n⚠️  WARNING: Your wallet has 0 ETH!");
            console.log("📝 You need Sepolia ETH to deploy contracts.");
            console.log("\n🚰 Get free Sepolia ETH from these faucets:");
            console.log("   • https://sepoliafaucet.com/");
            console.log("   • https://www.alchemy.com/faucets/ethereum-sepolia");
            console.log("   • https://faucet.quicknode.com/ethereum/sepolia");
        } else {
            console.log("\n✅ You have sufficient balance to deploy!");
        }

        // Test RPC connection
        const blockNumber = await ethers.provider.getBlockNumber();
        console.log("\n🔗 Latest Block Number:", blockNumber);
        console.log("✅ RPC connection is working!");

    } catch (error) {
        console.error("\n❌ Error:", error.message);

        if (error.message.includes("missing provider")) {
            console.log("\n💡 Tip: Make sure your .env file has PRIVATE_KEY set");
        } else if (error.message.includes("could not detect network")) {
            console.log("\n💡 Tip: Check your SEPOLIA_RPC_URL in .env file");
            console.log("   Or use the default: https://rpc.sepolia.org");
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

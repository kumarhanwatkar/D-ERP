import hre from 'hardhat';

async function main() {
  const PayrollStream = await hre.ethers.getContractFactory('PayrollStream');
  const payrollStream = await PayrollStream.deploy();

  await payrollStream.waitForDeployment();

  console.log(`PayrollStream deployed to: ${await payrollStream.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

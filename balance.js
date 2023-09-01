import {
    Signer,
    Contract,
    Provider,
    Transaction,
    Serializer,
    utils,
  } from "koilib";

let nftContract


async function getContract() {
    if (nftContract) return nftContract;

    const provider = new Provider(["https://harbinger-api.koinos.io"]);
    // const userAddress = accounts[0].address;
    const nftContractAddress = "1PZMHh8PBkhE8WGNTTkeCorZdJBqVkibev"; // Replace with your NFT contract address
    nftContract = new Contract({
        id: nftContractAddress,
        provider
    });

    // get the abi of nftContract
    await nftContract.fetchAbi();

    nftContract.abi.methods.balance_of.entry_point = Number(nftContract.abi.methods.balance_of["entry-point"]);
    nftContract.abi.methods.balance_of.read_only = Number(nftContract.abi.methods.balance_of["read-only"]);
    return nftContract;
}

export async function getBalance(walletAddress){
    const contract = await getContract();
    console.log('get supply')
    const suppply = await contract.functions.balance_of({owner: walletAddress});
    console.log(suppply.result.value);
}

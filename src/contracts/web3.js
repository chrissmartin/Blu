//imports the Web3 API
import Web3 from 'web3';

/**
 * creates & exports new instance for 
 * Web3 using provided service by Metamask.
 */
//var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/833d8ad3ede646309958f48f72a40ba2"));

let currentWeb3;

if (window.ethereum) {
    let instance = new Web3(window.ethereum);
    try {
        // Request account access if needed
        window.ethereum.enable();
        // Acccounts now exposed
        currentWeb3 = instance;
    } catch (error) {
        // User denied account access...
        alert('Please allow access for the app to work');
    }
} else if (window.web3) {
    currentWeb3 = new Web3(web3.currentProvider);
    //currentWeb3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/833d8ad3ede646309958f48f72a40ba2"));
    // Acccounts always exposed
}
else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

export default currentWeb3;
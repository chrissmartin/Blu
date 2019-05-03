import web3 from './web3';


const address = "0x7bd0db363f103433b77d5d9670f016130db188ea";

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_img",
				"type": "string"
			},
			{
				"name": "_text",
				"type": "string"
			}
		],
		"name": "sendHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getHash",
		"outputs": [
			{
				"name": "img",
				"type": "string"
			},
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCounter",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "NewPost",
		"type": "event"
	}
];

export default new web3.eth.Contract(abi, address);
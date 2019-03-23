# Blu. - Social Network dApp 
![Ver](https://img.shields.io/badge/Version-1.0-brightgreen.svg)
![Vue](https://img.shields.io/badge/Made%20with-Vue.js-1abc9c.svg)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

---
A simple Ethereum-based Instagram-like decentralized application (dapp) where you can post images, text, and view it. This dApp also shows all the behind the scenes working of IPFS and Ethereum blockchain.

---

![Blu](https://i.imgur.com/vFo24uDh.jpg)

## Prerequisites

* **Node** - v10.x.x (preferrably v10.15.0 for long term support)
* **npm** - v6.x.x (preferrably v6.6.0)
* **Ganache** - Configured for Ganache local network (Port:7545)
* **Metamask Extension** - Acts as ETH wallet provider. (Temporary Solution, we are trying integrate into the dApp)

## Running It Locally

Clone this repo via to your local machine and install the dependencies by doing the following:

```bash
git clone https://github.com/chrissmartin/Blu.git
cd Blu
npm install
```
The smart contract has to be manually migrated to your network.
The new contract address should be updated in src/contracts/contractInstance.js

Serve the application with hot reload in a development environment via:

```bash
npm run dev
```

## Built With

* [Solidity](https://solidity.readthedocs.io/en/v0.5.2/) - Ethereum's smart contract programming language
* [Vue.js](https://vuejs.org/) - The Javascript framework used
* [web3.js](https://github.com/ethereum/web3.js/) - Javascript library used to interact with the Ethereum blockchain
* [IPFS](https://docs.ipfs.io/) - InterPlanetary File System for peer-to-peer decentralized data storage. 

## Project Developers
* Chriss Martin - Blockchain and Web Developer 
* Amit Joseph   - Blockchain and Web Developer 
* Alen George   - Web Developer
* Abin Mathew   - UX/UI Design <br />

![ForTheBadge built-with-swag](http://ForTheBadge.com/images/badges/built-with-swag.svg)

## Based on

* Openberry [Instagram-dApp](https://github.com/openberry-ac/instagram)

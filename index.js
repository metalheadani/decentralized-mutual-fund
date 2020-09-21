// Source code to interact with smart contract
// Gas limit for this contract : 1242101
//connection with Kovan Testnet

//infura.io/dashboard
//godplzsavethisearth@gmail.com
//Hello@123

// localhost -> http://127.0.0.1:8545
// kovan testnet -> https://kovan.infura.io/v3/f244de6212b34426b4cba6a157d7f76e
// Ropsten testnet -> https://ropsten.infura.io/v3/f244de6212b34426b4cba6a157d7f76e
var web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/f244de6212b34426b4cba6a157d7f76e'));

// contractAddress and abi are set after contract is deployed
var contractAddress = '0x70bc099d51f5a6e42dcac1a90f47a4b6d0c301ce';
var abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Bought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Sold","type":"event"},{"inputs":[],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"}]');

//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

//Smart contract functions
function sendEther() {
  info = $("#ethAmountToSend").val();
  console.log(info);
  web3.eth.sendTransaction({
    from: account,
    to:contractAddress,
    value:web3.utils.toWei(info, "ether"),
    gas: 1252101,
    gasPrice: web3.utils.toWei("100", "Gwei"),
  })
    .then(function(tx) {
    console.log("Transaction: ", tx); 
  });
  $("#ethAmountToSend").val('');
}

function checkTokenBalance() {
  contract.methods.getInfo().call().then( function( info ) { 
    console.log("info: ", info);
    document.getElementById('tokenBalance').innerHTML = info;
  });    
}
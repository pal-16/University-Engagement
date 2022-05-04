
const wallet = require("./utilities/wallet");

var generate_submit = document.getElementById('generate-submit');
var import_submit = document.getElementById('import-submit');
var transaction_submit = document.getElementById('transaction-submit');

function generateKeyPair() {
  let pw = document.getElementById('register-password').value;
  wallet.generateKeyPairUtil(pw);
  
}

function importAccount() {
  let pw = document.getElementById('login-password').value;
  wallet.importAccountUtil(pw);
}

async function rewardTransaction(){
var reward =document.getElementById('coins').value;
await wallet.rewardTransactionUtil(reward);
}

if(transaction_submit!=null)
transaction_submit.onclick=rewardTransaction;
if(import_submit!=null)
import_submit.onclick = importAccount;
if(generate_submit!=null)
generate_submit.onclick = generateKeyPair;



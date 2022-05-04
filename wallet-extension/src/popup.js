
const wallet = require("./utilities/wallet");

var generate_submit = document.getElementById('generate-submit');
var import_submit = document.getElementById('import-submit');
var transaction_submit = document.getElementById('transaction-submit');

function generateKeyPair() {
  let pw = document.getElementById('register-password').value;
  var secretkey = document.getElementById('secretkey').value;
  try{
  wallet.generateKeyPairUtil(secretkey,pw);
  }catch(err){
    document.getElementById("account").innerHTML = "An error occured";
  }
  
}

function importAccount() {
  let pw = document.getElementById('login-password').value;
  try{
    wallet.importAccountUtil(pw);
  }catch(err){
      document.getElementById("account").innerHTML = "An error occured";
  }
 
}

async function rewardTransaction(){
var reward =document.getElementById('coins').value;
try{
  await wallet.rewardTransactionUtil(reward);
}catch(err){
  document.getElementById("account").innerHTML = "An error occured";
}

}

if(transaction_submit!=null)
transaction_submit.onclick=rewardTransaction;
if(import_submit!=null)
import_submit.onclick = importAccount;
if(generate_submit!=null)
generate_submit.onclick = generateKeyPair;



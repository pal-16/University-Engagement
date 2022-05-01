
const ellipticcurve = require("starkbank-ecdsa");
const curves = require("starkbank-ecdsa/ellipticcurve/curve");
const axios = require("axios");
const crypto = require("crypto");
const BigInt= require("big-integer");

var PrivateKey = ellipticcurve.PrivateKey;
var create_btn = document.getElementById('create_btn');
var import_btn = document.getElementById('import_btn');
var submit_import = document.getElementById('submit1');
var submit_coins = document.getElementById('submit-coins');
var coins = localStorage.getItem("coins");
document.getElementById("coins").value = coins
var ecdsa = ellipticcurve.Ecdsa;
// if (window.localStorage.getItem("PubKey")){
//     var public_key = window.localStorage.getItem("PubKey");
//     document.getElementById("account").innerHTML = "Your Account";
//     document.getElementById("key").innerHTML = public_key.substring(0, 22) + "...";
//     setBalance(public_key);
// }

const ngrok_url="https://0381-2405-201-9-5153-f443-93e1-db21-ee74.ngrok.io"



function generateKey() {
   
  const pw = document.getElementById('register-password').value;
  let privateKey = new PrivateKey(curves.p256);
  let priv1 = privateKey.toPem().split("\n");
  let privkey = priv1[1] + priv1[2] + priv1[3];

  let publicKey = privateKey.publicKey().toPem();
  let pub1 = publicKey.split("\n");
  let pubkey = pub1[1] + pub1[2];
  let encryptedPriv = encryptKey(pw, privkey); 
  let encsecretkey=encryptKey(pw,privateKey.secret)
  localStorage.setItem("pubkey", pubkey);
  localStorage.setItem("encprivkey", encryptedPriv);
  localStorage.setItem("encsecretkey",encsecretkey);
  document.getElementById("account").innerHTML = "Created Wallet Account";
  document.getElementById("key").innerHTML = pubkey.substring(0, 22) + "...";
  document.getElementById("register-password").value = "";
  setBalance(pubkey);

}
function getKey() {

  const pw2 = document.getElementById('login-password').value;
  var encsecretkey = document.getElementById('encsecretkey').value;
  var secretkey=decryptKey(pw2, encsecretkey);
  var privateKey = new PrivateKey(curves.p256, BigInt(`${secretkey}`)); // var privateKey = PrivateKey.fromString(priv_temp, curves.p256);
  let priv1 = privateKey.toPem().split("\n");
  let privkey = priv1[1] + priv1[2] + priv1[3];

  let publicKey = privateKey.publicKey().toPem();
  let pub1 = publicKey.split("\n");
  let pubkey = pub1[1] + pub1[2];
  let encryptedPriv = encryptKey(pw2, privkey);
  localStorage.setItem("pubkey", pubkey);
  localStorage.setItem("encprivkey", encryptedPriv);
  localStorage.setItem("encsecretkey", encsecretkey);
  document.getElementById("account").innerHTML = "Imported Account";
  document.getElementById("key").innerHTML = pubkey.substring(0, 22) + "...";
  document.getElementById("priv_key").value = "";
  document.getElementById("login-password").value = "";
  setBalance(pubkey);
 
}

function encryptKey(pw, key){
  var iv = Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  let hash = crypto.createHash("sha1");
  let temp_data = hash.update(pw, "utf-8");
  let gen_hash = temp_data.digest().slice(0, 16);
  const cipher = crypto.createCipheriv("aes-128-cbc", gen_hash, iv);
  let encryptedPriv  = cipher.update(key, "utf-8", "hex");
  encryptedPriv += cipher.final("hex");
  return encryptedPriv;
}
async function setBalance(pubkey){
  console.log("inside getbalance");
  const response = await axios.post(
      ngrok_url+"/checkBalance",
      {
        public_key: pubkey
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  var balance = "Balance: ";
  if(response.status == 200)
      balance += response.data + " VJCoins";
  else
      balance += "ERR";
  document.getElementById("coins").innerHTML = balance;
}

function decryptKey(password,enckey){
var iv = Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
let hash2 = crypto.createHash("sha1");
let temp_data2 = hash2.update(password, "utf-8");
let gen_hash2 = temp_data2.digest().slice(0, 16);
const decipher = crypto.createDecipheriv("aes-128-cbc", gen_hash2, iv);
let decryptedPriv  = decipher.update(enckey, "hex", "utf-8");
decryptedPriv += decipher.final("utf-8");
return decryptedPriv;
}

async function sendCoins(){


var coins = localStorage.getItem("coins");

let msg = {
  'status': 'Approved'
}
const response = await axios.post(
 ngrok_url+"/makeTransaction",
  {
    sender_public_key:localStorage.getItem("pubkey"),
    receiver_public_key:localStorage.getItem("studentpubkey"),
    bounty: coins,
    message: JSON.stringify(msg)
  },
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
);
if (response.status !== 200) 
document.getElementById("coins").innerHTML =  "An error occurred while transfering the reward" 
else{
 console.log(response.data);
tx_to_be_signed = response.data.sign_this;
tx_to_be_sent = response.data.send_this;

let password = document.getElementById('password').value;
let encprivkey = localStorage.getItem("encprivkey");
let privateKey=decryptKey(password,encprivkey)
  let signature = ecdsa.sign( tx_to_be_signed, privateKey);
  console.log(signature);
  let sig=
    "[" + signature.r.toString() + ", " + signature.s.toString() + "]";
const response_txn = await axios.post(
  ngrok_url+"/sendTransaction",
  {
    signature: sig,
    transaction: tx_to_be_sent
  },
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
);

if (response_txn.status !== 200) 
  document.getElementById("coins").innerHTML=
      "An error occurred while transfering the reward. Invalid Transaction on VJChain"
 else{
document.getElementById("coinspopup").innerHTML = "Transaction successful";
document.getElementById("coins").innerHTML = "";
localStorage.setItem("status", "success");
}
}
}

if(submit_coins!=null)
submit_coins.onclick=sendCoins;
if(submit_import!=null)
submit_import.onclick = getKey;
if(create_btn!=null)
create_btn.onclick = generateKey;

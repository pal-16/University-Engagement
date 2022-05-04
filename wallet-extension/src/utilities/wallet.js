const ellipticcurve = require("starkbank-ecdsa");
const curves = require("starkbank-ecdsa/ellipticcurve/curve");
const axios = require("axios");
const crypto = require("crypto");
var PrivateKey = ellipticcurve.PrivateKey;

const wallet = {

    importAccountUtil:function(secretkey,pw) {
           
        // get the private and public key from the secret key
        var privateKey = new PrivateKey(curves.p256, BigInt(`${secretkey}`)); // var privateKey = PrivateKey.fromString(priv_temp, curves.p256);
        let priv = privateKey.toPem().split("\n");
        let privkey = priv[1] + priv[2] + priv[3];
        let publicKey = privateKey.publicKey().toPem();
        let pub= publicKey.split("\n");
        let pubkey = pub[1] + pub[2];
        

        // encrypt function called
        let encryptedPriv = encryptKey(pw, privkey);

        // update the local storage for background script to listen
        localStorage.setItem("pubkey", pubkey);
        localStorage.setItem("encprivkey", encryptedPriv);
        localStorage.setItem("encsecretkey", encsecretkey);

        // update the extension UI
        document.getElementById("account").innerHTML = "Imported Account";
        document.getElementById("key").innerHTML = pubkey.substring(0, 22) + "...";
        document.getElementById("priv_key").value = "";
        document.getElementById("login-password").value = "";
    
      },

    generateKeyPairUtil:function(pw) {

      // generate private and public key
        let privateKey = new PrivateKey(curves.p256);
        let priv1 = privateKey.toPem().split("\n");
        let privkey = priv1[1] + priv1[2] + priv1[3];
        let publicKey = privateKey.publicKey().toPem();
        let pub1 = publicKey.split("\n");
        let pubkey = pub1[1] + pub1[2];

        // encrypt the private and secret key 
        let encryptedPriv = encryptKey(pw, privkey); 
        let encsecretkey=encryptKey(pw,privateKey.secret)

           // update the local storage for background script to listen
        localStorage.setItem("pubkey", pubkey);
        localStorage.setItem("encprivkey", encryptedPriv);
        localStorage.setItem("encsecretkey",encsecretkey);

        // update the extension UI
        document.getElementById("account").innerHTML = "Created Wallet Account";
        document.getElementById("key").innerHTML = pubkey.substring(0, 22) + "...";
        document.getElementById("register-password").value = "";
        
    },
   decryptKey:  function (password,enckey){
        let iv = Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
        let hash = crypto.createHash("sha1");
        let temp_data = hash.update(password, "utf-8");
        let gen_hash = temp_data.digest().slice(0, 16);
        const decipher = crypto.createDecipheriv("aes-128-cbc", gen_hash, iv);
        let decryptedPriv  = decipher.update(enckey, "hex", "utf-8");
        decryptedPriv += decipher.final("utf-8");
        return decryptedPriv;
    },
   encryptKeyUtil: function (pw, key){
        let iv = Buffer.from([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
        let hash = crypto.createHash("sha1");
        let temp_data = hash.update(pw, "utf-8");
        let gen_hash = temp_data.digest().slice(0, 16);
        const cipher = crypto.createCipheriv("aes-128-cbc", gen_hash, iv);
        let encryptedPriv  = cipher.update(key, "utf-8", "hex");
        encryptedPriv += cipher.final("hex");
        return encryptedPriv;
    },
   setBalance:  async function (pubkey){
 
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
    },
   rewardTransactionUtil:  async function (reward){

        let msg = {
          'status': 'Approved'
        }

        // make transaction
        const response = await axios.post(
         ngrok_url+"/makeTransaction",
          {
            sender_public_key:localStorage.getItem("pubkey"),
            receiver_public_key:localStorage.getItem("recpubkey"),
            bounty: reward,
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
        

        // send transaction
        tx_to_be_signed = response.data.sign_this;
        tx_to_be_sent = response.data.send_this;
        let password = document.getElementById('password').value;
        let encprivkey = localStorage.getItem("encprivkey");
        let privateKey=decryptKey(password,encprivkey)
        let signature = ecdsa.sign( tx_to_be_signed, privateKey);
        let sig= "[" + signature.r.toString() + ", " + signature.s.toString() + "]";
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
        

        // update the extension UI
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

}

module.exports = wallet;
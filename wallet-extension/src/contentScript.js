(function() {
  function script() {

    const vjcoin={

          generateKeyPair: function(){
            generateKeyPair();
          },
          importAccount: function(){ 
            importAccount();
          },
          rewardTransaction: function(coins, recpublickey){  
            rewardTransaction(coins,recpublickey);
          }
    }
  
    function generateKeyPair(){
        var event= new Event('generateKeyPairEvent');
        document.dispatchEvent(event);
    }

    function importAccount(){
        var event = new Event('importAccountEvent');
        document.dispatchEvent(event);
    }

    function rewardTransaction(coins,recpublickey){
        localStorage.setItem("reward",coins)
        localStorage.setItem("recpublickey",recpublickey);
        var eventcoins = new Event('rewardTransactionEvent');
        document.dispatchEvent(eventcoins);
    }
  
    window.vjcoin=vjcoin;
  
  }

  function inject(fn) {
      const script = document.createElement('script')
      script.text = `(${fn.toString()})();`
      document.documentElement.appendChild(script)
  }
  inject(script)
  
})()


document.addEventListener('rewardTransactionEvent',(e)=>{ 

  chrome.runtime.sendMessage({type:'cointransfer_function_called:'+localStorage.getItem("reward")+':'+localStorage.getItem("recpublickey")});
})

document.addEventListener('importAccountEvent',()=>{ 
  chrome.runtime.sendMessage({type:'login_function_called'});
})

document.addEventListener('generateKeyPairEvent',()=>{ 
chrome.runtime.sendMessage({type:'register_function_called'});
})


chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

        // listening and updating local storage
    if(localStorage.getItem("pubkey")===null)
        localStorage.setItem("pubkey", request.pubkey);
    if(localStorage.getItem("pubkey")===null)
        localStorage.setItem("status", request.status);
    if(localStorage.getItem("encrpivkey")===null)
        localStorage.setItem("encprivkey", request.encprivkey);
    if(localStorage.getItem("encsecretkey")===null)
        localStorage.setItem("encsecretkey", request.encsecretkey);

    // sending response
    if(request.pubkey)
    sendResponse({pubkey:true});
    if(request.status)
    sendResponse({status:true});
  if(request.encprivkey)
    sendResponse({encprivkey:true});
    if(request.encsecretkey)
    sendResponse({encsecretkey:true});
}
);
(function() {
  function script() {
    const vjcoin={

          login: function(){ 
            sendLogin();
          },
          register: function(){
            sendRegister();
          },
          coinTransfer: function(coins, recpublickey){  
            sendCoinTransfer(coins,recpublickey);
          }
    }
  
    function sendRegister(){
      var event= new Event('vjRegisterEvent');
      document.dispatchEvent(event);

    }
    function sendCoinTransfer(coins,recpublickey){
      localStorage.setItem("reward",coins)
      localStorage.setItem("recpublickey",recpublickey);
      var eventcoins = new Event('vjCoinTransferEvent');
      document.dispatchEvent(eventcoins);
    }
    function sendLogin(){
      var event = new Event('vjLoginEvent');
      document.dispatchEvent(event);
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


document.addEventListener('vjCoinTransferEvent',(e)=>{ 

  chrome.runtime.sendMessage({type:'cointransfer_function_called:'+localStorage.getItem("reward")+':'+localStorage.getItem("recpublickey")});
})

document.addEventListener('vjLoginEvent',()=>{ 
  chrome.runtime.sendMessage({type:'login_function_called'});
})

document.addEventListener('vjRegisterEvent',()=>{ 
chrome.runtime.sendMessage({type:'register_function_called'});
})


chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {

 
  
  if(localStorage.getItem("pubkey")===null)
  localStorage.setItem("pubkey", request.pubkey);
   localStorage.setItem("status", request.status);
   if(localStorage.getItem("encrpivkey")===null)
  localStorage.setItem("encprivkey", request.encprivkey);
  if(localStorage.getItem("encsecretkey")===null || localStorage.getItem("encsecretkey")==="undefined")
  localStorage.setItem("encsecretkey", request.encsecretkey);
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
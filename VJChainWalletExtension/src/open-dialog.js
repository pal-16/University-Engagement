(function() {
  function script() {
    const vjcoin={

          login: function(){ 
            sendLogin();
          },
          register: function(){
            sendRegister();
          },
          coinTransfer: function(){  
            sendCoinTransfer();
          }
    }
  
    function sendRegister(){
      var event= new Event('vjRegisterEvent');
      document.dispatchEvent(event);

    }
    function sendCoinTransfer(){
      var eventcoins = new Event('vjCoinTransferEvent');
      document.dispatchEvent(eventcoins);
    }
    function sendLogin(){
      var event = new Event('vjLoginEvent');
      document.dispatchEvent(event);
    }
    window.vjcoin=vjcoin;
    console.log(window);
  }

  function inject(fn) {
    const script = document.createElement('script')
    script.text = `(${fn.toString()})();`
    document.documentElement.appendChild(script)
  }

  inject(script)
})()


document.addEventListener('vjCoinTransferEvent',(e)=>{ 
  chrome.runtime.sendMessage({type:'cointransfer_function_called'});
})

document.addEventListener('vjLoginEvent',()=>{ 
  chrome.runtime.sendMessage({type:'login_function_called'});
})

document.addEventListener('vjRegisterEvent',()=>{ 
chrome.runtime.sendMessage({type:'register_function_called'});
})


chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  console.log(sender.tab ?
              "from background:" + sender.tab.url :
              "from the extension");
  console.log(request)
  if(localStorage.getItem("pubkey")===null)
  localStorage.setItem("pubkey", request.pubkey);
   localStorage.setItem("status", request.status);
   if(localStorage.getItem("encrpivkey")===null)
  localStorage.setItem("encprivkey", request.encprivkey);
  if(localStorage.getItem("encsecretkey")===null)
  localStorage.setItem("encsecretkey", request.encsecretkey);
  if(request.pubkey)
  sendResponse({pubkey:true});
  if(request.status)
   sendResponse({status:true});
 if(request.encprivkey)
  sendResponse({encprivkey:true});
  if(request.encsecretkey)
  sendResponse({encsecretkey:true});

  var coins=localStorage.getItem("coins");
  var studentpubkey=localStorage.getItem("studentpubkey");
  console.log(coins);
  if(coins!=null)
  chrome.runtime.sendMessage({"coins":coins});
  if(studentpubkey!=null)
  chrome.runtime.sendMessage({"studentpubkey":studentpubkey});
  
}
);
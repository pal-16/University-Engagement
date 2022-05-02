chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  
   if(request.type==='register_function_called'){
     chrome.tabs.create({
       url: chrome.extension.getURL('register.html'),
       active: false
   }, function(tab) {
     
       chrome.windows.create({
           tabId: tab.id,
           type: 'popup',
           focused: true
       });
   });
   }
   if (request.type === 'cointransfer_function_called') {
     chrome.tabs.create({
         url: chrome.extension.getURL('cointransfer.html'),
         active: false
     }, function(tab) {
       
         chrome.windows.create({
             tabId: tab.id,
             type: 'popup',
             focused: true
         });
     });
   }
   if (request.type === 'login_function_called') {
     chrome.tabs.create({
         url: chrome.extension.getURL('index.html'),
         active: false
     }, function(tab) {
         chrome.windows.create({
             tabId: tab.id,
             type: 'popup',
             focused: true
         });
     });
   }
 });
 
 
 const keysInterval=setInterval(() => {
   if (localStorage.getItem("pubkey") && localStorage.getItem("encprivkey")){
      var pubkey = localStorage.getItem("pubkey");
      var encprivkey = localStorage.getItem("encprivkey");
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       chrome.tabs.sendMessage(tabs[0].id, {pubkey: pubkey}, function(response) {
         if(response.pubkey==true){
           chrome.tabs.sendMessage(tabs[0].id, {encprivkey: encprivkey}, function(response2) {
             if(response2.encprivkey==true){
                   clearInterval(keysInterval)  
             }
           });
         }
       });
    
     });
   }
 }, 1000);
 
 
 
const transactionStatusInterval=setInterval(() => {
   if (localStorage.getItem("status")){
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      
       chrome.tabs.sendMessage(tabs[0].id, {status: "success"}, function(response) {
         if(response.status==true){
           clearInterval(transactionStatusInterval);
           window.close();
         } 
       });
     });
   }
 }, 1000);
 
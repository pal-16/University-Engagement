chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  
   if(request.type==='generate_function_called'){
     chrome.tabs.create({
       url: chrome.extension.getURL('pages/generateKeys.html'),
       active: false
   }, function(tab) {
     
       chrome.windows.create({
           tabId: tab.id,
           type: 'popup',
           focused: true
       });
   });
   }
   if (request.type.includes('transaction_function_called')) {
    let result=request.type.split(':');
    localStorage.setItem("reward",result[1]);
    localStorage.setItem("recpublickey",result[2]);
     chrome.tabs.create({
         url: chrome.extension.getURL('pages/rewardTransaction.html'),
         active: false
     }, function(tab) {
       
         chrome.windows.create({
             tabId: tab.id,
             type: 'popup',
             focused: true
         });
     });
   }
   if (request.type === 'import_function_called') {
     chrome.tabs.create({
         url: chrome.extension.getURL('pages/importAccount.html'),
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
 
 
 const publicKeyInterval=setInterval(() => {
   if (localStorage.getItem("pubkey")){
      var pubkey = localStorage.getItem("pubkey");
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       chrome.tabs.sendMessage(tabs[0].id, {pubkey: pubkey}, function(response) {
         if(response.pubkey==true){
                   clearInterval(publicKeyInterval)  
         }
       });
     });
   }
 }, 1000);

const privateKeyInterval=setInterval(() => {
  if (localStorage.getItem("encprivkey")){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {encprivkey: encprivkey}, function(response) {
        if(response.encprivkey==true){
          clearInterval(privateKeyInterval);
          window.close();
        } 
      });
    });
  }
}, 1000);

const secretKeyInterval=setInterval(() => {
  if (localStorage.getItem("encsecretkey")){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {encsecretkey: encsecretkey}, function(response) {
        if(response.encsecretkey==true){
          clearInterval(secretKeyInterval);
          window.close();
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
 
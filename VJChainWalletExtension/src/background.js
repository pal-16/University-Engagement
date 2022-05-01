chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if(request.coins){
    console.log("requested coins")
    localStorage.setItem("coins",request.coins);
  }
  if(request.studentpubkey){
   localStorage.setItem("studentpubkey",request.studentpubkey);
 }
   if(request.type==='register_function_called'){
     chrome.tabs.create({
       url: chrome.extension.getURL('register.html'),
       active: false
   }, function(tab) {
     
       chrome.windows.create({
           tabId: tab.id,
           type: 'popup',
           focused: true
           // incognito, top, left, ...
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
             // incognito, top, left, ...
         });
     });
   }
   if (request.type === 'login_function_called') {
     chrome.tabs.create({
         url: chrome.extension.getURL('index.html'),
         active: false
     }, function(tab) {
         // After the tab has been created, open a window to inject the tab
         chrome.windows.create({
             tabId: tab.id,
             type: 'popup',
             focused: true
             // incognito, top, left, ...
         });
     });
   }
   // if(request.type == 'login_pubkey'){
   //   var pubkey = request.message;
   //   console.log(pubkey);
   //   sendResponse({pubkey: pubkey});
   // }
 });
 
 
 const keysInterval=setInterval(() => {
   if (localStorage.getItem("pubkey") && localStorage.getItem("encprivkey")){
      var pubkey = localStorage.getItem("pubkey");
      var encprivkey = localStorage.getItem("encprivkey");
     // var encsecretkey = localStorage.getItem("encsecretkey");
   
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       chrome.tabs.sendMessage(tabs[0].id, {pubkey: pubkey}, function(response) {
         if(response.pubkey==true){
           chrome.tabs.sendMessage(tabs[0].id, {encprivkey: encprivkey}, function(response2) {
             if(response2.encprivkey==true){
              // chrome.tabs.sendMessage(tabs[0].id, {encsecretkey: encsecretkey}, function(response3) {
              //   if(response3.encsecretkey==true){
                   clearInterval(keysInterval)
             //   }
           //   });
             
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
 
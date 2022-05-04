# <h3 align="center">Encouraging Student Partipicipation in Extra Curricular Achievements using an Incentivization Platform</h3>

<hr />

<p align="center">
<a href="" >
    <img src="https://github.com/pal-16/engage-demo/blob/master/assets/video-demo-1.gif"/>
</a>
</p>

<hr />

<details open>   
<summary>Architecture of the Project</summary>
<br/>
    
- Frontend: React
- Backend: Node.js, Express.js
- Database: MongoDB
- Wallet Extension: HTML, CSS, JavaScript
- Testing: Mocha, Chai
    
</details>

<details open>
<summary>Features</summary>
<br/>

- Authentication for users using Private and Public Key Pair with the help of a Wallet Extension.  
   - window.vjcoin.importAccount()
   - window.vjcoin.generateKeyPair()
   - window.vjcoin.rewardTransaction(reward, receiver public key)

- Participated in Extracurrciular activities? Submit your application
- System and Faculty verfieis the application and rewards coins
- Coins can be utilized in oncampus activities creating a circular economy

</details>

<details>
    
<summary>Flowcharts of the Project</summary>

<br/>
     Generate key Pair <br/>
<img src="https://github.com/pal-16/engage-demo/blob/master/assets/flow-1.png"  /><br/>
    Import Account <br/>
    <img src="https://github.com/pal-16/engage-demo/blob/master/assets/flow-2.png"/><br/>
    Transaction <br/>
 <img src="https://github.com/pal-16/engage-demo/blob/master/assets/flow-3.png" /><br/>
</details>


<details open>
<summary>File Structure</summary>

<br/>

```
.
├── client
│   ├──  package.json # Maintains the dependencies 
│   ├── public # Stores public files like index.html
│   └── src
│       ├── actions # Redux actions and types
│       ├── reducers # Redux reducers
│       ├── components
│       └── app.jsx # File for the main component
|
|
└── server
│   ├──  package.json # Maintains the dependencies 
│   ├── test
│   └── src
|       ├── config
|       │   ├── dbconnect.js # Database connections.
|       │   └── index.js # Config object
|       ├── controllers
|       │   └── AuthController.js # Sample controller
|       ├── middleware
|       │   └── auth.js # Express middleware
|       ├── models
|       │   └── User.js # Mongoose model
|       ├── utility # Standard utilities
|       ├── views # .ejs files for mails
|       ├── app.js # Main server file
|       └── routes.js # Express routes
|
└── wallet-extesnion
│   ├── package.json # Maintains the dependencies 
│   ├── webpack.dev.js # module bundler
│   └── src
|       ├── utlitiies
|       ├── background.js
|       ├── contentScript.js
|       ├── manifest.json
|       ├── pages
|       │   └── generateKeyPair.html # Sample Template
|       └── css
|
├── SETUP.md
└── README.md

      
```
</details>

<details>
<summary>Screenshots</summary>
<img src="https://github.com/pal-16/engage-demo/blob/master/assets/1-new.JPG"  />
    <img src="https://github.com/pal-16/engage-demo/blob/master/assets/4.JPG"/>
 <img src="https://github.com/pal-16/engage-demo/blob/master/assets/2.JPG" />
  <img src="https://github.com/pal-16/engage-demo/blob/master/assets/3.JPG"  />
      <img src="https://github.com/pal-16/engage-demo/blob/master/assets/5.JPG"  />
      <img src="https://github.com/pal-16/engage-demo/blob/master/assets/6.JPG" />
      <img src="https://github.com/pal-16/engage-demo/blob/master/assets/7.JPG"  />
      <img src="https://github.com/pal-16/engage-demo/blob/master/assets/8.JPG" />
      <img src="https://github.com/pal-16/engage-demo/blob/master/assets/9.JPG"  />
      <img src="https://github.com/pal-16/engage-demo/blob/master/assets/10.JPG"  />
      <img src="https://github.com/pal-16/engage-demo/blob/master/assets/11.JPG" />
      <img src="https://github.com/pal-16/engage-demo/blob/master/assets/12.JPG"  />
      <img src="https://github.com/pal-16/engage-demo/blob/master/assets/13.JPG"  />
<br/>

</details>

<details open>
    
<summary>Testing</summary>

<br/>
    Testing is performed using Mocha and Chai <br/>
     <img src="https://github.com/pal-16/engage-demo/blob/master/assets/test-1.JPG" width=500 /><br/>
     <img src="https://github.com/pal-16/engage-demo/blob/master/assets/test-2.JPG" width=500 />
</details>

<details>
<summary>Error Handling</summary>

<br/>
   <img src="https://github.com/pal-16/engage-demo/blob/master/assets/error-1.png" width=600 />
   <img src="https://github.com/pal-16/engage-demo/blob/master/assets/error-2.png" width=600 />
   <img src="https://github.com/pal-16/engage-demo/blob/master/assets/error-3.png" width=500 />

</details>




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
    
- Frontend: ReactJS
- Backend: Node.js, Express.js
- Database: MongoDB
- Testing: Mocha, Chai
</details>

<details>
<summary>Features</summary>
<br/>
    
- A full stack web application leveraging a private blockchain that allows the students to showcase their achievements and receive suitable rewards for them in the form of VJCoins(Cryptocurreny of a Private University Blockchain)
- The rewards can be consumed in on-campus activities thus creating a circular economy within campus. 
- The portal can be accessed by a web browser by students and faculty alike. 
- Students submit applications of their achievements, highlighting the type of achievement and submitting a document of proof for it. They select a faculty, by whom they wish to review this application. 
- The system then performs certain checks for duplication. After successful verification, the faculty then suitably rewards the student. 
- Along with the web application, there is additional functionality for Wallet Browser Extension for key-pair generation, management, and sending transactions.
- The developed prototype is operational and will thus lead a better student and faculty engagement through incentivization. 

</details>

<details>
    
<summary>Flowcharts of the Project</summary>

<br/>
</details>


<details open>
<summary>File Structure</summary>

<br/>

```
.
├── package.json # Maintains the dependencies 
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
│   ├── webpack.dev.js # Stores public files like index.html
│   └── src
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




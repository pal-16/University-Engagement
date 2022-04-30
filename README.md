## Encouraging Student Partipicipation in Extra Curricular Achievements using an Incentivization Platform 

- The project aims to foster a blockchain-based system to encourage student participation in extracurricular activities. A full stack web application leveraging a private blockchain that allows the students to showcase their achievements and receive suitable rewards for them in the form of VJCoins(Cryptocurreny of a Private University Blockchain), that can be consumed in on-campus activities thus creating a circular economy within campus. 
- The portal can be accessed by a web browser by students and faculty alike. Students submit applications of their achievements, highlighting the type of achievement and submitting a document of proof for it. They select a faculty, by whom they wish to review this application. The system then performs certain checks for duplication. After successful verification, the faculty then suitably rewards the student. 
- Along with the web application, there is additional functionality for Wallet Browser Extension for key-pair generation, management, and sending transactions. The developed prototype is operational and will thus lead a better student and faculty engagement through incentivization. 

## Setup

1. Clone the repository

2. Download the `.env` files from [here](https://drive.google.com/drive/folders/1PtD4f61ON4NkOK_iARYHnM2kJaPXC0sE?usp=sharing)

### Server Setup

1. Rename `.env.server` to `.env` and put inside the `server` directory

2. Install the dependencies

```bash
  $ npm i
```

3. Run the development server

```bash
  $ npm run dev
```

4. Format the code before committing

```bash
  $ npm run format:server
```

### Client Setup

1. Rename `.env.client` to `.env` and put inside the `client` directory

2. Install the dependencies

```bash
  $ npm i
```

3. Run the development server

```bash
  $ npm run start
```

4. Format the code before committing

```bash
  $ npm run format:client

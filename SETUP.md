# SETUP

To setup a local development environment, follow the steps given below.

1. Ensure you have NodeJS, npm installed in your system.
2. Fork and then clone the repository
```bash
$ git clone https://github.com/<your-username>/University-Engagement.git
```
3. Install dependencies in `client` folder.
```bash
$ cd client
$ npm i
```
4. Install dependencies in `server` folder.
```bash
$ cd server 
$ npm i
```

5. Place the .env file in server and client directory
> `.env` is ignored by `git`, which you can see in `.gitignore`, and so, it's safe!

6. Start the development servers
```bash
$ cd server
$ npm run dev

$ cd client
$ npm run start
```

At the end of this, you should have
- server running at `http://localhost:8000`
- new_client running at `http://localhost:3000`

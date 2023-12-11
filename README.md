# ComposeDB Example App instructions

## Get DiD key

1. Run `npm install -g @composedb/cli` to install composedb cli 
2. Run `npx composedb did:generate-private-key` to generate a PRIVATE_KEY
3. Run `composedb did:from-private-key PRIVATE_KEY` to generate a ADMIN_DID

## Setup Docker ENV

1. Open `./docker/ceramic/config.json`
2. Replace `{YOUR_ADMIN_DID}` with the generated ADMIN_DID
3. Replace `{YOUR_PRIVATE_KEY}` with the generated PRIVATE_KEY
4. Run `docker compose up` to start the psql, ipfs and the cermaic node
5. the psql will start at port `5432`, the ipfs will start at port `5001` and the cermaic node will start at port `7007`

## Setup Cleint App
1. Run `npm install` to install the packages
2. Start the development server with `npm run dev` once.
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
8. Enjoy this demo application!

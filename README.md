This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). 

## Requirements
This app can be run with or without docker, so please see requirements below based on how you are going to execute the build.

### With Docker
* Docker: 27.^
* Docker Compose: 2.29.^

#### Setup
* In the root dir, execute the following:
```bash
docker-compose build

docker-compose up -d
```


### Without Docker

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Calculator
* Please go to http://localhost:3000/

## Car
* Please go to http://localhost:3000/cars

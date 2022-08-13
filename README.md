# Visual Audio NFT Marketplace

1. Give the user an option to upload their own audio files.
2. Then change the html files to use the uploaded audio files.
3. Then upload all the newly created html files to ipfs server.
4. Create a json file with the ipfs hash of the html files.
5. Then upload the json file to ipfs server.
6. The returned ipfs hash of the json file is the hash of the baseURI of the collection.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

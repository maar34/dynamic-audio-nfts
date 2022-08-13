# Visual Audio NFT Marketplace

Our vision is to prototype our NFT AudioVisualizers and build a one-stop factory where any digital artist can use our platform to create amazing visualizers based on Dynamic Audio. Currently, NFT owners can use our dynamic audio engine to change the audio of their NFT and rewrite the baseURI animation, but in the future, we will provide the factory that digital artists will have access to create their collection by using the visualizer script and provide the corresponding audio file for each NFT and everything else is automated and decentralized. The way we plan to implement this is that we interact with ZORA SmartContracts to create ERC721Drops and monetize them from our platform with a custom Drop_Metadata_Renderer. Best of all, all files in each NFT are protected by NFT.store by using its APIs. We also have plans to include some more cool stuff and contribute to the ZORA ecosystem by creating our own Drop_Metadata_Renderer implementation to provide more utilities with SmartContract, and AccessControl for NFT owners and project creators to monetize their own NFTs on the fly.

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

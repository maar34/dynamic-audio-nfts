import useUploadToStorage from "../hooks/useUploadToStorage"
import { useMoralis, useWeb3ExecuteFunction, useMoralisWeb3Api } from "react-moralis"
import { useState } from "react"
import Router from "next/router"
import { ethers } from "ethers"
import { creatorProxyAddress } from "../constants/contractAddresses"
import creatorProxyAbi from "../constants/creatorProxyAbi"
import { ConnectButton } from "@web3uikit/web3"
import abi from "../constants/abi"

export default function UpdateNft() {
    const Web3Api = useMoralisWeb3Api();
    const { authenticate, user } = useMoralis()
    const dropmetaDataContractAddress = "0xDd7900DCCeF58AA442d84D443d2525aAD4f6e80B"
    const contractProcessor = useWeb3ExecuteFunction()
    const [loading, setLoading] = useState(false)
    const [nftContract, setNftContract] = useState("0xDc937D2511Dd950526f5d77F67fe354Fe185746f")

    async function updateMetadata(base) {
        console.log("base", base)
        const ops = {
            contractAddress: dropmetaDataContractAddress,
            functionName: "updateMetadataBaseWithDetails",
            abi: abi,
            params: {
                target: nftContract,
                metadataBase: base,
                metadataExtension: ".json",
                newContractURI: base + "1.json",
                freezeAt: 1000000000
            }
        }
        await contractProcessor.fetch({
            params: ops,
            onSuccess: () => {
                console.log("success")
            },
            onError: (error) => {
                console.error(error)
            }
        })

        console.log("ops", ops)
    }


    const { upload } = useUploadToStorage()
    const onChange = async (e) => {
        setLoading(true)
        const file = e.target.files[0]
        const fileCid = await upload(file)
        const updateHtml = await fetch("api/updateHtml", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fileCid
            })
        })
        const dataCid = await updateHtml.json()
        console.log("dataCid", dataCid)
        const cid = dataCid.jsonCid
        const temp = `ipfs://${cid}/`
        await updateMetadata(temp)
        await Router.push({
            pathname: "/",
            query: {
                contract: nftContract
            }
        })
    }

    return (
        <div className="flex flex-col items-center">
            <div className="m-4 p-4">
                <h1 className="text-2xl font-semibold">Create NFT</h1>
            </div>
            <div className="p-2 m-2">
                <ConnectButton moralisAuth={false} />
                {
                    loading ?
                        <div className={"flex flex-col p-4 m-4"}>
                            <button disabled type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                <svg aria-hidden="true" role="status"
                                     className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor" />
                                </svg>
                                Loading...
                            </button>
                        </div>
                        :
                        <div className={"flex flex-col p-4 m-4"}>
                            <label htmlFor={"song"} className={"m-2"}>Choose a song</label>
                            <input className={"m-4"} type="file" name="song" onChange={onChange} />
                        </div>
                }

            </div>
        </div>
    )
}

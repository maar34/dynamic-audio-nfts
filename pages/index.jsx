import { useWeb3ExecuteFunction, useMoralis } from "react-moralis"
import { useState } from "react"
import { useGetToken } from "../hooks/useGetToken"
import { ConnectButton } from "@web3uikit/web3"
import abi2 from "../constants/abi2"
const { getData } = useGetToken()
import { Card } from "antd"
const { Meta } = Card
const styles = {
    NFTs: {
        display: "flex",
        flexWrap: "wrap",
        WebkitBoxPack: "start",
        justifyContent: "center",
        margin: "0 auto",
        marginTop: "20px",
        maxWidth: "1100px",
        gap: "30px",
    },
}
import { useRouter } from "next/router"

export default function Home() {
    const router = useRouter()
    useMoralis()
    const contractProcessor = useWeb3ExecuteFunction()

    async function tokenURI(contractAddress) {
        const ops = {
            contractAddress: contractAddress,
            functionName: "tokenURI",
            abi: abi2,
            params: {
                tokenId: 1,
            },
        }
        const response = await contractProcessor.fetch({
            params: ops,
            onSuccess: () => {
                console.log("success")
            },
            onError: (error) => {
                console.error(error)
            },
        })
        return response
    }

    const [jsonObj, setJsonObj] = useState([])
    const [render, setRender] = useState(false)

    const updateJsonObj = async (updatedArray) => {
        setJsonObj((prevState) => [...prevState, ...updatedArray])
    }

    const display = async () => {
        const data = router.query
        const contract = data.contract || "0xDc937D2511Dd950526f5d77F67fe354Fe185746f"
        const response = await tokenURI(contract)
        const jsonDir = await response.slice(0, -6)
        const array = jsonDir.replace("ipfs://", "https://nftstorage.link/ipfs/")
        let result = []
        for (let i = 1; i < 6; i++) {
            let temp = array + i + ".json"
            result.push(temp)
        }
        let tempArr = [...jsonObj]
        for (let i = 0; i < 5; i++) {
            const data = await getData(result[i])
            let temp = data.animation_url
            temp = temp.replace("ipfs://", "https://nftstorage.link/ipfs/")
            tempArr.push(temp)
        }
        await updateJsonObj(tempArr)
        setRender(true)
    }

    return (
        <div>
            <div className="flex flex-row justify-between p-4 m-4">
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={display}
                >
                    Click to get NFTs
                </button>
                <ConnectButton />
            </div>
            <div>
                <div style={styles.NFTs}>
                    {render &&
                        jsonObj.map((nft, index) => {
                            return (
                                <Card
                                    cover={
                                        <iframe
                                            src={nft || "error"}
                                            sandbox="allow-same-origin allow-scripts allow-forms"
                                            height="500px"
                                            width="500px"
                                            style={{
                                                splashscreen: "true",
                                                overflow: "hidden",
                                            }}
                                        />
                                    }
                                    key={index}
                                >
                                    <Meta title={`VSL TokenID: ${index + 1}`} />
                                </Card>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

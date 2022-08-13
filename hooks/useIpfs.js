export const useIPFS = () => {
    function resolveLink(url) {
        if (!url || !url.includes("ipfs://")) return url
        url.replace("ipfs://", "https://nftstorage.link/ipfs/")
        let result = []
        for (let i = 1; i < 6; i++) {
            let temp = url + i + ".json"
            result.push(temp)
        }
        return result
    }

    function resolveLink2(url) {
        return url.replace("ipfs://", "https://nftstorage.link/ipfs/")
    }

    return { resolveLink, resolveLink2 }
}

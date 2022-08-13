import { NFTStorage, Blob, File } from "nft.storage"

const useUploadToStorage = () => {
    const endpoint = "https://api.nft.storage" // the default
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAyYTBDMUE4NjVDYUQ2QjRkNThBMmQ3ZTczM2QxQmZlODExMGI1MTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1Mzc2MzE0NjQ2NiwibmFtZSI6Im5mdHMifQ.muYCOBPi5WGkwgsQIxNe2GOSpgVxzZf_4Dv5jiEq9Dk" // your API key from https://nft.storage/manage

    const storage = new NFTStorage({ endpoint, token })

    const upload = async (file) => {
        const blob = new Blob([file], { type: "audio/mp3" })
        const cid = await storage.storeBlob(blob)
        return cid
    }

    return { upload }
}

export default useUploadToStorage

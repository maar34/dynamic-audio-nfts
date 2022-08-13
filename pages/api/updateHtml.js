import fs from "fs"
import { NFTStorage, File } from "nft.storage"

const endpoint = "https://api.nft.storage"
const token = process.env.NEXT_PUBLIC_NFT_STORAGE_API

const regex = /https:\/\/.*\.ipfs\.dweb\.link/g
const jsonRegex = /ipfs:\/\/.*\/demo\d\.html/g

function updateHtml(html, cid) {
    let toReplace = "https://" + cid + ".ipfs.dweb.link"
    let result = html.replace(regex, toReplace)
    return result
}

async function storeHTMLDirectory() {
    const storage = new NFTStorage({ endpoint, token })
    const viz1 = await fs.promises.readFile("./constants/Pages/demo1.html")
    const viz2 = await fs.promises.readFile("./constants/Pages/demo2.html")
    const viz3 = await fs.promises.readFile("./constants/Pages/demo3.html")
    const viz4 = await fs.promises.readFile("./constants/Pages/demo4.html")
    const viz5 = await fs.promises.readFile("./constants/Pages/demo5.html")

    const cid = await storage.storeDirectory([
        new File([viz1], "demo1.html"),
        new File([viz2], "demo2.html"),
        new File([viz3], "demo3.html"),
        new File([viz4], "demo4.html"),
        new File([viz5], "demo5.html")
    ])
    return cid
}

function updateJson(json, cid, token) {
    let toReplace = "ipfs://" + cid + "/demo" + token + ".html"
    console.log("jsonToReplace", toReplace)
    let result = json.replace(jsonRegex, toReplace)
    return result
}

async function storeJSONDirectory() {
    const storage = new NFTStorage({ endpoint, token })
    const j1 = await fs.promises.readFile("./constants/jsons/1.json")
    const j2 = await fs.promises.readFile("./constants/jsons/2.json")
    const j3 = await fs.promises.readFile("./constants/jsons/3.json")
    const j4 = await fs.promises.readFile("./constants/jsons/4.json")
    const j5 = await fs.promises.readFile("./constants/jsons/5.json")
    const cid = await storage.storeDirectory([
        new File([j1], "1.json"),
        new File([j2], "2.json"),
        new File([j3], "3.json"),
        new File([j4], "4.json"),
        new File([j5], "5.json")
    ])
    return cid
}

async function main(audioCid) {
    for (let i = 1; i < 6; i++) {
        let path = "./constants/Pages/demo" + i + ".html"
        let html = fs.readFileSync(path, "utf8")
        let result = updateHtml(html, audioCid)
        fs.writeFileSync(path, result)
    }
    const cid = await storeHTMLDirectory()
    for (let i = 1; i < 6; i++) {
        let path = "./constants/jsons/" + i + ".json"
        let json = fs.readFileSync(path, "utf8")
        let result = updateJson(json, cid, i)
        fs.writeFileSync(path, result)
    }
    const jsonCid = await storeJSONDirectory()
    console.log("jsonCid: " + jsonCid)
    return jsonCid
}

export default async function handler(req, res) {
    const cid = req.body.fileCid
    console.log("fileCid: " + cid)
    const jsonCid = await main(cid)
    res.status(200).send({
        jsonCid
    })
}

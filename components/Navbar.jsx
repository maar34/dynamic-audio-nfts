import { Navbar } from "flowbite-react"
import { useRouter } from "next/router"

export default function CustomNavbar() {
    const router = useRouter()
    return (
        <Navbar fluid={true} rounded={false} className="bg-slate-500">
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Dynamic Audio NFT
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="/" active={router.pathname == "/" ? true : false}>
                    Home
                </Navbar.Link>
                <Navbar.Link
                    href="/update-nft"
                    active={router.pathname == "/update-nft" ? true : false}
                >
                    Update NFT Audio
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

import "../styles/globals.css"
import Navbar from "../components/Navbar"
import { MoralisProvider } from "react-moralis"

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider
            appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
            serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
        >
            <Navbar />
            <Component {...pageProps} />
        </MoralisProvider>
    )
}

export default MyApp

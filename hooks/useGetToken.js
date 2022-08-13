export const useGetToken = () => {
    const getData = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }

    return {
        getData,
    }
}

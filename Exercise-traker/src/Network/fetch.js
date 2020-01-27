export const fetchData = async (url, method, body) => {
    try {
        var res = await fetch(url, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        var resJson = await res.json()
    } catch (error) {
        console.log(error)
    }
    return resJson
}
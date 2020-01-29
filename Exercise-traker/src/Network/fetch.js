const axios = require('axios').default
axios.defaults.withCredentials = true

export const fetchData = async (url, method, body)=>{
    try{
        if(method === "POST"){
            var resPost = await axios.post(url,body)
            console.log(resPost)
            return resPost.data
        }else{
            var resGet = await axios.get(url, body)
            console.log(resGet)
            return resGet.data
        }
    } catch (err){
        console.log(err)
    }
}
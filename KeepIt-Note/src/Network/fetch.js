const axios = require('axios').default
axios.defaults.withCredentials = true

export const fetchData = async (url, method, body)=>{
    try{
        if(method === "POST"){
            var resPost = await axios.post(url,body)
            return resPost.data
        }else{
            var resGet = await axios.get(url, body)
            return resGet.data
        }
    } catch (err){
        console.log(err)
    }
}
const axios = require('axios').default
axios.defaults.withCredentials = true

export const fetchData = async (url, method, body)=>{
    try{
        if(method === "POST"){
            var resPost = await axios.post(url,body)
            return resPost.data
        }else if(method === "GET"){
            var resGet = await axios.get(url, body)
            return resGet.data
        }else if(method === 'PUT'){
            var resPut = await axios.put(url, body)
            return resPut.data
        }else if(method === 'DELETE'){
            var resDelete = await axios.delete(url, JSON.stringify(body))
            return resDelete.data
        }
    } catch (err){
        console.log(err)
    }
}
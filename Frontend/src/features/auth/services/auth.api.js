import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
    timeout:10000
})


export const register = async ({username,email,password})=>{
    try{
        const res = await api.post('/api/auth/register',{
            username,
            email,
            password
        }) 
        
        return res.data

    }catch(err){
        console.log(err)
    }
}

export const login = async ({email,password})=>{    
    const res = await api.post('/api/auth/login',{email,password}) 
    return res.data

}


export const logout = async ()=>{
    try{
        const res = await api.get('/api/auth/logout') 
        
        return res.data

    }catch(err){
        console.log(err)
    }
}


export const getMe = async ()=>{
    try{
        const res = await api.get('/api/auth/get-me') 
        
        return res.data

    }catch(err){
        console.log(err)
    }
}
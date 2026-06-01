import { useState } from "react"
import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

const Register = () => {

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {loading,handleRegister} = useAuth()
  const navigate = useNavigate()
    



  async function handleSubmit(e){
    e.preventDefault()
    await handleRegister({username,email,password})
    navigate("/")


  }

  if(loading){
    return <main><h1>Loading</h1></main>
  }




  return (
    <main>

      <div className="form-container">

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="username" id="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Username" />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email Address" />
          </div>


          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
          </div>

          <button className="button primary-button">Register</button>

        </form>


        <p>Already have an account? <NavLink to={'/login'}>Login</NavLink></p>
        

      </div>


    </main>
  )
}


export default Register
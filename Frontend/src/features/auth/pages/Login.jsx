import { NavLink, useNavigate } from 'react-router'
import '../../auth/auth.form.scss'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'


const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {loading,handleLogin} = useAuth()
  const navigate = useNavigate()

  


  async function handleSubmit(e){
    e.preventDefault()
    await handleLogin({email,password})
    navigate("/")


  }

  if(loading){
    return <main><h1>Loading</h1></main>
  }



  return (
    <main>

      <div className="form-container">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email Address" />
          </div>


          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
          </div>

          <button className="button primary-button">Login</button>

        </form>
        
        <p>Don't have an account? <NavLink to={'/register'}>Register</NavLink></p>

      </div>


    </main>
  )
}

export default Login
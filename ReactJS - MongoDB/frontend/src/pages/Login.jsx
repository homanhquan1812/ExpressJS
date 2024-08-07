import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../../public/css/bootstrap.min.css'
import '../../public/css/site.css'
import '../../public/css/style.css'

const Login = () => {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [loginError, setLoginError] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const navigateTo = useNavigate()

  // This is just to make the limit warning board show up
  useEffect(() => {
    if (attempts >= 5) {
      setIsBlocked(true)
      const timer = setTimeout(() => {
        setIsBlocked(false)
        setAttempts(0)
      }, 900000) // 15 minutes cooldown
      return () => clearTimeout(timer)
    }
  }, [attempts])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username, password
      })

      if (response.status == 200) {
        console.log('Login successful:', response.data)
        localStorage.setItem('token', response.data.token)
        setLoginError(false)
          
        navigateTo('/')
      }
    } catch (error) {
      setLoginError(true)
      setAttempts(prev => prev + 1)
      console.error(error)
    }
  }

  return (
    <div>
      <Heads></Heads>
      <Headers></Headers>
      <div>
        <div class="container">
          <main role="main" class="pb-3">
            <br />
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Username</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-3 col-form-label">Password</label>
              <div className="col-sm-6">
                <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            {
              isBlocked && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                  <strong>Too many login attempts from this IP, please try again after 15 minutes.</strong>
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                </div>
              )
            }    
            {
              loginError && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                  <strong>Username or password is incorrect.</strong>
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                </div>
              )
            }
            <div className="row mb-3">
              <div className="offset-sm-3 col-sm-3 d-grid">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
              <div className="col-sm-3 d-grid">
                <a className="btn btn-outline-primary" href="/" role="button">Cancel</a>
              </div>
            </div>
          </form>
          </main>
        </div>
      </div>
      <Footers></Footers>
    </div>
  )
}

export default Login
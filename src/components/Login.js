import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../contexts/auth.context'
import Swal from "sweetalert2";
import warning from '../images/warning.png'

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { setLoggedInUser } = useContext(AuthContext)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const messageError = () => {
    Swal.fire({
      text: "Employee name not found!",
      imageUrl: warning,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom Image'
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const userLogin = {
      name, password
    }

    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, userLogin)
      .then(response => {
        localStorage.setItem("loggedInUser", JSON.stringify(response.data))
        setLoggedInUser(response.data)
        setName('')
        setPassword('')
        navigate('/home')
      }).catch (error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error:', error)
        }
      })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            required
            placeholder="Employee name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <input 
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)} 
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={handleTogglePassword}
          />
        </div>

        <button
          type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
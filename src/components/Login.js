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
      <h2 className="text-3xl mb-4 text-white">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div>
          <input 
            type="text" 
            className="m-1 p-1 rounded border-1 border-black w-52 h-9"
            required
            placeholder="Employee name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <div className="ml-4">
            <input
              type={showPassword ? 'text' : 'password'}
              className="ml-4 p-1 rounded border-1 border-black w-52 h-9"
              required
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={handleTogglePassword}
            className="bg-white p-1 rounded ml-2 transition duration-500 transform hover:scale-125 hover:border"
          />
        </div>
        <button
          type="submit"
          className="border-1 border-black rounded text-lg px-2 bg-blue-500 text-white font-semibold m-5 w-52 h-9 transition duration-500 transform hover:scale-105 hover:border">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import warning from '../images/warning.png'
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateNewUserPage = () => {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [level, setLevel] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState('')
  const [comments, setComments] = useState('')
  const [dob, setDob] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [position, setPosition] = useState('')
  const [startingDate, setStartingDate] = useState('')
  const [emergencyContact, setEmergencyContact] = useState('')
  const [refresh, setRefresh] = useState(true)

  const navigate = useNavigate()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  const messageError = () => {
    Swal.fire({
      text: "Definir mensagem!",
      imageUrl: warning,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom Image'
    })
  }
  
  const handleSubmit = e => {
    e.preventDefault()

    const newUser = { name, level, password, department, comments, dob, phoneNumber, position, startingDate, emergencyContact }

    setUsers([...users, newUser])
    setName('')
    setLevel('')
    setPassword('')
    setDepartment('')
    setComments('')
    setDob('')
    setPhoneNumber('')
    setPosition('')
    setStartingDate('')
    setEmergencyContact('')

    axios.post(`${process.env.REACT_APP_API_URL}/auth/sign-up/user`, newUser, {headers})
      .then(response => {
        navigate('/users')
        if (response.status === 201) {
          setRefresh(!refresh)
          Swal.fire({
            text: 'User created succesfully!',
            imageUrl: warning,
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'Custom Image'
          })
        }
      }).catch (error => {
        messageError(error.response.data.message)
      })
  }

  return (
    <div>
      <Navbar />
      <h1 className="mb-2 mt-3 text-2xl font-semibold">Add new user</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <div className="flex mb-1">
              <input 
                type="text" 
                className="border-2 rounded px-1 w-48 h-9"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
              />
              <select
                className={`border-2 rounded px-1 w-48 h-9 ${
                level === "admin" || level === "user"
                  ? "text-black"
                  : "text-gray-400"
              }`}
                value={level}
                onChange={e => setLevel(e.target.value)}>
                <option value="">Choose an user level</option>
                <option value="admin">Administrator</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex mb-1">
              <input 
                type="text" 
                className="border-2 rounded px-1 w-48 h-9"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
              />
              <select
                className={`border-2 rounded px-1 w-48 h-9 ${
                department === "production" || department === "warehouse"
                  ? "text-black"
                  : "text-gray-400"
              }`}
                value={department}
                onChange={e => setDepartment(e.target.value)}>
                <option value="">Choose a department</option>
                <option value="production">Production</option>
                <option value="warehouse">Warehouse</option>
              </select>
            </div>
            <div className="flex mb-1">
              <input 
                type="text" 
                className="border-2 rounded px-1 w-48 h-9"
                required
                value={position}
                onChange={e => setPosition(e.target.value)}
                placeholder="Position"
              />
              <DatePicker
                className="border-2 rounded px-1 w-48 h-9"
                selected={startingDate}
                onChange={(date) => setStartingDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Starting Date"
              />
            </div>
            <div className="flex mb-1">
              <DatePicker
                className="border-2 rounded px-1 w-48 h-9"
                selected={dob}
                onChange={(date) => setDob(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Date of Birth"
              />
              <input 
                type="text" 
                className="border-2 rounded px-1 w-48 h-9"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
              />
            </div>
            <input 
                type="text" 
                className="border-2 rounded px-1 w-96 h-9 mb-1"
                value={emergencyContact}
                onChange={e => setEmergencyContact(e.target.value)}
                placeholder="Emergency Contact"
            />
            <textarea 
                type="text" 
                className="border-2 rounded px-1 w-96 h-9"
                value={comments}
                onChange={e => setComments(e.target.value)}
                placeholder="Comments"
            />
          </div>
          <button
            type="submit"
            className="border-1 rounded text-lg px-2 bg-blue-500 text-white font-semibold mt-2 w-52 h-9 transition duration-500 transform hover:scale-105 hover:border hover:border-blue-900 shadow-xl shadow-blue-900">
            Add
          </button>
        </form>
      </div>
      <Link to={'/home'}>
        <p className="text-blue-500 underline mt-3">Back</p>
      </Link>
    </div>
  )
}

export default CreateNewUserPage
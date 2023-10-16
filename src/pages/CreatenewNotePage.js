import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import warning from '../images/warning.png'
import Navbar from "../components/Navbar";

const CreateNewNote = () => {
  const [notes, setNotes] = useState([])
  const [information, setInformation] = useState('')
  const [refresh, setRefresh] = useState(true)

  const navigate = useNavigate()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  const messageError = () => {
    Swal.fire({
      text: "Definir mensagem Create new Shortages Page!",
      imageUrl: warning,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom Image'
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const newNote = { information: information };

    setNotes([...notes, newNote])
    setInformation('')

    axios.post(`${process.env.REACT_APP_API_URL}/notice/new`, newNote, { headers })
      .then(response => {
        navigate('/home')
        if (response.status === 201) {
          setRefresh(!refresh)
          Swal.fire({
            text: 'Note added succesfully!',
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
      <Navbar/>
      <h1 className="mb-2 mt-3 text-2xl font-semibold">Add new Note</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <textarea 
              type="text" 
              className="border-2 rounded px-1 w-96 h-36"
              value={information}
              onChange={e => setInformation(e.target.value)}
              placeholder="Type your note here..."
            />
          </div>
          <button
            type="submit"
            className="border-1 rounded text-lg px-2 bg-blue-500 text-white font-semibold mt-2 w-96 h-9 transition duration-500 transform hover:scale-105 hover:border hover:border-blue-900 shadow-xl shadow-blue-900">
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

export default CreateNewNote
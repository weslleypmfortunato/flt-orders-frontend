import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import warning from '../images/warning.png'

const NoteEditPage = () => {
  const [information, setInformation] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { noteId } = useParams()

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

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/notice/${noteId}`, { headers })
      .then(response => {
        const {
          information
        } = response.data

        setInformation(information)
        setLoading(false)
      }).catch (error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error:', error)
        }
      })
  }, [noteId])

  const handleSubmit = e => {
    e.preventDefault()
    const editedNote = {information}

    axios.put(`${process.env.REACT_APP_API_URL}/notice/edit/${noteId}`, editedNote)
      .then(response => {
        navigate('/home')
      }).catch (error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error', error)
        }
      })
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-5 w-full">
        <h1 className="mb-2 mt-3 text-2xl font-semibold">Edit Note Details</h1>
        <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <textarea 
              type="text" 
              className="border-2 rounded px-1 w-96 h-36"
              required
              value={information}
              onChange={e => setInformation(e.target.value)}
              placeholder="Type your note here..."
            />
          </div>
          <button
            type="submit"
            className="border-1 rounded text-lg px-2 bg-blue-500 text-white font-semibold mt-2 w-52 h-9">
            Save
          </button>
        </form>
        </div>
        <Link to={'/home'}>
          <p className="text-blue-500 underline mt-3">Back</p>
        </Link>
      </div>
    </div>
  )
}

export default NoteEditPage
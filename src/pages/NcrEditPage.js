import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import warning from '../images/warning.png';

const NcrEditPage = () => {
  const [title, setTitle] = useState('')
  const [reference, setReference] = useState('')
  const [creator, setCreator] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { ncrId } = useParams()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  const messageError = () => {
    Swal.fire({
      text: "Error!",
      imageUrl: warning,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom Image'
    })
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/ncr/${ncrId}`, { headers })
      .then(response => {
        const {
          title, reference, creator, location, description
        } = response.data

        setTitle(title)
        setReference(reference)
        setCreator(creator)
        setLocation(location)
        setDescription(description)
        setLoading(false)
      })
      .catch(error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error:', error)
        }
      });
  }, [ncrId])

  const handleSubmit = e => {
    e.preventDefault()
    const editedNcr = {
      title,
      reference,
      creator,
      location,
      description
    }

    axios.put(`${process.env.REACT_APP_API_URL}/ncr/edit/${ncrId}`, editedNcr)
      .then(response => {
        navigate('/ncr')
      })
      .catch(error => {
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
      <Navbar/>
      <h1 className="mb-4 mt-4 text-2xl font-semibold">Non-Conformance Report</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <div className="flex flex-col mb-1 w-3/5 border rounded">
              <h2 className="mb-1 mt-1 text-xl font-semibold border-b h-9">NCR Identification</h2>
              <div className="flex flex-row items-baseline border-b gap-2 mb-1">
                <h4 className="text-lg font-semibold pl-2 mr-12">Title:</h4>
                <input
                  type="text"
                  className="pl-2 border-b rounded-b w-full mx-2 h-8"
                  required
                  value={capitalizeFirstLetter(title)}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Type here..."
                />
              </div>
              <div className="flex flex-row items-baseline border-b gap-2 mb-1">
                <h4 className="text-lg font-semibold pl-2">Reference:</h4>
                <input
                  type="text"
                  className="pl-2 border-b rounded-b w-full mx-2 h-8"
                  required
                  value={capitalizeFirstLetter(reference)}
                  onChange={e => setReference(e.target.value)}
                  placeholder="Type here..."
                />
              </div>
              <div className="flex flex-row items-baseline border-b gap-2">
                <h4 className="text-lg font-semibold pl-2 mr-5">Creator:</h4>
                <input
                  type="text"
                  className="pl-2 border-b rounded-b w-full mx-2 h-8"
                  required
                  value={capitalizeFirstLetter(creator)}
                  onChange={e => setCreator(e.target.value)}
                  placeholder="Type here..."
                />
              </div>
            </div>
            <div className="flex flex-col mb-1 w-3/5 border rounded mt-4">
              <h2 className="mb-1 mt-1 text-xl font-semibold border-b h-9">Non-Conformance Details</h2>
              <div className="flex flex-row items-baseline border-b gap-2 mb-1">
                <h4 className="text-lg font-semibold pl-2 mr-7">Location:</h4>
                <input
                  type="text"
                  className="pl-2 border-b rounded-b w-full mx-2 h-8"
                  value={capitalizeFirstLetter(location)}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Type here..."
                />
              </div>
              <div className="flex flex-row items-baseline gap-2 mb-1">
                <h4 className="text-lg font-semibold pl-2">Description:</h4>
                <textarea
                  className="pl-2 pt-2 border-b rounded-b w-full mx-2 h-36"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Type here..."
                />
              </div>
            </div>

            <div className="flex flex-col mb-1 w-3/5 border rounded mt-4">
              <h2 className="mb-1 mt-1 text-xl font-semibold border-b h-9">Non-Conformance Close-out</h2>
              <div className="flex flex-col mb-1 text-left">
                <h4 className="text-lg font-semibold pl-2 border-b h-36">Cause of NCR:</h4>
                <h4 className="text-lg font-semibold pl-2 border-b">Close-out Date:</h4>
                <h4 className="text-lg font-semibold pl-2 border-b h-36">Reason for Closure:</h4>
                <h4 className="text-lg font-semibold pl-2 border-b">Latest Disposition</h4>
                <h4 className="text-lg font-semibold pl-2 h-4">Closer:</h4>
              </div>
            </div>

          </div>
          <button
            type="submit"
            className="border-1 rounded text-lg px-2 bg-blue-500 text-white font-semibold mt-2 w-52 h-9 transition duration-500 transform hover:scale-105 hover:border hover:border-blue-900 shadow-xl shadow-blue-900">
            Save
          </button>
        </form>
      </div>
      <Link to={'/home'}>
        <p className="text-blue-500 underline mt-3">Back</p>
      </Link>
    </div>
  )
}

export default NcrEditPage

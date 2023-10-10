import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import warning from '../images/warning.png'

const ShortageEditPage = () => {
  const [materialName, setMaterialName] = useState('')
  const [materialQty, setMaterialQty] = useState('')
  const [shortageRemark, setShortageRemark] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { shortageId } = useParams()

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
    axios.get(`${process.env.REACT_APP_API_URL}/shortage/${shortageId}`, { headers })
      .then(response => {
        const {
          materialName, materialQty, shortageRemark
        } = response.data
        setMaterialName(materialName)
        setMaterialQty(materialQty)
        setShortageRemark(shortageRemark)
        setLoading(false)
      }).catch (error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error:', error)
        }
      })
  }, [shortageId])

  const handleSubmit = e => {
    e.preventDefault()
    const editedShortage = {materialName, materialQty, shortageRemark}

    axios.put(`${process.env.REACT_APP_API_URL}/shortage/edit/${shortageId}`, editedShortage)
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
        <h1 className="mb-2 mt-3 text-2xl font-semibold">Edit Shortage Details</h1>
        <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <input 
              type="text" 
              className="border-2 rounded px-1 w-52 h-9 mb-1"
              required
              value={materialName}
              onChange={e => setMaterialName(e.target.value)}
              placeholder="Material Name"
            />
            <input 
              type="text" 
              className="border-2 rounded px-1 w-52 h-9 mb-1"
              required
              value={materialQty}
              onChange={e => setMaterialQty(e.target.value)}
              placeholder="Quantity"
            />
            <input 
              type="text" 
              className="border-2 rounded px-1 w-52 h-9"
              required
              value={shortageRemark}
              onChange={e => setShortageRemark(e.target.value)}
              placeholder="Remarks"
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

export default ShortageEditPage
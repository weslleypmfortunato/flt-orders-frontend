import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import warning from '../images/warning.png'
import Navbar from "../components/Navbar";

const CreateNewShortagesPage = () => {
  const [shortages, setShortages] = useState([])
  const [materialName, setMaterialName] = useState('')
  const [materialQty, setMaterialQty] = useState('')
  const [shortageRemark, setShortageRemark] = useState('')
  const [refresh, setRefresh] = useState(true)

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

    const newShortage = { materialName, materialQty, shortageRemark }

    setShortages([...shortages, newShortage])
    setMaterialName('')
    setMaterialQty('')
    setShortageRemark('')

    axios.post(`${process.env.REACT_APP_API_URL}/shortages/new`, newShortage, { headers })
      .then(response => {
        if (response.status === 201) {
          setRefresh(!refresh)
          Swal.fire({
            text: 'Shortage added succesfully!',
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
      <h1 className="mb-2 mt-3 text-2xl font-semibold">Add new shortage</h1>
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
            <textarea 
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

export default CreateNewShortagesPage
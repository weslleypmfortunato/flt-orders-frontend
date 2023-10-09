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
            text: 'Adicionar a mensagem de erro na WorkOrders.js',
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
      <h1>Add new shortage</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              required
              value={materialName}
              onChange={e => setMaterialName(e.target.value)}
              placeholder="Material Name"
            />
            <input 
              type="text" 
              required
              value={materialQty}
              onChange={e => setMaterialQty(e.target.value)}
              placeholder="Quantity"
            />
            <input 
              type="text" 
              required
              value={shortageRemark}
              onChange={e => setShortageRemark(e.target.value)}
              placeholder="Remarks"
            />
          </div>
          <button
            type="submit">
            Add
          </button>
        </form>
      </div>
      <Link to={'/home'}>
        <p>Back</p>
      </Link>
    </div>
  )
}

export default CreateNewShortagesPage
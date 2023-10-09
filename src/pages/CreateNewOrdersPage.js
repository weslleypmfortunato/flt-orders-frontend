import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import warning from '../images/warning.png'
import Navbar from "../components/Navbar";

const CreateNewOrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [workOrderNumber, setWorkOrderNumber] = useState('')
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [orderQty, setOrderQty] = useState('')
  const [priority, setPriority] = useState('')
  const [owner, setOwner] = useState('')
  const [remarks, setRemarks] = useState('')
  const [refresh, setRefresh] = useState(true)

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

    const newOrder = { workOrderNumber, productName, productDescription, orderQty, priority, owner, remarks }

    setOrders([...orders, newOrder])
    setWorkOrderNumber('')
    setProductName('')
    setProductDescription('')
    setOrderQty('')
    setPriority('')
    setOwner('')
    setRemarks('')

    axios.post(`${process.env.REACT_APP_API_URL}/orders/new`, newOrder, { headers })
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
      <h1>Add new order</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              required
              value={workOrderNumber}
              onChange={e => setWorkOrderNumber(e.target.value)}
              placeholder="Work Order Number"
            />
            <input 
              type="text" 
              required
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="Product Name"
            />
            <input 
              type="text" 
              required
              value={productDescription}
              onChange={e => setProductDescription(e.target.value)}
              placeholder="Work Order Description"
            />
            <input 
              type="text" 
              required
              value={orderQty}
              onChange={e => setOrderQty(e.target.value)}
              placeholder="Order Quantity"
            />
            <input 
              type="text" 
              required
              value={priority}
              onChange={e => setPriority(e.target.value)}
              placeholder="Priority"
            />
            <input 
              type="text" 
              required
              value={owner}
              onChange={e => setOwner(e.target.value)}
              placeholder="Owner"
            />
            <input 
              type="text" 
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
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

export default CreateNewOrdersPage
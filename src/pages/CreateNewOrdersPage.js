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
            text: 'Order placed succesfully!',
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
      <h1 className="mb-2 mt-3 text-2xl font-semibold">Add new order</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <div className="flex mb-1">
              <input
                type="text"
                className="border-2 rounded px-1 w-48 h-9"
                required
                value={workOrderNumber}
                onChange={e => setWorkOrderNumber(e.target.value)}
                placeholder="Work Order Number"
              />
              <input
                type="text"
                className="border-2 rounded px-1 w-48 h-9"
                required
                value={productName}
                onChange={e => setProductName(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div className="flex mb-1">
              <input
                type="text"
                className="border-2 rounded px-1 w-48 h-9"
                required
                value={productDescription}
                onChange={e => setProductDescription(e.target.value)}
                placeholder="Work Order Description"
              />
              <input
                type="text"
                className="border-2 rounded px-1 w-48 h-9"
                required
                value={orderQty}
                onChange={e => setOrderQty(e.target.value)}
                placeholder="Order Quantity"
              />
            </div>
            <div className="flex mb-1">
              <input
                type="text"
                className="border-2 rounded px-1 w-48 h-9"
                required
                value={priority}
                onChange={e => setPriority(e.target.value)}
                placeholder="Priority(must be a number)"
              />
              <input
                type="text"
                className="border-2 rounded px-1 w-48 h-9"
                required
                value={owner}
                onChange={e => setOwner(e.target.value)}
                placeholder="Owner"
              />
            </div>
            <input 
              type="text" 
              className="border-2 rounded px-1 w-96 h-9"
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
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

export default CreateNewOrdersPage
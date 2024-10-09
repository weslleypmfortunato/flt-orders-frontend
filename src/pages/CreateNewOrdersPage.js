import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import warning from '../images/warning.png'
import Navbar from "../components/Navbar";

const CreateNewOrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [workOrderNumber, setWorkOrderNumber] = useState('')
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [orderQty, setOrderQty] = useState('')
  const [priority, setPriority] = useState(100)
  const [owner, setOwner] = useState('')
  const [status, setStatus] = useState('')
  const [material, setMaterial] = useState('')
  const [remarks, setRemarks] = useState('')
  const [deleteStatus, setDeleteStatus] = useState(false)
  const [orderLink, setOrderLink] = useState('')
  const [refresh, setRefresh] = useState(true)

  const navigate = useNavigate()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  const messageError = () => {
    Swal.fire({
      text: "Internal Server Error. Try again!",
      imageUrl: warning,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom Image'
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const newOrder = { workOrderNumber, productName, productDescription, orderQty, priority, owner, status, material, remarks, deleteStatus, orderLink }

    setOrders([...orders, newOrder])
    setWorkOrderNumber('')
    setProductName('')
    setProductDescription('')
    setOrderQty('')
    setPriority('')
    setOwner('')
    setStatus('')
    setMaterial('')
    setRemarks('')
    setDeleteStatus('')
    setOrderLink('')

    axios.post(`${process.env.REACT_APP_API_URL}/orders/new`, newOrder, { headers })
      .then(response => {
        navigate('/home')
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
                value={owner}
                onChange={e => setOwner(e.target.value)}
                placeholder="Owner"
              />
            </div>
            <div className="flex mb-1">
              <input
                type="number"
                className="border-2 rounded px-1 w-48 h-9"
                value={priority}
                onChange={e => setPriority(e.target.value)}
                placeholder="Priority"
              />
              <input
                type="number"
                className="border-2 rounded px-1 w-48 h-9"
                required
                value={orderQty}
                onChange={e => setOrderQty(e.target.value)}
                placeholder="Quantity"
              />
            </div>
            <div className="flex mb-1">
              <select 
                className="border-2 rounded px-1 w-48 h-9"
                value={status}
                onChange={e => setStatus(e.target.value)}>
                <option value="">Status</option>
                <option value="In Progress"> In Progress</option>
                <option value="Partially Completed">Partially Completed</option>
                <option value="Completed">Completed</option>
                <option value="Missing Parts">Missing Parts</option>
                <option value="Expedite">Expedite</option>
              </select>
              {/* <select 
                className="border-2 rounded px-1 w-48 h-9"
                value={material}
                onChange={e => setMaterial(e.target.value)}>
                <option value="">Material Status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Partially">Partially Picked</option>
                <option value="Shortage">Shortage</option>
              </select> */}
              <input 
              type="text" 
              className="border-2 rounded px-1 w-48 h-9 mb-1"
              value={material}
              onChange={e => setMaterial(e.target.value)}
              placeholder="Material Status"
              />
            </div>
            <input 
              type="text" 
              className="border-2 rounded px-1 w-96 h-9 mb-1"
              value={orderLink}
              onChange={e => setOrderLink(e.target.value)}
              placeholder="Order Link"
            />
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
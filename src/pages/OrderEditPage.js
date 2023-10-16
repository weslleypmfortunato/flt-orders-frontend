import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import warning from '../images/warning.png'

const OrderEditPage = () => {
  const [workOrderNumber, setWorkOrderNumber] = useState('')
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [orderQty, setOrderQty] = useState('')
  const [priority, setPriority] = useState('')
  const [owner, setOwner] = useState('')
  const [remarks, setRemarks] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { orderId } = useParams()

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
    axios.get(`${process.env.REACT_APP_API_URL}/order/${orderId}`, { headers })
      .then(response => {
        const {
          workOrderNumber, productName, productDescription, orderQty, priority, owner, remarks
        } = response.data
        setWorkOrderNumber(workOrderNumber)
        setProductName(productName)
        setProductDescription(productDescription)
        setOrderQty(orderQty)
        setPriority(priority)
        setOwner(owner)
        setRemarks(remarks)
        setLoading(false)
      }).catch (error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error:', error)
        }
      })
  }, [orderId])

  const handleSubmit = e => {
    e.preventDefault()
    const editedOrder = {workOrderNumber, productName, productDescription, orderQty, priority, owner, remarks}

    axios.put(`${process.env.REACT_APP_API_URL}/order/edit/${orderId}`, editedOrder)
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
        <h1 className="mb-2 mt-3 text-2xl font-semibold">Edit Order Details</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <div>
                <div className="flex mb-1">
                  <input
                    type="text"
                    className={`border-2 rounded px-1 w-48 h-9 ${loggedInUser.user.level ==="user" && "disabled:opacity-75 text-gray-400"}`}
                    disabled={loggedInUser.user.level === "user"}
                    required
                    value={workOrderNumber}
                    onChange={e => setWorkOrderNumber(e.target.value)}
                    placeholder="Work Order Number"
                  />
                  <input
                    type="text"
                    className={`border-2 rounded px-1 w-48 h-9 ${loggedInUser.user.level ==="user" && "disabled:opacity-75 text-gray-400"}`}
                    disabled={loggedInUser.user.level === "user"}
                    required
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div>
                <div className="flex mb-1">
                  <input
                    type="text"
                    className={`border-2 rounded px-1 w-48 h-9 ${loggedInUser.user.level ==="user" && "disabled:opacity-75 text-gray-400"}`}
                    disabled={loggedInUser.user.level === "user"}
                    required
                    value={productDescription}
                    onChange={e => setProductDescription(e.target.value)}
                    placeholder="Work Order Description"
                  />
                  <input
                    type="number"
                    className={`border-2 rounded px-1 w-48 h-9 ${loggedInUser.user.level ==="user" && "disabled:opacity-75 text-gray-400"}`}
                    disabled={loggedInUser.user.level === "user"}
                    required
                    value={orderQty}
                    onChange={e => setOrderQty(e.target.value)}
                    placeholder="Order Quantity"
                  />
                </div>
              </div>
            <div>
                <div className="flex mb-1">
                  <input
                    type="number"
                    className={`border-2 rounded px-1 w-48 h-9 ${loggedInUser.user.level ==="user" && "disabled:opacity-75 text-gray-400"}`}
                    disabled={loggedInUser.user.level === "user"}
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

export default OrderEditPage
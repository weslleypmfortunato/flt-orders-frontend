import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import warning from '../images/warning.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const WorkOrdersList = () => {
  const [orders, setOrders] = useState([])
  const [shortages, setShortages] = useState([])
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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const deleteOrder = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/order/${id}`, {headers})
      .then(setRefresh(!refresh))
      .catch(error => console.log(error))
  }

  const deleteShortage = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/shortage/${id}`, {headers})
      .then(setRefresh(!refresh))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/orders`, { headers })
      .then(response => {
        setOrders(response.data)
      }).catch (error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error:', error)
        }
      })
  }, [refresh])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/shortages`, { headers })
      .then(response => {
        setShortages(response.data)
      }).catch (error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error:', error)
        }
      })
  }, [refresh])

  return (
    <div className="flex flex-col items-center mt-5 w-full">
      <h1 className="mb-2 text-2xl font-semibold">Work Orders List</h1>
      <div>
        {orders.length > 0 && (
          <div>
            <div className="w-full">
              <table className="mb-0.5">
                <thead>
                  <tr>
                    <th className="border border-gray-900 w-16 px-1 font-semibold">Priority</th>
                    <th className="border border-gray-900 w-24 font-semibold">Work Order</th>
                    <th className="border border-gray-900 px-1 font-semibold">Product</th>
                    <th className="border border-gray-900 w-52 font-semibold">Description</th>
                    <th className="border border-gray-900 px-1 font-semibold">Quantity</th>
                    <th className="border border-gray-900 w-28 font-semibold">Owner</th>
                    <th className="border border-gray-900 w-96 font-semibold">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-blue-100">
                      <td className="text-blue-800 border border-gray-900">{order.priority}</td>
                      <td className="text-blue-800 border border-gray-900"><Link to={`/order/edit/${order._id}`} className="text-blue-800">{order.workOrderNumber}</Link></td>
                      <td className="text-blue-800 border border-gray-900">{order.productName}</td>
                      <td className="text-blue-800 border border-gray-900 w-20">{order.productDescription.toUpperCase()}</td>
                      <td className="text-blue-800 border border-gray-900">{order.orderQty}</td>
                      <td className="text-blue-800 border border-gray-900">{order.owner}</td>
                      <td className="text-blue-800 border border-gray-900 text-left pl-1">{capitalizeFirstLetter(order.remarks)}</td>
                      <td className="boder-0">
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="text-red-400 border-black ml-0.5 transition duration-500 transform hover:scale-125 hover:text-red-600">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div>
        <Link to='/orders/new'>
          <button
            type="button"
            className="border-1 rounded text-lg px-2 bg-blue-500 text-white font-semibold mt-2 w-52 h-9 transition duration-500 transform hover:scale-105 hover:border hover:border-blue-900 shadow-xl shadow-blue-900">
            Add New Order
          </button>
        </Link>
      </div>
      <div>
      </div>

      <div>
        <h1 className="mb-2 mt-5 text-2xl font-semibold">Shortage List</h1>
        <div>
          {shortages.length > 0 && (
            <div>
              <div className="w-full">
                <table className="mb-0.5">
                  <thead>
                    <tr>
                      <th className="border border-gray-900 w-96 font-semibold">Material</th>
                      <th className="border border-gray-900 w-64 font-semibold">Quantity</th>
                      <th className="border border-gray-900 w-96 font-semibold">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shortages.map((shortage) => (
                      <tr className="hover:bg-blue-100">
                        <td className="text-blue-800 border border-gray-900 text-left pl-1"><Link to={`/shortage/edit/${shortage._id}`} className="text-blue-800">{shortage.materialName}</Link></td>
                        <td className="text-blue-800 border border-gray-900">{shortage.materialQty}</td>
                        <td className="text-blue-800 border border-gray-900 text-left pl-1">{shortage.shortageRemark}</td>
                        <td className="boder-0">
                          <button
                            onClick={() => deleteShortage(shortage._id)}
                            className="text-red-400 border-black ml-0.5 transition duration-500 transform hover:scale-125 hover:text-red-600">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <Link to='/shortages/new'>
          <button
            type="button"
            className="border-1 rounded text-lg px-2 bg-blue-500 text-white font-semibold mt-2 w-52 h-9 transition duration-500 transform hover:scale-105 hover:border hover:border-blue-900 shadow-2xl shadow-blue-900">
            Add New Shortage
          </button>
        </Link>
      </div>
    </div>
  )
}

export default WorkOrdersList
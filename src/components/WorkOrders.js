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
      text: "Internal Server Error. Try again",
      imageUrl: warning,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom Image'
    })
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // const deleteOrder = (id) => {
  //   axios.delete(`${process.env.REACT_APP_API_URL}/order/${id}`, {headers})
  //     .then(() => {
  //       setRefresh(prev => !prev)
  //     })
  //     .catch(error => console.log(error))
  // }

  const updateDeleteStatus = (id, deleteStatus) => {
    axios.put(`${process.env.REACT_APP_API_URL}/order/updateDeleteStatus/${id}`, { deleteStatus }, { headers })
      .then(() => {
        setRefresh(prev => !prev)
      })
      .catch(error => console.log(error))
  }

  const handleDeleteOrder = (id) => {
    updateDeleteStatus(id, true)
  }

  const deleteShortage = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/shortage/${id}`, {headers})
      .then(() => {
        setRefresh(prev => !prev)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/orders`, { headers })
      .then(response => {
        const orders = response.data.filter(order => order.deleteStatus === false)
        setOrders(orders)
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
    <div className="flex flex-col items-center mt-2 w-full px-2">
      <h1 className="mb-2 text-2xl font-semibold text-white">Work Orders List</h1>
      <div>
        {orders.length > 0 && orders.filter(order => order.deleteStatus === false).length > 0 ? (
          <div className="w-full bg-white">
            <table className="mb-0.5">
              <thead>
                <tr>
                  <th className="border border-gray-900 w-16 px-1 font-semibold text-sm">Priority</th>
                  <th className="border border-gray-900 w-24 font-semibold text-sm">Work Order</th>
                  <th className="border border-gray-900 px-1 font-semibold text-sm">Product</th>
                  <th className="border border-gray-900 w-64 font-semibold text-sm">Description</th>
                  <th className="border border-gray-900 px-1 font-semibold text-sm">Qty</th>
                  <th className="border border-gray-900 w-28 font-semibold text-sm">Owner</th>
                  <th className="border border-gray-900 w-40 font-semibold text-sm">Status</th>
                  <th className="border border-gray-900 w-96 font-semibold text-sm">Remarks</th>
                  <th className="border border-gray-900 w-28 font-semibold text-sm">Order Details</th>
                  <th className="border border-gray-900 w-28 font-semibold text-sm">Material Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-blue-100">
                    <td className={`border border-gray-900 w-16 px-1 text-sm ${order.priority === 100 ? "text-transparent" : "text-blue-800"}`}>{order.priority}</td>
                    <td className="text-blue-800 border border-gray-900 text-sm"><Link to={`/order/edit/${order._id}`} className="text-blue-800">{order.workOrderNumber}</Link></td>
                    <td className="text-blue-800 border border-gray-900 text-sm">{order.productName.toUpperCase()}</td>
                    <td className="text-blue-800 border border-gray-900 w-20 text-sm">{order.productDescription.toUpperCase()}</td>
                    <td className="text-blue-800 border border-gray-900 text-sm">{order.orderQty}</td>
                    <td className="text-blue-800 border border-gray-900 text-sm">{capitalizeFirstLetter(order.owner)}</td>
                    <td 
                      className={`text-blue-800 border border-gray-900 text-sm ${(order.status ==="In Progress" && "bg-yellow-500 text-white font-semibold px-0.5") || (order.status ==="Partially Completed" && "bg-purple-600 text-white font-semibold px-0.5") || (order.status ==="Completed" && "bg-green-500 text-white font-semibold px-0.5") || (order.status ==="Missing Parts" && "bg-pink-400 text-white font-semibold px-0.5") || (order.status ==="Expedite" && "bg-gradient-to-r from-gray-200 to-red-400 text-white font-bold px-1 text-base")}`}>
                        {order.status ? capitalizeFirstLetter(order.status) : ""}
                    </td>
                    <td className="text-blue-800 border border-gray-900 text-left pl-1 text-sm">{capitalizeFirstLetter(order.remarks)}</td>
                    <td className="text-blue-800 border border-gray-900 pl-1 text-sm text-center">
                      {order.orderLink ? <a href={order.orderLink} target="_blank" rel="noopener noreferrer">WO Details</a> : ""}
                    </td>
                    <td 
                      className={`text-blue-800 border border-gray-900 text-sm ${(order.material ==="Picked" && "text-blue-800 px-0.5") || (order.material ==="Not Picked" && "bg-pink-400 text-white font-semibold px-0.5") || (order.material ==="Partially" && "bg-purple-600 text-white font-semibold px-0.5") || (order.material ==="Shortage" && "bg-red-600 text-white font-semibold px-0.5")}`}>
                        {order.material ? capitalizeFirstLetter(order.material) : ""}
                    </td>
                    <td className="border-0">
                      {/* <button
                        onClick={() => deleteOrder(order._id)}
                        className={`text-red-400 border-black ml-0.5 transition duration-500 transform hover:scale-125 hover:text-red-600 ${
                          loggedInUser.user.level ==="user" && "hidden"}`}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button> */}

                      <button
                        onClick={() => handleDeleteOrder(order._id)} // Chama a nova função handleDeleteOrder
                        className={`text-red-400 border-black ml-0.5 transition duration-500 transform hover:scale-125 hover:text-red-600 ${
                          loggedInUser.user.level === "user" && "hidden"}`}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-3 text-base border rounded px-5 mx-5 w-96 py-4">Loading...</p>
        )}
      </div>
      <div>
        <Link to='/orders/new'>
          <button
            type="button"
            className={`border-1 border-blue-500 rounded text-lg px-2 bg-gray-100 hover:bg-blue-500 hover:text-white font-semibold mt-2 w-52 h-9 transition duration-500 transform hover:scale-105 hover:border hover:border-blue-900 shadow-xl shadow-blue-900 ${loggedInUser.user.level ==="user" && "hidden"}`}>
            Add New Order
          </button>
        </Link>
      </div>
      <div>
      </div>

      <div>
        <h1 className="mb-2 mt-5 text-2xl font-semibold">Shortage List</h1>
        <div>
          {shortages.length > 0 ? (
            <div>
              <div className="w-full">
                <table className="mb-0.5 bg-white">
                  <thead>
                    <tr>
                      <th className="border border-gray-900 w-96 font-semibold text-sm">Material</th>
                      <th className="border border-gray-900 w-32 font-semibold text-sm">Quantity</th>
                      <th className="border border-gray-900 w-36 font-semibold text-sm">Due Date</th>
                      <th className="border border-gray-900 w-96 font-semibold text-sm">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shortages.map((shortage) => (
                      <tr key={shortage._id} className="hover:bg-blue-100">
                        <td className="text-blue-800 border border-gray-900 text-left pl-1 text-sm"><Link to={`/shortage/edit/${shortage._id}`} className="text-blue-800">{shortage.materialName}</Link></td>
                        <td className="text-blue-800 border border-gray-900 text-sm">{shortage.materialQty}</td>
                        <td className="text-blue-800 border border-gray-900 text-sm">{shortage.dueDate ? shortage.dueDate.substring(0, 10) : ''}</td>
                        <td className="text-blue-800 border border-gray-900 text-left pl-1 text-sm">{shortage.shortageRemark}</td>
                        <td className="boder-0">
                          <button
                            onClick={() => deleteShortage(shortage._id)}
                            className={`text-red-400 border-black ml-0.5 transition duration-500 transform hover:scale-125 hover:text-red-600 ${
                            loggedInUser.user.level ==="user" && "hidden"}`}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-base border rounded px-5 mx-5 w-96 py-4">No shortages... 👍🏼</p>
          )}
        </div>
        <Link to='/shortages/new'>
          <button
            type="button"
            className={`border-1 mb-4 border-blue-500 rounded text-lg px-2 hover:bg-blue-500 hover:text-white font-semibold mt-2 w-52 h-9 transition duration-500 transform hover:scale-105 hover:border hover:border-blue-900 shadow-xl shadow-blue-900 bg-gray-100 ${loggedInUser.user.level ==="user" && "hidden"}`}>
            Add New Shortage
          </button>
        </Link>
      </div>
    </div>
  )
}

export default WorkOrdersList
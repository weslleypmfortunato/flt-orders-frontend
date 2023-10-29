import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import warning from '../images/warning.png'

const CompletedWorkOrdersPage = () => {
  const [completedOrders, setCompletedOrders] = useState([])
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

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/completed/orders`, { headers })
      .then(response => {
        const completedOrders = response.data.filter(order => order.deleteStatus === true)
        setCompletedOrders(completedOrders)
      }).catch (error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error:', error)
        }
      })
  }, [refresh])

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-2 w-full px-2">
        <h1 className="mb-2 mt-3 text-2xl font-semibold">Completed Work Orders List</h1>
        <div>
          <h4 className="text-left text-xs text-red-600 mt-3 font-semibold">Cut-off 2023/October/30</h4>
          {completedOrders.length > 0 && completedOrders.filter(completedOrders => completedOrders.deleteStatus === true).length > 0 ? (
            <div className="w-full">
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
                  </tr>
                </thead>
                <tbody>
                  {completedOrders.map((completedOrder) => (
                    <tr>
                    <td className={`border border-gray-900 w-16 px-1 text-sm ${completedOrder.priority === 100 ? "text-transparent" : "text-blue-800"}`}>{completedOrder.priority}</td>
                      <td className="text-blue-800 border border-gray-900 text-sm"><Link to={`/order/edit/${completedOrder._id}`} className="text-blue-800">{completedOrder.workOrderNumber}</Link></td>
                      <td className="text-blue-800 border border-gray-900 text-sm">{completedOrder.productName.toUpperCase()}</td>
                      <td className="text-blue-800 border border-gray-900 w-20 text-sm">{completedOrder.productDescription.toUpperCase()}</td>
                      <td className="text-blue-800 border border-gray-900 text-sm">{completedOrder.orderQty}</td>
                      <td className="text-blue-800 border border-gray-900 text-sm">{capitalizeFirstLetter(completedOrder.owner)}</td>
                      <td
                        className={`text-blue-800 border border-gray-900 text-sm ${(completedOrder.status ==="In Progress" && "bg-yellow-500 text-white font-semibold px-0.5") || (completedOrder.status ==="Partially Completed" && "bg-purple-600 text-white font-semibold px-0.5") || (completedOrder.status ==="Completed" && "bg-green-500 text-white font-semibold px-0.5") || (completedOrder.status ==="Missing Parts" && "bg-pink-400 text-white font-semibold px-0.5") || (completedOrder.status ==="Expedite" && "bg-gradient-to-r from-gray-200 to-red-400 text-white font-bold px-1 text-base")}`}>
                          {completedOrder.status ? capitalizeFirstLetter(completedOrder.status) : ""}
                      </td>
                      <td className="text-blue-800 border border-gray-900 text-left pl-1 text-sm">{capitalizeFirstLetter(completedOrder.remarks)}</td>
                      <td className="text-blue-800 border border-gray-900 pl-1 text-sm text-center">
                        {completedOrder.orderLink ? <a href={completedOrder.orderLink} target="_blank" rel="noopener noreferrer">WO Details</a> : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-3 text-base border rounded px-5 mx-5 w-96 py-4">Waiting for orders...</p>
          )}
        </div>
      </div>
    </div>




  )
}

export default CompletedWorkOrdersPage
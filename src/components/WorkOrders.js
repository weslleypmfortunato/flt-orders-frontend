import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import warning from '../images/warning.png'

const WorkOrdersList = () => {
  const [orders, setOrders] = useState([])
  const [shortages, setShortages] = useState([])
  const [refresh] = useState(true)

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
        {orders.length > 0 && orders.map(order => {
          return (
            <div key={order._id}>
              <div className="w-full">
                <table className="border-2 border-gray-400 mb-0.5">
                  <thead>
                    <tr>
                      <th className="border-2 border-gray-400 w-16 px-1">Priority</th>
                      <th className="border-2 border-gray-400 w-24">Work Order</th>
                      <th className="border-2 border-gray-400 px-1">Product</th>
                      <th className="border-2 border-gray-400 w-52">Description</th>
                      <th className="border-2 border-gray-400 px-1">Quantity</th>
                      <th className="border-2 border-gray-400 w-28">Owner</th>
                      <th className="border-2 border-gray-400 w-96">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-blue-500 border-l-2 border-t-2 border-gray-400">{order.priority}</td>
                      <td className="text-blue-500 border-l-2 border-t-2 border-gray-400"><Link to={`/order/edit/${order._id}`}>{order.workOrderNumber}</Link></td>
                      <td className="text-blue-500 border-l-2 border-t-2 border-gray-400">{order.productName}</td>
                      <td className="text-blue-500 border-l-2 border-t-2 border-gray-400 w-20">{order.productDescription.toUpperCase()}</td>
                      <td className="text-blue-500 border-l-2 border-t-2 border-gray-400">{order.orderQty}</td>
                      <td className="text-blue-500 border-l-2 border-t-2 border-gray-400">{order.owner}</td>
                      <td className="text-blue-500 border-l-2 border-r-2 border-t-2 border-gray-400 text-left pl-2">{capitalizeFirstLetter(order.remarks)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
      <div>
        <Link to='/orders/new'>
          <button
            type="button"
            className="border-1 rounded text-lg px-2 bg-blue-500 text-white font-semibold mt-2 w-52 h-9">
            Add New Order
          </button>
        </Link>
      </div>
      <div>
      </div>

      <div>
        <h1 className="mb-2 mt-5 text-2xl font-semibold">Shortage List</h1>
        <div>
          {shortages.length > 0 && shortages.map(shortage => {
            return (
              <div key={shortage._id}>
                <div className="w-full">
                  <table className="border-2 border-gray-400 mb-0.5">
                    <thead>
                      <tr>
                        <th className="border-2 border-gray-400 w-96">Material</th>
                        <th className="border-2 border-gray-400 w-64">Quantity</th>
                        <th className="border-2 border-gray-400 w-96">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-blue-500 border-l-2 border-t-2 border-gray-400"><Link to={`/shortage/edit/${shortage._id}`}>{shortage.materialName}</Link></td>
                        <td className="text-blue-500 border-l-2 border-t-2 border-gray-400">{shortage.materialQty}</td>
                        <td className="text-blue-500 border-l-2 border-t-2 border-gray-400">{shortage.shortageRemark}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })}
        </div>
        <Link to='/shortages/new'>
          <button
            type="button"
            className="border-1 rounded text-lg px-2 bg-blue-500 text-white font-semibold mt-2 w-52 h-9">
            Add New Shortage
          </button>
        </Link>
      </div>
    </div>
  )
}

export default WorkOrdersList
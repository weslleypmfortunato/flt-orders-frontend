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
    <div>
      <h1>Work Orders List</h1>
      <div>
        {orders.length > 0 && orders.map(order => {
          return (
            <div key={order._id}>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Priority</th>
                      <th>Work Order</th>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Owner</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{order.priority}</td>
                      <td>{order.workOrderNumber}</td>
                      <td>{order.productName}</td>
                      <td>{order.productDescription.toUpperCase()}</td>
                      <td>{order.orderQty}</td>
                      <td>{order.owner}</td>
                      <td>{capitalizeFirstLetter(order.remarks)}</td>
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
            type="button">
            Add New Order
          </button>
        </Link>
      </div>
      <div>
      </div>

      <div>
        <h1>Shortage List</h1>
        <div>
          {shortages.length > 0 && shortages.map(shortage => {
            return (
              <div key={shortage._id}>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Material</th>
                        <th>Quantity</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{shortage.materialName}</td>
                        <td>{shortage.materialQty}</td>
                        <td>{shortage.shortageRemark}</td>
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
            type="button">
            Add New Shortage
          </button>
        </Link>
      </div>
    </div>
  )
}

export default WorkOrdersList
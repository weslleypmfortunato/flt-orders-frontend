import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import warning from '../images/warning.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";

const UserListPage = () => {
  const [users, setUsers] = useState([])
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

  const deleteUser = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/user/${id}`, {headers})
      .then(setRefresh(!refresh))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`, {headers})
      .then(response => {
        setUsers(response.data)
      }).catch (error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error', error)
        }
      })
  }, [refresh])

  return (
    <div >
      <Navbar />
      <Link to='/auth/sign-up/user'>
          <button
            type="button"
            className="border-1 rounded text-lg px-2 bg-blue-500 text-white font-semibold mt-4 w-52 h-9 transition duration-500 transform hover:scale-105 hover:border hover:border-blue-900 shadow-2xl shadow-blue-900">
            Add New User
          </button>
        </Link>
      <div className="flex flex-col items-center mt-1 w-full">
        <h1 className="mb-2 mt-4 text-2xl font-semibold">Collaborators List</h1>
        <div>
          {users.length > 0 && (
            <div className="w-full">
              <table className="mb-0 5">
                <thead>
                  <tr>
                    <th className="border border-gray-900 w-96 px-1 font-semibold">Name</th>
                    <th className="border border-gray-900 w-32 w px-1 font-semibold">Department</th>
                    <th className="border border-gray-900 w-32 px-1 font-semibold">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-blue-100">
                      <td className="text-blue-800 border border-gray-900 mb-1 text-left pl-1"><Link to={`/user/edit/${user._id}`} className="text-blue-800">{capitalizeFirstLetter(user.name)}</Link></td>
                      <td className="text-blue-800 border border-gray-900">{capitalizeFirstLetter(user.department)}</td>
                      <td className="text-blue-800 border border-gray-900">{capitalizeFirstLetter(user.position)}</td>
                      <td className="boder-0">
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="text-red-400 border-black ml-0.5 transition duration-500 transform hover:scale-125 hover:text-red-600">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <Link to={'/home'}>
          <p className="text-blue-500 underline mt-3">Back</p>
        </Link>
      </div>
    </div>
  )



}

export default UserListPage
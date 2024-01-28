import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import warning from '../images/warning.png'
import Navbar from "../components/Navbar";

const NcrListPage = () => {
  const [ncrs, setNcrs] = useState([])
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

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/ncr`, {headers})
      .then(response => {
        setNcrs(response.data.reverse())
      }).catch (error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error', error)
        }
      })
  }, [refresh])

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="px-5 mx-5">
    <Navbar />
      <h1 className="mb-4 mt-4 text-2xl font-semibold">NCR List</h1>
      <Link to='/ncr/new'>
          <button
            type="button"
            className={`border-1 rounded text-lg px-2 bg-blue-500 text-white font-semibold my-4 w-52 h-9 transition duration-500 transform hover:scale-105 hover:border hover:border-blue-900 shadow-2xl shadow-blue-900 ${loggedInUser.user.level !=="admin" && "hidden"}`}>
            Add New NCR
          </button>
      </Link>
      <div className="flex flex-col items-start ml-96">
      {ncrs.length > 0 && ncrs.map(ncr => {
        return (
          <div key={ncr._id}>
            <div>
              <Link to={`/ncr/${ncr._id}`}>
                <p className="m-0.5">{capitalizeFirstLetter(ncr.title)}</p>
              </Link>
            </div>
          </div>
        )
      })}
      </div>
      <div>
      </div>
      <div>
        <Link to={`/home`}>
          <p className="m-0.5 mt-5">Home</p>
        </Link>
      </div>
    </div>
  )
}

export default NcrListPage
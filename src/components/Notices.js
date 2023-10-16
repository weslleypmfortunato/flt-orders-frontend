import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import warning from '../images/warning.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const NoticesList = () => {
  const [notices, setNotices] = useState([])
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

  const deleteNote = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/notice/${id}`, {headers})
      .then(() => {
        setRefresh(prev => !prev)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/notices`, { headers })
      .then(response => {
        setNotices(response.data)
      }).catch (error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error:', error)
        }
      })
  }, [refresh])

  return (
    <div className="px-5 w-2/3 mx-5">
      <h1 className="text-2xl font-semibold mb-0.5">Notes</h1>
      <div className="border rounded px-5 mx-5 py-2">
        {notices.length > 0 ? (notices.map((notice, index) => (
          <div key={index} className="border-b rounded-b-xl flex items-center px-3 mb-3 pb-1">
            <div className="flex-grow">
              {notice.information.split('\n').map((line, lineIndex) => (
              <Link to={`/notice/edit/${notice._id}`} key={lineIndex} className="no-underline text-black">
                <div className="flex text-sm">
                  {capitalizeFirstLetter(line)}
                </div>
              </Link>
              ))}
            </div>
          <button
            onClick={() => deleteNote(notice._id)}
            className={`text-red-400 border-black ml-0.5 transition duration-500 transform hover:scale-125 hover:text-red-600 ${loggedInUser.user.level !== "admin" && "hidden"}`}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        ))) : (
          <p className="mt-3 text-lg">No important notes so far...</p>
        )}
      </div>
      <Link to='/notice/new'>
        <button
          type="button"
          className={`border-1 rounded text-lg px-2 bg-blue-500 text-white font-semibold mt-2 w-52 h-9 transition duration-500 transform hover:scale-105 hover:border hover:border-blue-900 shadow-2xl shadow-blue-900 ${loggedInUser.user.level !=="admin" && "hidden"}`}>
          Add New Note
        </button>
      </Link>
    </div>
  )
}

export default NoticesList


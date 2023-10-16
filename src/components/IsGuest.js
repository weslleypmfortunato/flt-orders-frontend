import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../../contexts/auth.context"
import Swal from 'sweetalert2'
import warning from "../images/warning.png"

const IsGuest = ({roles, children}) => {
  const { isLoading, loggedInUser } = useContext(AuthContext)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (loggedInUser.user.id) {
    Swal.fire({
      text: 'Sorry! You are still logged in.',
      imageUrl: warning,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
    return <Navigate to='/home' />
  }
  return children
}

export default IsGuest
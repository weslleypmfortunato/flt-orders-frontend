import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { useContext, useState } from "react";

const Navbar = props => {
  const [employee] = useState('')

  const {logout} = useContext(AuthContext)

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link 
              to={'/'}
              onClick={() => logout(employee.jwt)}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
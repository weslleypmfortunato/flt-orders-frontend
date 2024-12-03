import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import { useContext, useState } from "react";
import flt from '../images/flt.png'

const Navbar = props => {
  const [employee] = useState('')

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const {logout} = useContext(AuthContext)

  return (
    <nav className="max-w-full border-b-2 border-blue-100">
      <div>
        <ul className="flex flex-row justify-between items-center px-2">
          <li>
            <Link to={'/home'}>
              <img src={flt} alt="FLT Logo" className="w-24 mt-2"/>
            </Link>
          </li>
          <div className="flex font-semibold mt-3 mr-2">
            <li className="mr-10">
              <Link to='/home' className="no-underline hover:underline bg-white px-1 rounded py-0.5">Home</Link>
            </li>
            <li className="mr-10">
              <Link to='/completed-orders' className="no-underline hover:underline bg-white px-1 rounded py-0.5">Order History</Link>
            </li>
            <li className="mr-10">
              <Link to='/users' className="no-underline hover:underline bg-white px-1 rounded py-0.5">Users</Link>
            </li>
            <li className="mr-10">
              <Link to='/ncr' className="no-underline hover:underline bg-white px-1 rounded py-0.5">NCR</Link>
            </li>
            <li>
              <Link
                to={'/'}
                className="no-underline hover:underline bg-white px-1 rounded py-0.5"
                onClick={() => logout(employee.jwt)}>
                Logout
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
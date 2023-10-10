import Navbar from "../components/Navbar"
import WorkOrdersList from "../components/WorkOrders"


const HomePage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  return (
    <div>
      <Navbar />
      <h1 className="mt-3 font-medium">
        Welcome <span>{ loggedInUser.user.name.split(' ')[0] }</span>!
      </h1>
      <WorkOrdersList />
    </div>
  )
}

export default HomePage
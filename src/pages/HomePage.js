import Navbar from "../components/Navbar"
import NoticesList from "../components/Notices"
import WorkOrdersList from "../components/WorkOrders"


const HomePage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="mt-3 font-medium text-4xl mb-3 text-blue-600">
          Welcome <span>{ loggedInUser.user.name ==="Administrator" ? "Team" : loggedInUser.user.name.split(' ')[0] }</span>!
        </h1>
        <NoticesList />
        <WorkOrdersList />
      </div>
    </div>
  )
}

export default HomePage
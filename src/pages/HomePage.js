import Navbar from "../components/Navbar"
import WorkOrdersList from "../components/WorkOrders"
// import halloween4 from '../images/halloween4.jpg'


const HomePage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  return (
    <div 
      //style={{
        //backgroundImage: `url(${halloween4})`,
        //backgroundSize: '100% 100%', 
        //backgroundPosition: 'top center', 
        //backgroundRepeat: 'no-repeat', 
        //minHeight: '100vh', 
        //width: '100vw'
      //}}
    >
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="mt-3 font-medium text-4xl mb-3 text-blue-600 bg-white rounded px-1 py-1">
          Welcome <span>{ loggedInUser.user.name ==="Administrator" ? "Team" : loggedInUser.user.name.split(' ')[0] }</span>!
        </h1>
        <WorkOrdersList />
      </div>
    </div>
  )
}

export default HomePage
import '../styles/build.css'
import Login from "../components/Login"
import flt from '../images/flt.png'
import banner from '../images/banner.jpeg'

const LoginPage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${banner})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh'
  }

  return (
    <div className='flex flex-col items-center' style={backgroundStyle}>
      <img src={flt} alt="FLT logo" className='mt-44 w-48 rounded mb-8'/>
      <h1 className="text-5xl text-white font-semibold mt-5">Welcome to FLT Orders & Shortages Dashboard</h1>
      <Login />
    </div>
  )
}

export default LoginPage
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import warning from '../images/warning.png';
import { QRCode } from "react-qrcode";

const PrintNcrPage = () => {
  const [ncr, setNcr] = useState(null)
  const [refresh, setRefresh] = useState(true)

  const { ncrId } = useParams()

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
    axios.get(`${process.env.REACT_APP_API_URL}/ncr/${ncrId}`, { headers })
      .then(response => {
        setNcr(response.data)
      })
      .catch(error => {
        if (error.response) {
          messageError(error.response.data.message)
        } else {
          console.error('Request Error', error)
        }
      });
  }, [refresh])

  if (!ncr) {
    return <h3>Loading...</h3>
  }

  const qrCodeData = {
    title: ncr.title,
    reference: ncr.reference,
    creator: ncr.creator,
    location: ncr.location,
    description: ncr.description,
  }

  return (
    <div>
      <Link to={'/ncr'}>
        <p className="text-blue-500 underline mt-1 mb-0">Back</p>
      </Link>
      <h1 className="mb-0 mt-0 text-2xl font-semibold">Non-Conformance Report</h1>
      <div className="flex flex-col items-center">
        <div className="flex flex-col mb-1 w-11/12 border rounded mt-3">
          <h2 className="mb-1 mt-1 text-xl font-semibold border-b h-9">NCR Identification</h2>
          <div className="flex flex-row items-baseline border-b gap-2 mb-1 h-8">
            <h4 className="text-lg font-semibold pl-2 mr-12">Title:</h4>
            <p>{ncr.title}</p>
          </div>
          <div className="flex flex-row items-baseline border-b gap-2 mb-1 h-8">
            <h4 className="text-lg font-semibold pl-2">Reference:</h4>
            <p>{ncr.reference}</p>
          </div>
          <div className="flex flex-row items-baseline border-b gap-2 h-8">
            <h4 className="text-lg font-semibold pl-2 mr-5">Creator:</h4>
            <p>{ncr.creator}</p>
          </div>
        </div>
        <div className="flex flex-col mb-1 w-11/12 border rounded mt-4">
          <h2 className="mb-1 mt-1 text-xl font-semibold border-b h-9">Non-Conformance Details</h2>
          <div className="flex flex-row items-baseline border-b gap-2 mb-1 h-8">
            <h4 className="text-lg font-semibold pl-2 mr-7">Location:</h4>
            <p>{ncr.location}</p>
          </div>
          <div className="flex flex-row items-baseline gap-2 mb-1">
            <h4 className="text-lg font-semibold pl-2">Description:</h4>
            <p className="text-left whitespace-pre-line">{ncr.description}</p>
          </div>
        </div>
        <div className="flex flex-col mb-1 w-11/12 border rounded mt-4">
          <h2 className="mb-1 mt-1 text-xl font-semibold border-b h-9">Non-Conformance Close-out</h2>
          <div className="flex flex-col mb-1 text-left">
            <h4 className="text-lg font-semibold pl-2 border-b h-36">Cause of NCR:</h4>
            <h4 className="text-lg font-semibold pl-2 border-b h-8">Close-out Date:</h4>
            <h4 className="text-lg font-semibold pl-2 border-b h-36">Reason for Closure:</h4>
            <h4 className="text-lg font-semibold pl-2 border-b h-8">Latest Disposition</h4>
            <h4 className="text-lg font-semibold pl-2 h-4">Closer:</h4>
          </div>
        </div>
        <div className="mt-4 w-24">
          <QRCode value={JSON.stringify(qrCodeData)} />
        </div>
      </div>
    </div>
  )
}

export default PrintNcrPage;
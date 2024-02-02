import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import warning from '../images/warning.png';
import { QRCode } from "react-qrcode";
import { useReactToPrint } from "react-to-print";

const PrintNcrPage = () => {
  const [ncr, setNcr] = useState(null);
  const { ncrId } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  };

  const messageError = () => {
    Swal.fire({
      text: "Definir mensagem!",
      imageUrl: warning,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom Image'
    });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/ncr/${ncrId}`, { headers })
      .then(response => {
        setNcr(response.data);
      })
      .catch(error => {
        if (error.response) {
          messageError(error.response.data.message);
        } else {
          console.error('Request Error', error);
        }
      });
  }, [ncrId]);

  if (!ncr) {
    return <h3>Loading...</h3>;
  }

  const shortenedNcrDate = ncr.ncrDate?.substring(0, 10) || "No Date Provided";

  const qrCodeData = {
    title: ncr.title,
    reference: ncr.reference,
    creator: ncr.creator,
    location: ncr.location,
    description: ncr.description,
    ncrDate: shortenedNcrDate
  };

  return (
    <div className="flex flex-col items-center mt-6" id="printContent">
      <div className="flex gap-24 no-print">
        <Link to={'/ncr'}>
          <p className="text-blue-500 underline mt-1 mb-0">Back</p>
        </Link>
        <Link to={`/ncr/edit/${ncr._id}`}>
          <p className="text-red-500 underline mt-1 mb-0">Edit</p>
        </Link>
      </div>
      <h1 className="mb-0 mt-2 text-xl font-semibold text-center">Non-Conformance Report</h1>
      <div className="flex flex-col items-center w-11/12 print-container">
        <div className="flex flex-col mb-1 w-11/12 border border-black rounded mt-3">
          <div className="flex items-center border-b border-black h-9">
            <h2 className="mt-1.5 text-xl font-semibold flex-grow ml-40">NCR Identification</h2>
            <div className="flex items-center mr-5">
              <h4 className="text-lg mt-1.5 font-semibold pr-2">Date:</h4>
              <div>{shortenedNcrDate}</div>
            </div>
          </div>
          <div className="flex flex-row items-baseline border-b border-black gap-2 mb-1 h-7">
            <h4 className="font-semibold text-base pl-2 mr-11">Title:</h4>
            <p className="text-base">{ncr.title}</p>
          </div>
          <div className="flex flex-row items-baseline border-b border-black gap-2 mb-1 h-7">
            <h4 className="text-base font-semibold pl-2">Reference:</h4>
            <p>{ncr.reference}</p>
          </div>
          <div className="flex flex-row items-baseline border-b gap-2 h-7">
            <h4 className="text-base font-semibold pl-2 mr-5">Creator:</h4>
            <p>{ncr.creator}</p>
          </div>
        </div>
        <div className="flex flex-col mb-1 w-11/12 border border-black rounded mt-4">
          <h2 className="mb-1 mt-1 text-lg font-semibold border-b border-black h-7 text-center">Non-Conformance Details</h2>
          <div className="flex flex-row items-baseline border-b border-black gap-2 mb-1 h-7">
            <h4 className="text-base font-semibold pl-2 mr-6">Location:</h4>
            <p>{ncr.location}</p>
          </div>
          <div className="flex flex-row items-baseline gap-2 mb-1">
            <h4 className="text-base font-semibold pl-2">Description:</h4>
            <p className="text-left whitespace-pre-line text-sm ml-1">{ncr.description}</p>
          </div>
        </div>
        <div className="flex flex-col mb-0 w-11/12 border border-black rounded mt-4">
          <h2 className="mb-1 mt-1 text-lg font-semibold border-b border-black h-7 text-center">Non-Conformance Close-out</h2>
          <div className="flex flex-col mb-1 text-left">
            <h4 className="text-base font-semibold pl-2 border-b border-black h-48">Cause of NCR:</h4>
            <h4 className="text-base font-semibold pl-2 border-b border-black h-7">Close-out Date:</h4>
            <h4 className="text-base font-semibold pl-2 border-b border-black h-48">Reason for Closure:</h4>
            <h4 className="text-base font-semibold pl-2 border-b border-black h-7">Latest Disposition:</h4>
            <h4 className="text-base font-semibold pl-2 h-4">Closer:</h4>
          </div>
        </div>
        <div className="mt-2 w-24">
          <QRCode value={JSON.stringify(qrCodeData)} />
        </div>
      </div>
      <PrintButton content={() => document.getElementById("printContent")} />
    </div>
  );
};

const PrintButton = ({ content }) => {
  const handlePrint = useReactToPrint({
    content: () => content()
  });

  return (
    <button
      onClick={handlePrint}
      className="border-1 rounded text-lg px-2 bg-green-500 text-white font-semibold mt-2 w-52 h-9 transition duration-500 transform hover:scale-105 hover:border hover:border-green-900 no-print"
    >
      Print
    </button>
  );
};

export default PrintNcrPage;

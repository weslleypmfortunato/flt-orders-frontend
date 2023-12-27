import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import warning from '../images/warning.png';

function SearchBarOldOrders() {
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  const messageError = (message) => {
    Swal.fire({
      text: "Definir mensagem!",
      imageUrl: warning,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom Image'
    })
  }

  useEffect(() => {
    if (search.trim() !== '') {
      axios.get(`${process.env.REACT_APP_API_URL}/completed/orders`, { headers })
        .then(response => {
          setResults(response.data)
        })
        .catch(error => {
          if (error.response) {
            messageError(error.response.data.message)
          } else {
            console.error('Request Error:', error)
          }
        })
    }
  }, [search]);

  const filterResults = (searchTerm) => {
    return results.filter(result => {
      const searchableFields = [
        result.workOrderNumber,
        result.productName,
        result.productDescription,
        result.owner,
        result.remarks
      ]

      return (
        result.deleteStatus &&
        searchableFields.some(field =>
          field && field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    })
  }

  const filteredResults = filterResults(search)

  return (
    <div className='flex flex-col'>
      <input 
        type="text"
        className="border-2 rounded px-1 w-96 h-9 my-2 ml-3"
        placeholder="Search for a WO by typing the product name"
        aria-label='work order'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />            
      <div className='flex flex-col mx-2 text-sm'>
        {search.trim() !== '' && filteredResults.map((post, index) => (
          <div className='flex border-1 border-black m-1 rounded px-1 h-6' key={index}>
            <p className='mr-1 flex'><p className='mr-1 font-semibold text-blue-800'>WO:</p> {post.workOrderNumber} -</p>
            <p className='mr-1 flex'> <p className='mr-1 font-semibold text-blue-800'>Product:</p> {post.productName.toUpperCase()} -</p>
            <p className='mr-1 flex'><p className='mr-1 font-semibold text-blue-800'>Description:</p> {post.productDescription} -</p>
            <p className='mr-1 flex'><p className='mr-1 font-semibold text-blue-800'>Qty:</p> {post.orderQty} -</p>
            <p className='mr-1'>{post.status ? <p className='flex'><p className='mr-1 font-semibold text-blue-800'>Status:</p> {post.status} -</p> : "Status: Order not started -"}</p>
            <p className='mr-1'>{post.owner ? <p className='flex'><p className='mr-1 font-semibold text-blue-800'>Owner:</p> {post.owner} - </p> : ""}</p>
            <p>{post.remarks ? <p className='flex'><p className='mr-1 font-semibold text-blue-800'>Remarks:</p> {post.remarks} -</p> : ""}</p>
            <p>{post.orderLink ? <a href={post.orderLink} target="_blank" rel="noopener noreferrer">WO Details</a> : ""}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchBarOldOrders


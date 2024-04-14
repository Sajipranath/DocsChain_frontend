import React from 'react'


import { useChatState } from './saji'
const Sajidetalies = () => {

    // const {user}=useChatState()
     
     const userde = JSON.parse(localStorage.getItem('userDetalies'));
     console.log("user :",userde);
     console.log("user email :",userde.email);

     



  return (
    <div>
      <h2>Welcome {userde.email} </h2>
      <h2>Id is  {userde._id} </h2>
      
    </div>
  )
}

export default Sajidetalies

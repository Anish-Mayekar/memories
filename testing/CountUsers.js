import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CountUsersStyles.css'


function CountUsers (){
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUsers")
      .then((response) => {
        const users = response.data;
        setUserCount(users.length); // assuming response data is an array of users
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []); // empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className='count-box'>
      <p>Number of Users: {userCount}</p>
      <br></br>     
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
        
  );
};

export default CountUsers;

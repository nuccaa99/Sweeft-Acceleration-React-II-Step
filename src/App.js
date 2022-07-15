import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FriendsList from "./components/FriendsList";
import UserInfo from "./components/UserInfo"
import "./Style.css";



const App = () => {
  let page = 1;
  let usersArr = [];

  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

  const fetchData = (page, size) => {
    setError("")
    fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${size}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Sorry smth went wrong")
        }
      })
      .then(data => {

        usersArr = [...usersArr, ...data.list];
  console.log(data.list)
        setUsers(usersArr)


      })
      .catch(error => {
        setError(error.message)
      })
  }


  useEffect(() => {
    if (page === 1) {
      fetchData(page, 20);
      page++;
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
        fetchData(page, 20);
        page++;
      }
    })
  }, []);

  const handleClick = (e, id) => {
    window.location.href = `/user/${id}`;

  }




  return (
    <div class='full-page'>
      <Router>
        <Routes>
          

            <Route path="/" element={
              <div className="main-div">
                {users.map(user => (
                  <div key={user.id} className="container" onClick = {e => handleClick(e, user.id)}>
                    <img className="img" alt={user.lastName} src={user.imageUrl + "/" + user.id} />
                    <div className="text">
                      <p><b>{user.prefix} {user.name} {user.lastName}</b></p>
                      <p>{user.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            } />

            <Route path = {window.location.pathname} element = {
              <div>
                <UserInfo />
                <FriendsList />
              </div>
            }/>

          

        </Routes>
      </Router>
    </div>
  )
}

export default App

import React, { useEffect, useState } from "react";

import "../Style.css";



const FriendsList = () => {
    let page = 1;
    let usersArr = [];

    const [users, setUsers] = useState([])
    const [error, setError] = useState("")

    const fetchData = (userId, page, size) => {
        setError("")
        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com${userId}/friends/${page}/${size}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Sorry smth went wrong")
                }
            })
            .then(data => {

                usersArr = [...usersArr, ...data.list];
                setUsers(usersArr)


            })
            .catch(error => {
                setError(error.message)
            })
    }


    useEffect(() => {
        if (page === 1) {
            fetchData(window.location.pathname, page, 20);
            page++;
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
                fetchData(window.location.pathname, page, 20);
                page++;
            }
        })
    }, []);


    const handleClick = (e, id) => {
        window.location.href = `/user/${id}`;

    }



    return (
        <div>
            {error && <p>{error}</p>}
            {users.length > 0 && (
                <div>
                    <h3 className="title-fr"> Friends:</h3>
                    <div className="main-div">

                        {users.map(user => (
                            <div key={user.id} className="container" onClick={e => handleClick(e, user.id)}>
                                <img className="img" alt={user.lastName} src={user.imageUrl + "/" + user.id} />
                                <div className="text">
                                    <p><b>{user.prefix} {user.name} {user.lastName}</b></p>
                                    <p>{user.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FriendsList;



import React, { useEffect, useState } from "react";



import "../Style.css";



const UserInfo = () => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState("")

    const fetchData = (path) => {
        setError("")
        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com${path}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Sorry smth went wrong")
                }
            })
            .then(data => {
                console.log(data)
                setUser(data)


            })
            .catch(error => {
                setError(error.message)
            })
    }


    useEffect(() => {
        fetchData(window.location.pathname);
    }, []);

    if (user) {
        return (
            <div>
                <div className="user-info">
                    <img className="img" alt={user.lastName} src={user.imageUrl + "/" + user.id} />

                    <div className="info">
                        <fieldset>
                            <legend>Info</legend>
                            <p><b>{user.prefix} {user.name} {user.lastName}</b></p>
                            <p><i>{user.title}</i></p>
                            <p><span className="line">Email:</span> {user.email}</p>
                            <p><span className="line">Ip Address:</span> {user.ip}</p>
                            <p><span className="line">Job Description:</span> {user.jobDescriptor}</p>
                            <p><span className="line">Job Area:</span> {user.jobArea}</p>
                            <p><span className="line">Job Type:</span> {user.jobType}</p>
                        </fieldset>



                    </div>
                    <div className="addressInfo">
                        <fieldset>
                            <legend>Address</legend>

                            <p><b> {user.company.name} </b></p>
                            <p><span className="line">City:</span> {user.address.city}</p>
                            <p><span className="line">Country:</span> {user.address.country}</p>
                            <p><span className="line">State:</span> {user.address.state}</p>
                            <p><span className="line">Street Address:</span> {user.address.streetAddress}</p>
                            <p><span className="line">ZIP:</span> {user.address.zipCode}</p>
                        </fieldset>
                    </div>
                    


                </div>

            </div>
        )
    }
};

export default UserInfo;

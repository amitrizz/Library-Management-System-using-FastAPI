import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

function AddUser() {
    const navigate = useNavigate();
    const [fullname, setfullName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");

    const HandleSubmit = async () => {
        // console.log("working");
        try {
            // Send the request with the configured headers
            if (!fullname || !username || !email ) {
                alert("Enter All Fields");
            } else {
                console.log(username,fullname,email);
                // console.log();
                const response = await axios.post(`${process.env.REACT_APP_URI}/add_user`, { full_name: fullname, user_id: username, email });
                console.log(response);
                if (response.status == 200) {
                    alert(`Submit Successfully`)
                    navigate("/")
                } else {
                    console.log(response.status);
                }
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className='DashBoard'>
            <div className='User'>
                <div className='sidebar'>
                    <h1>ADD New User</h1>
                    <div className='form'>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">userName</label>
                            <input type="text" class="form-control" onChange={e => setUserName(e.target.value)} maxLength={30} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">Full Name</label>
                            <input type="text" class="form-control" onChange={e => setfullName(e.target.value)} maxLength={30} />
                        </div>

                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">Email</label>
                            <input type="email" class="form-control" onChange={e => setEmail(e.target.value)} maxLength={30} />
                        </div>
                        <button onClick={HandleSubmit} class="btn btn-outline-secondary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser

import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

function ReturnBorrowBook() {
    const navigate = useNavigate();
    const [userid, setUserID] = useState("");
    const [bookid, setBookID] = useState("");

    const HandleSubmit = async () => {
        // console.log("working");
        try {
            // Send the request with the configured headers
            if (!userid || !bookid) {
                alert("Enter All Fields");
            } else {
                // console.log(username, fullname, email);
                // console.log();
                const response = await axios.put(`${process.env.REACT_APP_URI}/return_book/${bookid}`, { user_id: userid});
                console.log(response);
                if (response.status == 200) {
                    alert(`Return Successfully`)
                    navigate("/borrow_list")
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
                    <h1>Return Book Page</h1>
                    <div className='form'>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">Enter User ID</label>
                            <input type="text" class="form-control" onChange={e => setUserID(e.target.value)} maxLength={30} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">Enter Book ID</label>
                            <input type="text" class="form-control" onChange={e => setBookID(e.target.value)} maxLength={30} />
                        </div>
                        <button onClick={HandleSubmit} class="btn btn-outline-secondary">Return Book</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReturnBorrowBook

import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

function BorrowBook() {
    const navigate = useNavigate();
    const [bookid, setBookid] = useState("");
    const [username, setUserName] = useState("");

    const HandleSubmit = async () => {
        // console.log("working");
        try {
            // Send the request with the configured headers
            if (!bookid || !username) {
                alert("Enter All Fields");
            } else {

                let res=await axios.get(`${process.env.REACT_APP_URI}/get_user/${username}`);
                console.log(res);
                res=await axios.get(`${process.env.REACT_APP_URI}/get_book/${bookid}`);
                console.log(res);

                // console.log(username,fullname,email);
                // console.log();
                var currentDate = new Date();

                // Get the current date
                var borrow_date = currentDate.toISOString().slice(0, 10);
                let return_date=""
                const response = await axios.post(`${process.env.REACT_APP_URI}/borrow_book`, { book_id: bookid, user_id: username, borrow_date,return_date });
                console.log(response);
                if (response.status == 200) {
                    alert(`Submit Successfully`)
                    navigate("/")
                } else {
                    console.log(response.status);
                }
            }

        } catch (error) {
            alert(error.response.data.detail)
            console.error('Error fetching data:', error);

        }
    }

    return (
        <div className='DashBoard'>
            <div className='User'>
                <div className='sidebar'>
                    <h1>Borrow Book</h1>
                    <div className='form'>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">Book Id</label>
                            <input type="text" class="form-control" onChange={e => setBookid(e.target.value)} maxLength={30} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">User Id</label>
                            <input type="text" class="form-control" onChange={e => setUserName(e.target.value)} maxLength={30} />
                        </div>

                        <button onClick={HandleSubmit} class="btn btn-outline-secondary">Borrow</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BorrowBook

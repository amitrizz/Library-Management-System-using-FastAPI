import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

function AddBook() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [bookid, setBookid] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setISBN] = useState("");
    const [genre, setGenre] = useState("");

    const HandleSubmit = async () => {
        // console.log("working");
        try {
            // Send the request with the configured headers
            if (!title || !bookid || !author || !isbn || !genre ) {
                alert("Enter All Fields");
            } else {
                // console.log(username,fullname,email);
                // console.log();
                const response = await axios.post(`${process.env.REACT_APP_URI}/add_book`, { title: title, book_id:bookid,author,genre,isbn });
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
                    <h1>ADD New Book To Library</h1>
                    <div className='form'>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">Title</label>
                            <input type="text" class="form-control" onChange={e => setTitle(e.target.value)} maxLength={30} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">Book Id</label>
                            <input type="text" class="form-control" onChange={e => setBookid(e.target.value)} maxLength={30} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">Author</label>
                            <input type="text" class="form-control" onChange={e => setAuthor(e.target.value)} maxLength={30} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">Genre</label>
                            <input type="text" class="form-control" onChange={e => setGenre(e.target.value)} maxLength={30} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" className="lable">ISBN</label>
                            <input type="text" class="form-control" onChange={e => setISBN(e.target.value)} maxLength={30} />
                        </div>
                        <button onClick={HandleSubmit} class="btn btn-outline-secondary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBook

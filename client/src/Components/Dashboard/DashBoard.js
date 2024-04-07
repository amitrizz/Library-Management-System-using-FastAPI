import React, { useEffect, useState } from 'react'
import axios from "axios"
import './DashBoard.css'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ChangeData, PreviousButtonState, SetUserIdForUpdate } from '../../features/dashbaordSlice'

function DashBoard() {

    const navigate = useNavigate()

    const data = useSelector(state => state.data)
    const [fileContent, setFileContent] = useState(false);
    const [bookdata, setBookData] = useState([]);
    const dispatch = useDispatch();


    const DeleteUserbyId = async (id) => {
        try {
            // console.log(skip);
            console.log(id);
            setFileContent(false);
            let response = await axios.delete(`${process.env.REACT_APP_URI}/delete_user/${id}`);
            console.log(response.data);
            alert(response.data.message)
            response = await axios.get(`${process.env.REACT_APP_URI}/get_users`);
            dispatch(ChangeData(response.data.data))
            if (response.data.data[0].id == 1) {
                dispatch(PreviousButtonState(true));
            }
            setFileContent(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                // Send the request with the configured headers
                const response = await axios.get(`${process.env.REACT_APP_URI}/get_users`);
                const res = await axios.get(`${process.env.REACT_APP_URI}/book_list`);
                dispatch(ChangeData(response.data.data))
                console.log(response.data.data);
                setBookData(res.data.data);
                // setBookData(res)
                // if (response.data.data[0].id == 1) {
                //     dispatch(PreviousButtonState(true));
                // }
                setFileContent(true);
                // setAllemployee(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='DashBoard'>
            <div className='Dashbody'>
                {fileContent ?
                    <div className='dashcontent'>
                        <div>
                            <h1 style={{textAlign:"center"}}>User List</h1>


                            {
                                data.map((obj) => {
                                    return (
                                        <div class="card" style={{ "margin": "10px" }} key={obj._id}>
                                            <div class="card-body">
                                                <div>
                                                    <h5 class="card-title">Name : {obj.full_name} </h5>
                                                    <h5 class="card-title">Email: {obj.email}</h5>
                                                    <h5 class="card-title">UserName: {obj.user_id}</h5>
                                                </div>
                                                <div>

                                                    <button onClick={() => DeleteUserbyId(obj.user_id)} class="btn btn-primary">Delete User</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                        <h1 style={{textAlign:"center"}}>Book List</h1>
                            {
                                bookdata.map((obj) => {
                                    return (
                                        <div class="card" style={{ "margin": "10px" }} key={obj._id}>
                                            <div class="card-body">
                                                <div>
                                                    <h5 class="card-title">Name : {obj.title} </h5>
                                                    <h5 class="card-title">Name : {obj.book_id} </h5>
                                                    <h5 class="card-title">Email: {obj.author}</h5>
                                                    <h5 class="card-title">Email: {obj.isbn}</h5>
                                                    <h5 class="card-title">UserName: {obj.genre}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })

                            }

                        </div>

                    </div>
                    : <div className='dashloading'>Loading..</div>}
            </div>
        </div>
    )
}

export default DashBoard

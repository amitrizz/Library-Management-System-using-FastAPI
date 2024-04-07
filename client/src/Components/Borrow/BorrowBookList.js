import React, { useEffect, useState } from 'react'
import axios from "axios"
function BorrowBookList() {
    const [data, setData] = useState([]);
    const [fileContent, setFileContent] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            try {
                // Send the request with the configured headers
                const response = await axios.get(`${process.env.REACT_APP_URI}/borrow_list`);
                // console.log(response.data.data);
                // if (response.data.data[0].id == 1) {
                //     dispatch(PreviousButtonState(true));
                // }
                setData(response.data.data)
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

                        {
                            data.map((obj) => {
                                return (
                                    <div class="card" style={{ "margin": "10px" }} key={obj._id}>
                                        <div class="card-body">
                                            <div>
                                                <h5 class="card-title">UserID : {obj.user_id} </h5>
                                                <h5 class="card-title">BookID: {obj.book_id}</h5>
                                                <h5 class="card-title">Borrow Date: {obj.borrow_date}</h5>
                                                <h5 class="card-title">Return Date: {obj.return_date}</h5>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    : <div className='dashloading'>Loading..</div>}
            </div>
        </div>
    )
}

export default BorrowBookList

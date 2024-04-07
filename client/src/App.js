// import logo from './logo.svg';
import './App.css';
import DashBoard from './Components/Dashboard/DashBoard.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.js';
import { Provider } from "react-redux"
import Header from './Components/Header.js';
import { store } from "../src/stores/store.js"
import AddUser from './Components/AddBookUser/AddUser.js';
import AddBook from './Components/AddBookUser/AddBook.js';
import BorrowBook from './Components/Borrow/BorrowBook.js';
import BorrowBookList from './Components/Borrow/BorrowBookList.js';
import ReturnBorrowBook from './Components/Borrow/ReturnBorrowBook.js';

function App() {
  return (
    <Provider store={store}>

      <BrowserRouter>
        <div className='body'>
          <Header />
          <div className='app'>
            <Navbar className='navbar' />
            <Routes>
              <Route path="/" element={<DashBoard />} ></Route>
              <Route path="/add_user" element={<AddUser />} />
              <Route path="/add_book" element={<AddBook />} />
              <Route path="/borrow_book" element={<BorrowBook />} />
              <Route path="/borrow_list" element={<BorrowBookList />} />
              <Route path="/return_book" element={<ReturnBorrowBook />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

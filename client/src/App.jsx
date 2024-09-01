
import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './components/IndexPage'
import Login from './components/Login'
import Layout from './Layout'
import Register from './components/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Profile from './components/Profile'
import PlacesPage from './components/PlacesPage'
import PlacesFormPage from './components/PlacesFormPage'
import PlaceSinglePage from './components/PlaceSinglePage'
import BookingsPage from './components/BookingsPage'
import BookingPage from './components/BookingPage'
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>                            {/*parent route */}  
        <Route index element={<IndexPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/account" element={<Profile/>} />   {/*using params here and also made it optional */}
        <Route path="/account/places" element={<PlacesPage/>} /> 
        <Route path="/account/places/new" element={<PlacesFormPage/>} /> 
        <Route path="/account/places/:id" element={<PlacesFormPage/>} /> 
        <Route path="/places/:id" element={<PlaceSinglePage/>} /> 
        <Route path="/account/bookings" element={<BookingsPage/>}/>
        <Route path="/account/bookings/:id" element={<BookingPage/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  )
}
//on every route we want to check if we are logged in or not

export default App

import { useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import './App.css';
import {MainBoard} from './pages/Main'
import axios from 'axios'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  SignIn,
  SignUp,
  RedirectToSignIn,
  SignOutButton,
} from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { Profile } from './pages/Profile';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { Consultations } from './pages/Consultaion';
import { AfterCallReview, VideoCallView } from './pages/Call';
import { Notif } from './pages/Notification';
import { Search } from './pages/Search';
import { Schedule } from './pages/Schedule';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const CLERK_SECRET_KEY= 'sk_test_TRduegJprzjAX4ayjk19PBnHhMabrncTVvTNhZzRC5';



function App() {

  const url = 'https://telemedecine-backend-ohl8.onrender.com/user/'
  const { user } = useUser();
  const nav = useNavigate()

  useEffect(()=>{

    if(user){
      console.log(user.emailAddresses[0].emailAddress)
      localStorage.setItem('username', user.emailAddresses[0].emailAddress)
      axios.get(`${url}${user.emailAddresses[0].emailAddress}`)
      .then(response => {
        console.log(response.data.data[0]._id)
        const data = response.data.data[0];
        localStorage.setItem("userid",data._id)
        localStorage.setItem("title",data.title)
        localStorage.setItem("myname",data.username)

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

  },[user])

  



  return (
    <div className="h-screen">
        <Routes>
          <Route path='/profile' element={<SignedIn><Profile/></SignedIn>}/>
          <Route
              path="/sign-in/*"
              element={<SignIn routing="path" path="/sign-in" />}
            />
            <Route
              path="/sign-up/*"
              element={<SignUp routing="path" path="/sign-up" />}
          />
          <Route path='/' element={<SignedIn><MainBoard/></SignedIn>}>
            <Route path='/' element={<SignedIn><Dashboard/></SignedIn>}/>
            <Route path='/search' element={<SignedIn><Search/></SignedIn>}/>
            <Route path='/chat' element={<SignedIn><Chat/></SignedIn>}/>
            <Route path='/videoCall' element={<SignedIn><VideoCallView/></SignedIn>}/>
            <Route path='/consultations' element={<SignedIn><Consultations/></SignedIn>}/>
            <Route path='/videoCall/Reveiw' element={<SignedIn><AfterCallReview/></SignedIn>}/>
            <Route path='/notifications' element={<SignedIn><Notif/></SignedIn>}/>
            <Route path='/specialists' element={<SignedIn><Search/></SignedIn>}/>
            <Route path='/schedule' element={<SignedIn><Schedule/></SignedIn>}/>
            <Route path='/logout' element={<SignedIn><SignOutButton/></SignedIn>}/>
          </Route> 
        </Routes>
        <SignedOut><RedirectToSignIn/></SignedOut>
        <ToastContainer/>
    </div>
  );

}


export default App;


import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from "./components/Home"
import NavBar from './components/Common/NavBar';
import LoginForm from './components/Common/LoginForm';
import ForgotPassword from './components/Common/ForgotPassword';
import UpdatePassword from './components/Common/UpdatePassword';
import SignupForm from './components/Common/SignupForm';
import VerifyEmail from './components/Common/VerifyEmail';

function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>  
    <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignupForm/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/update-password/:id' element={<UpdatePassword/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
      </Routes>
    </div>
  );
}

export default App;

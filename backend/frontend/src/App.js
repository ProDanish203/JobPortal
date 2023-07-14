import './App.css';
import { Router } from "./Config/Router";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Header/>
    <ToastContainer/> 

    <div className='relative w-full mx-auto'>
      <Router/>
    </div>

    <Footer/>    
    </>
  );
}

export default App;

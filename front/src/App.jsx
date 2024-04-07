import React from 'react';
import './index.css';
import AuthForm from './component/AuthForm';
import banner from './assets/banner.jpg';


function App() {
 
  return (
    <div className='flex justify-center flex-col h-screen bg-black'>
      <div className='h-3/5 flex'>
        <img src= {banner} alt='banner' className='w-full h-full'/>
      </div>
      <div className='flex h-2/5 max-[430px]:w-screen lg:w-1/4 justify-center items-center rounded-t-xl'>
      <AuthForm />
      </div>
    </div>
  )
}

export default App

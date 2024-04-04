import React from 'react';
import './index.css';
import ValidateButton from './component/ValidateButton';


function App() {
 

  return (
    <div className='m-5'>
      <h1 className="text-3xl font-bold underline text-green-900"> Hello world! </h1>
      <ValidateButton label='submit' />
    </div>
  )
}

export default App

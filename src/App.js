import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import img from "./admission.png"

const App = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);


  const onSubmit = async (event) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    event.preventDefault();
  };
  const handleFileUpload = (event) => {
    const selectedFile1 = event.target.files[0];
    if (selectedFile1) {
      setFile(selectedFile1);
    } else {
      console.error('Error:');
    }
  };





  return(

  <div className='w-full h-screen flex flex-col justify-around items-center bg-gray-600  '>
    <div className='flex flex-col items-center mt-20'>
    <div className='flex flex-row justify-center items-center w-8/1 rounded-md shadow-sm px-10 py-5 border border-'>
       <span className=' text-2xl text-white'><span className=' font-bold'>ApplyUSA:</span> Navigating the Path to Graduate Excellence </span> 
    </div>
    
    </div>
    <div >
      <img src={img} className=' w-40 h-40'/>
    </div>
    <div className=' flex self-center '>
 
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Upload</label>
    <div class="relative"  >
        <input type="file" id="search" class="block w-[600px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Upload" accept=".json" onChange={handleFileUpload}  required/>
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  onClick={onSubmit}>Submit</button>
    </div>
   
    </div>
    <div className='flex '>
{result && (
         <div className="container mx-auto">
        <table className="min-w-full bg-gray-600  border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-white">Candidate</th>
              <th className="py-2 px-4 border-b text-white">Admission Result</th>
            </tr>
          </thead>
          <tbody>
            {result.map((candidate, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-white">{candidate.Username}</td>
                <td className="py-2 px-4 border-b text-white">{candidate.Admission_Prediction  === 0 ? " Failed" :"Admitted"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      </div>
    
    </div>
  )
};

export default App;

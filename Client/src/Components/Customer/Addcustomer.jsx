import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiShakingHands } from "react-icons/gi";
import axios from 'axios';

function Addcustomer() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [loanDate, setLoanDate] = useState(new Date().toLocaleDateString('en-GB'));
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [itemName, setItemname] = useState("");
  const [itemWeight, setItemweight] = useState("");
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://omsai-goldloan.onrender.com/addcustomer', 
      { name, mobile, address, loanDate, loanAmount, interestRate, itemName, itemWeight, status, imageUrl })
      .then(result => {
        alert("Customer added successfully");
        navigate('/customerdetail');
      })
      .catch(error => alert("Mobile no is already used"));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "goldloan");
    data.append("cloud_name", "praveensunar");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/praveensunar/image/upload", {
        method: "POST",
        body: data
      });
      const uploaded = await res.json();
      if (uploaded.url) {
        setImageUrl(uploaded.url);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 my-5">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-blue-300/25 rounded-md shadow-lg p-8 shadow-gray-600">
        <div className="flex justify-center">
          <h2 className="text-[40px] font-bold text-gray-700"><GiShakingHands /></h2>
        </div>
        <h1 className="text-center text-2xl md:text-3xl text-gray-800 font-semibold mt-2">Add Customer</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
          {[['name', 'Enter the Customer Name'], ['mobile', 'Mobile number'], ['address', 'Address'], ['loanAmount', 'Loan Amount'], ['interestRate', 'Interest Rate'], ['itemname', 'Item Name'], ['itemweight', 'Item Weight']].map(([field, placeholder]) => (
            <input key={field} type="text" name={field} placeholder={placeholder} required
              onChange={(e) => eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}`)(e.target.value)}
              className='bg-white p-1 rounded-md text-center text-xl h-10 md:h-12 w-full font-[400] capitalize outline-none hover:bg-gray-500/15' />
          ))}
          <span className='text-lg'>Loan Date</span>
          <input type="date" name="loanDate" onChange={(e) => setLoanDate(e.target.value)}
            className='bg-white p-1 rounded-md text-xl text-center h-10 md:h-12 w-full font-[400] capitalize outline-none hover:bg-gray-500/15' />
          <select name="status" required onChange={(e) => setStatus(e.target.value)}
            className='bg-white p-1 rounded-md text-xl text-center h-10 md:h-12 w-full font-[400] capitalize outline-none hover:bg-gray-500/15'>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <label className="text-gray-700 font-medium">Upload Item Image:</label>
          <input onChange={handleFileUpload} type="file" id="myFile" name="filename" className='text-amber-700 bg-white' />
          {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" className='ml-20 md:ml-40 rounded-xl' />}
          <div className='flex justify-center gap-10 mt-4'>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
            <Link to="/home" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addcustomer;

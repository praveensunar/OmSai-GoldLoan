import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiShakingHands } from "react-icons/gi";
import axios from 'axios';

function Addcustomer() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [loanDate, setLoanDate] = useState(new Date().toLocaleDateString('en-GB')); // Default to today's date in DD/MM/YYYY
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [itemName, setItemname] = useState("");
  const [itemWeight, setItemweight] = useState("");
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/addcustomer', 
      {
      name,
      mobile,
      address, 
      loanDate, 
      loanAmount, 
      interestRate, 
      itemName, 
      itemWeight, 
      status,
      imageUrl
    })
      .then(result => {
        alert("Customer added successfully");
        navigate('/customerdetail');
      })
      .catch(error => console.log(error));
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "goldloan"); // Replace with your Cloudinary preset
    data.append("cloud_name", "praveensunar"); // Replace with your Cloudinary cloud name

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/praveensunar/image/upload", {
            method: "POST",
            body: data
        });

        const uploaded = await res.json();
        if (uploaded.url) {
            setImageUrl(uploaded.url); // Set the uploaded image URL in state
            console.log("Uploaded Image URL:", uploaded.url);
        } else {
            console.error("Image upload failed:", uploaded);
        }
    } catch (err) {
        console.error("Error uploading image:", err);
    }
};

  return (
    <div className="flex justify-center items-center min-h-screen px-4 my-5">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-blue-300/25 rounded-lg shadow-lg p-8 shadow-gray-600">
        {/* Icon */}
        <div className="flex justify-center">
          <h2 className="text-[40px] font-bold text-gray-700"><GiShakingHands /></h2>
        </div>
        <h1 className="text-center text-2xl md:text-3xl text-gray-800 font-semibold mt-2">Add Customer</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5 bg-fuchsia-200/40 justify-center p-3 rounded-2xl">
          <input type="text" name="name"
            placeholder="Enter the Customer Name" required
            onChange={(e) => setName(e.target.value)}
            className='bg-white rounded-lg text-center h-[12] w-full font-[400] capitalize outline-none hover:bg-gray-500/15' />

          <input type="number" name="mobile"
            placeholder="Mobile number" required
            onChange={(e) => setMobile(e.target.value)}
            className='bg-white rounded-lg text-center h-[12] w-full font-[400] capitalize outline-none hover:bg-gray-500/15 appearance-none' />

          <input type="text" name="address"
            placeholder="Address" required
            onChange={(e) => setAddress(e.target.value)}
            className='bg-white rounded-lg text-center h-[12] w-full font-[400] capitalize outline-none hover:bg-gray-500/15' />

          {/* Date Input with Center Alignment & DD/MM/YYYY Format */}
          <input type="date" name="loanDate"
            onChange={(e) => setLoanDate(e.target.value)}
            className='bg-white rounded-lg text-center h-[12] w-full font-[500] capitalize outline-none hover:bg-gray-500/15 appearance-none md:pl-40 pl-23' />

          <input type="number" name="loanAmount"
            placeholder="Loan Amount" required
            onChange={(e) => setLoanAmount(e.target.value)}
            className='bg-white rounded-lg text-center h-[12] w-full font-[400] capitalize outline-none hover:bg-gray-500/15 appearance-none' />

          <input type="number" name="interestRate"
            placeholder="Interest Rate" required
            onChange={(e) => setInterestRate(e.target.value)}
            className='bg-white rounded-lg text-center h-[12] w-full font-[400] capitalize outline-none hover:bg-gray-500/15 appearance-none' />

          <input type="text" name="itemname"
            placeholder="Item Name" required
            onChange={(e) => setItemname(e.target.value)}
            className='bg-white rounded-lg text-center h-[12] w-full font-[400] capitalize outline-none hover:bg-gray-500/15' />

          <input type="number" name="itemweight"
            placeholder="Item Weight" required
            onChange={(e) => setItemweight(e.target.value)}
            className='bg-white rounded-lg text-center h-[12] w-full font-[400] capitalize outline-none hover:bg-gray-500/15 appearance-none' />

          <select name="status" required onChange={(e) => setStatus(e.target.value)}
            className='bg-white rounded-lg text-center h-[12] w-full font-[400] capitalize outline-none hover:bg-gray-500/15 appearance-none' >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <label className="text-gray-700 font-medium">Upload Item Image:</label>
          <input  onChange={handleFileUpload}  type="file" id="myFile" name="filename" className='text-amber-700 bg-white' />
          {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" className='ml-20 md:ml-40 rounded-xl' />}
          <div className='flex justify-center gap-10 mt-4'>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Save</button>
            <Link to="/home" className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addcustomer;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiShakingHands } from "react-icons/gi";
import { MdBackspace , MdOutlineSaveAlt } from 'react-icons/md';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://omsai-goldloan.onrender.com/addcustomer', 
      { name, mobile, address, loanDate, loanAmount, interestRate, itemName, itemWeight, status, imageUrl })
      .then(result => {
        toast("Customer added successfully");
        navigate('/customerdetail');
      })
      .catch(error => toast("Mobile no is already used"));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "goldloan");
    data.append("cloud_name", "praveensunar");

    try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/praveensunar/image/upload", data, {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percent);
      }
    });

    if (res.data.url) {
      setImageUrl(res.data.url);
      toast.success("Image uploaded successfully!");
    }
  } catch (err) {
    console.error("Error uploading image:", err);
    toast.error("Image upload failed.");
  } finally {
    setTimeout(() => setUploadProgress(0), 1000); // Reset progress bar after a second
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
          {uploadProgress > 0 && (
  <div className="w-full bg-gray-300 rounded-full h-3 mt-2">
    <div
      className="bg-green-500 h-3 rounded-full transition-all duration-200"
      style={{ width: `${uploadProgress}%` }}
    ></div>
  </div>
)}

          {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" className='ml-20 md:ml-40 rounded-xl' />}
          <div className='flex justify-center gap-10 mt-4'>
            <button type="submit" className="mt-10 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"> <MdOutlineSaveAlt />Save</button>
            <Link
                    to="/home"
                    className="mt-10 flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition"
                  >
                    <MdBackspace />Home
                  </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Addcustomer;

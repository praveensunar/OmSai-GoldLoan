import React, { useEffect, useState } from 'react';
import { MdBackspace } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdOutlineCalculate } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from 'axios';

function Viewcustomer() {
    const { id } = useParams();  // ✅ Get the correct customer ID
    const [customer, setCustomer] = useState(null);  // ✅ Fix initial state
    const [loading, setLoading] = useState(true); // ✅ Add loading state
    const [error, setError] = useState(null); // ✅ Add error state
    const [totalAmount, setTotalAmount] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/customer/${id}`)
            .then(response => {
                setCustomer(response.data);
                setLoading(false);
            })
            .catch(error => {
                // console.error("Error fetching customer:", error);
                setError("Failed to fetch customer.");
                setLoading(false);
            });
    }, [id]); 


    const handleCalculate = () => {
        if (customer) {
            const loanAmount = Number(customer.loanAmount) || 0;
            const interestRate = Number(customer.interestRate) / 100 || 0;
            
            // Convert loanDate safely
            let loanDate = new Date(customer.loanDate);
            
            // Handle cases where loanDate is stored as a string
            if (typeof customer.loanDate === "string" && !isNaN(Date.parse(customer.loanDate))) {
                loanDate = new Date(Date.parse(customer.loanDate)); 
            }
    
            if (isNaN(loanDate.getTime())) { // Check if valid date
                console.error("Invalid loanDate format:", customer.loanDate);
                setTotalInterest("Invalid Date");
                setTotalAmount("Invalid Date");
                return;
            }
    
            const currentDate = new Date();
            const monthsElapsed = 
                (currentDate.getFullYear() - loanDate.getFullYear()) * 12 + 
                (currentDate.getMonth() - loanDate.getMonth());
    
            const totalInterest = loanAmount * interestRate * monthsElapsed;
            const total = loanAmount + totalInterest;
    
            setTotalAmount(total.toFixed(2));
            setTotalInterest(totalInterest.toFixed(2));
        }
    };
    
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await axios.delete(`http://localhost:3001/customer/${id}`);
                alert("Customer deleted successfully!");
                navigate('/customerdetail'); // Redirect to customer list
            } catch (error) {
                console.error("Error deleting customer:", error);
                alert("Failed to delete customer.");
            }
        }
    };
    
    

    if (loading) return <p className="text-center text-gray-600">Loading customer details...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen shadow-gray-600 shadow-lg">
            <h1 className='text-3xl font-bold my-5 text-gray-800'>View Customer</h1>

            <div className="bg-white p-5 rounded-xl shadow-md w-full max-w-lg">
                <h3 className="text-3xl font-bold text-gray-600 mb-3 text-center capitalize">{customer.name}</h3>

                <div className="flex justify-center mb-4">
                    <img src={customer.imageUrl} alt="Uploaded Item" className="w-50 h-50 object-cover rounded-lg shadow-md" />
                </div>

                <div className="space-y-2 text-gray-700 m-5">
                <p key={customer._id}> <strong>Customer Id: </strong>{customer._id}</p>
                    <p className='capitalize'><strong>Customer Name:</strong> {customer.name}</p>
                    <p className='capitalize'><strong>Address:</strong> {customer.address}</p>
                    <p><strong>Mobile:</strong> {customer.mobile}</p>
                    <p><strong>Loan Date:</strong> {customer.loanDate}</p>
                    <p className='capitalize'><strong>Item Name:</strong> {customer.itemName} </p>
                    <p><strong>Item Weight:</strong> {customer.itemWeight} gram</p>
                    <p><strong>Status:</strong> {customer.status}</p>
                    <p><strong>Interest Rate:</strong> {customer.interestRate}%</p>
                    <hr className="my-2"/>
                    <p><strong>Loan Amount:</strong> ₹ {customer.loanAmount}</p>
                    <p><strong>Interest Amount:</strong> ₹ {totalInterest !== null ? totalInterest : ''}</p>
                    <hr className="my-2" />
                    <p className="text-lg font-semibold"><strong>Total Amount:</strong> ₹ {totalAmount !== null ? totalAmount : ''}</p>
                </div>
            </div>

            <div className="flex gap-4 mt-5">
                <Link to="/customerdetail" className="bg-gray-500 text-white px-5 py-3 text-2xl rounded-lg shadow-md hover:bg-gray-600">
                    <MdBackspace />
                </Link>
                <Link to={`/updatecustomer/${customer._id}`} className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-600">
    Update
</Link>
                <button onClick={handleCalculate} className="bg-green-500 text-white px-5 py-3 text-2xl rounded-lg shadow-md hover:bg-green-600">
                    <MdOutlineCalculate />
                </button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-5 py-3 text-2xl rounded-lg shadow-md hover:bg-red-600">
                    <RiDeleteBin6Fill />
                </button>
            </div>
        </div>
    );
}

export default Viewcustomer;

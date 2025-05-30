import React, { useEffect, useState } from 'react';
import { MdBackspace } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Viewcustomer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://omsai-goldloan.onrender.com/customer/${id}`)
            .then(response => {
                setCustomer(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch customer.");
                toast.error("Failed to fetch customer details.");
                setLoading(false);
            });
    }, [id]);

    const handleCalculate = () => {
        if (customer) {
            const loanAmount = Number(customer.loanAmount) || 0;
            const interestRate = Number(customer.interestRate) / 100 || 0;
            let loanDate = new Date(customer.loanDate);

            if (typeof customer.loanDate === "string" && !isNaN(Date.parse(customer.loanDate))) {
                loanDate = new Date(Date.parse(customer.loanDate));
            }

            if (isNaN(loanDate.getTime())) {
                toast.error("Invalid loan date format.");
                setTotalInterest("Invalid Date");
                setTotalAmount("Invalid Date");
                setElapsedTime(null);
                return;
            }

            let endDate = new Date();
            if (!isNaN(Date.parse(customer.status))) {
                endDate = new Date(customer.status);
                toast.info("Loan is closed. Interest calculated until closing date.");
            }

            const timeDiff = endDate - loanDate;
            const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const fullMonths = Math.floor(totalDays / 30);
            const remainingDays = totalDays % 30;

            let monthsForInterest = fullMonths;
            if (remainingDays > 0) {
                monthsForInterest += 1;
            }

            const totalInterest = loanAmount * interestRate * monthsForInterest;
            const total = loanAmount + totalInterest;

            setElapsedTime(`${fullMonths} M${fullMonths !== 1 ? 's' : ''} ${remainingDays} D${remainingDays !== 1 ? 's' : ''}`);
            setTotalAmount(total.toFixed(2));
            setTotalInterest(totalInterest.toFixed(2));
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await axios.delete(`https://omsai-goldloan.onrender.com/customer/${id}`);
                toast.success("Customer deleted successfully!");
                setTimeout(() => navigate('/customerdetail'), 1500);
            } catch (error) {
                console.error("Error deleting customer:", error);
                toast.error("Failed to delete customer.");
            }
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading customer details...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="flex flex-col items-center p-4 sm:p-6 bg-gray-100 min-h-screen shadow-gray-600 shadow-lg">
            <h1 className='text-2xl sm:text-3xl font-bold my-4 text-gray-800 text-center'>View Customer</h1>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-lg">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-3 text-center capitalize">{customer.name}</h3>

                <div className="flex justify-center mb-4">
                    <a href={customer.imageUrl} target="_blank" rel="noopener noreferrer">
                        <img
                            src={customer.imageUrl}
                            alt="Uploaded Item"
                            className="w-60 h-60 sm:w-64 sm:h-64 object-cover rounded-lg shadow-md hover:opacity-90 transition duration-200"
                        />
                    </a>
                </div>

                <div className="space-y-2 text-sm sm:text-base text-gray-700">
                    <p><strong>Customer Id:</strong> {String(parseInt(customer._id.slice(-3), 16)).padStart(3, '0')}</p>
                    <p className='capitalize'><strong>Customer Name:</strong> {customer.name}</p>
                    <p className='capitalize'><strong>Address:</strong> {customer.address}</p>
                    <p><strong>Mobile:</strong> {customer.mobile}</p>
                    <p><strong>Loan Date:</strong> {customer.loanDate}</p>
                    <p className='capitalize'><strong>Item Name:</strong> {customer.itemName}</p>
                    <p><strong>Item Weight:</strong> {customer.itemWeight} gram</p>
                    <p><strong>Status:</strong> <span className={
                        !isNaN(Date.parse(customer.status))
                            ? 'text-red-500 font-[500]'
                            : customer.status.toLowerCase() === 'active'
                                ? 'text-green-600 font-[600]'
                                : 'font-[500]'
                    }>{customer.status}</span></p>

                    <div className='flex justify-between'>
                        <p><strong>Interest Rate:</strong> {customer.interestRate}%</p>
                        <p><strong>No of Days:</strong> {elapsedTime || '00'}</p>
                    </div>

                    <hr className="my-2" />
                    <p><strong>Loan Amount:</strong> ₹ {customer.loanAmount}</p>
                    <p><strong>Interest Amount:</strong> ₹ {totalInterest || ''}</p>
                    <hr className="my-2" />
                    <p className="text-lg font-semibold"><strong>Total Amount:</strong> ₹ {totalAmount || ''}</p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Link to="/customerdetail" className="bg-gray-500 text-white px-4 py-2 sm:px-5 sm:py-3 text-xl rounded-lg shadow-md hover:bg-gray-600">
                    <MdBackspace />
                </Link>
                <Link to={`/updatecustomer/${customer._id}`} className="bg-blue-500 text-white px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-xl rounded-lg shadow-md hover:bg-blue-600">
                    Update
                </Link>
                <button onClick={handleCalculate} className="bg-green-500 text-white px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-xl rounded-lg shadow-md hover:bg-green-600">
                    Calculate
                </button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 sm:px-5 sm:py-3 text-xl rounded-lg shadow-md hover:bg-red-600">
                    <RiDeleteBin6Fill />
                </button>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Viewcustomer;

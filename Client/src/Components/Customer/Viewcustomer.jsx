import { useEffect, useState } from 'react';
import {
  MdBackspace,
  MdEdit,
  MdDelete,
  MdPerson,
  MdPhone,
  MdLocationOn,
  MdAttachMoney,
  MdPercent,
  MdDateRange,
  MdCalculate,
  MdVisibility
} from "react-icons/md";
import {
  GiGoldBar,
  GiReceiveMoney,
  GiWeight
} from "react-icons/gi";
import {
  FaSpinner,
  FaExclamationTriangle,
  FaClock,
  FaImage,
  FaCheckCircle
} from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
// Removed navigation hooks to prevent alert conflicts
import BackButton from '../common/BackButton';
import ImageDisplay from '../ImageDisplay';

function Viewcustomer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { resetAutoLogout } = useAuth();

    // Removed browser back button handler to prevent conflicts
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(null);
    const [deleting, setDeleting] = useState(false);
  const [closingLoan, setClosingLoan] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                setLoading(true);
                setError(null);
                resetAutoLogout();

                console.log(`Fetching customer ${id}`);
                const response = await axios.get(`https://omsai-goldloan.onrender.com/customer/${id}`, {
                    timeout: 15000 // 15 second timeout
                });
                console.log('Customer data received:', response.data);
                console.log('Image URL:', response.data.imageUrl);
                console.log('Image URL type:', typeof response.data.imageUrl);
                console.log('Image URL length:', response.data.imageUrl?.length);
                console.log('All customer fields:', Object.keys(response.data));
                setCustomer(response.data);
                // Auto-calculate on load - inline calculation to avoid dependency issues
                const customerData = response.data;

                try {
                    const loanAmount = Number(customerData.loanAmount) || 0;
                    const interestRate = Number(customerData.interestRate) / 100 || 0;
                    let loanDate = new Date(customerData.loanDate);

                    if (typeof customerData.loanDate === "string" && !isNaN(Date.parse(customerData.loanDate))) {
                        loanDate = new Date(Date.parse(customerData.loanDate));
                    }

                    if (!isNaN(loanDate.getTime())) {
                        let endDate = new Date();
                        let isLoanClosed = false;

                        if (!isNaN(Date.parse(customerData.status))) {
                            endDate = new Date(customerData.status);
                            isLoanClosed = true;
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

                        setElapsedTime({
                            months: fullMonths,
                            days: remainingDays,
                            totalDays: totalDays,
                            isLoanClosed: isLoanClosed
                        });
                        setTotalAmount(total);
                        setTotalInterest(totalInterest);
                    }
                } catch (calcError) {
                    console.error("Error calculating interest:", calcError);
                }
            } catch (error) {
                console.error("Error fetching customer:", error);

                // Handle different types of errors without retrying
                if (error.code === 'ERR_NETWORK' || error.code === 'ERR_INSUFFICIENT_RESOURCES') {
                    setError("Unable to connect to server. Please check your internet connection and try again.");
                } else if (error.response?.status === 404) {
                    setError("Customer not found.");
                } else if (error.code === 'ECONNABORTED') {
                    setError("Request timed out. The server might be slow. Please try again.");
                } else {
                    setError("Failed to fetch customer details. Please try again.");
                }

                // Only show toast for non-network errors to avoid spam
                if (error.code !== 'ERR_NETWORK' && error.code !== 'ERR_INSUFFICIENT_RESOURCES') {
                    toast.error("Failed to load customer data");
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCustomer();
        }
    }, [id]);

    const calculateInterest = (customerData = customer) => {
        if (!customerData) return;

        try {
            const loanAmount = Number(customerData.loanAmount) || 0;
            const interestRate = Number(customerData.interestRate) / 100 || 0;
            let loanDate = new Date(customerData.loanDate);

            if (typeof customerData.loanDate === "string" && !isNaN(Date.parse(customerData.loanDate))) {
                loanDate = new Date(Date.parse(customerData.loanDate));
            }

            if (isNaN(loanDate.getTime())) {
                toast.error("Invalid loan date format.");
                setTotalInterest("Invalid Date");
                setTotalAmount("Invalid Date");
                setElapsedTime(null);
                return;
            }

            let endDate = new Date();
            let isLoanClosed = false;

            if (!isNaN(Date.parse(customerData.status))) {
                endDate = new Date(customerData.status);
                isLoanClosed = true;
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

            setElapsedTime({
                months: fullMonths,
                days: remainingDays,
                totalDays: totalDays,
                isLoanClosed: isLoanClosed
            });
            setTotalAmount(total);
            setTotalInterest(totalInterest);

            if (isLoanClosed) {
                toast.info("Loan is closed. Interest calculated until closing date.");
            }
        } catch (error) {
            console.error("Error calculating interest:", error);
            toast.error("Error calculating interest");
        }
    };



    const handleCloseLoan = async () => {
        const confirmMessage = `Are you sure you want to close the loan for "${customer?.name}"?\n\nThis will set the completion date to today and mark the loan as closed.`;

        if (window.confirm(confirmMessage)) {
            try {
                setClosingLoan(true);
                resetAutoLogout();

                const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
                const updatedCustomer = { ...customer, status: today };

                await axios.put(`https://omsai-goldloan.onrender.com/updatecustomer/${id}`, updatedCustomer, {
                    timeout: 15000
                });

                // Update local state
                setCustomer(updatedCustomer);

                // Recalculate interest with the new close date
                // calculateInterest(updatedCustomer);

                toast.success("Loan closed successfully!");
            } catch (error) {
                console.error("Error closing loan:", error);

                if (error.code === 'ERR_NETWORK' || error.code === 'ERR_INSUFFICIENT_RESOURCES') {
                    toast.error("Unable to connect to server. Please check your connection and try again.");
                } else if (error.response?.status === 404) {
                    toast.error("Customer not found. It may have been deleted.");
                } else if (error.code === 'ECONNABORTED') {
                    toast.error("Request timed out. Please try again.");
                } else {
                    toast.error("Failed to close loan. Please try again.");
                }
            } finally {
                setClosingLoan(false);
            }
        }
    };

    const handleDelete = async () => {
        const confirmMessage = `Are you sure you want to delete customer "${customer?.name}"?\n\nThis action cannot be undone.`;

        if (window.confirm(confirmMessage)) {
            try {
                setDeleting(true);
                resetAutoLogout();
                await axios.delete(`https://omsai-goldloan.onrender.com/customer/${id}`);
                toast.success("Customer deleted successfully!");
                setTimeout(() => navigate('/customerdetail'), 1500);
            } catch (error) {
                console.error("Error deleting customer:", error);
                toast.error("Failed to delete customer.");
            } finally {
                setDeleting(false);
            }
        }
    };

    // Calculate effective status based on loan age
    const getEffectiveStatus = (customerData) => {
        if (!customerData) return '';

        const loanDate = new Date(customerData.loanDate);
        const currentDate = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

        // If loan is closed (status is a date), return the original status
        if (!isNaN(Date.parse(customerData.status))) {
            return customerData.status;
        }

        // If loan is older than 6 months and not closed, set to pending
        if (loanDate < sixMonthsAgo && customerData.status.toLowerCase() !== 'pending') {
            return 'Pending';
        }

        return customerData.status;
    };

    const getStatusColor = (status) => {
        if (!isNaN(Date.parse(status))) {
            return 'text-blue-600 bg-blue-100'; // Changed from red to blue for closed loans
        } else if (status?.toLowerCase() === 'active') {
            return 'text-green-600 bg-green-100';
        } else if (status?.toLowerCase() === 'pending') {
            return 'text-yellow-600 bg-yellow-100';
        } else {
            return 'text-gray-600 bg-gray-100';
        }
    };

    const isLoanClosed = () => {
        return !isNaN(Date.parse(customer?.status));
    };

    const isOlderThan6Months = () => {
        if (!customer) return false;
        const loanDate = new Date(customer.loanDate);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        return loanDate < sixMonthsAgo && !isLoanClosed();
    };

    const handleViewFullImage = () => {
        if (!customer.imageUrl) return;

        // Check if it's a base64 image
        if (customer.imageUrl.startsWith('data:image/')) {
            // For base64 images, open in modal
            setShowImageModal(true);
        } else {
            // For regular URLs, open in new tab
            window.open(customer.imageUrl, '_blank');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-6xl text-[#9C8E6B] mx-auto mb-4" />
                    <p className="text-gray-600 text-xl">Loading customer details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center max-w-md mx-auto p-8">
                    <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-600 text-lg mb-6">{error}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Try Again
                        </button>
                        <BackButton
                            variant="primary"
                            size="medium"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="flex justify-center mb-4">
                        <div className="text-6xl text-[#9C8E6B] animate-float">
                            <MdVisibility />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Customer Details</h1>
                    <p className="text-gray-600 text-lg">Complete customer information and loan details</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Customer Info Card */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
                        {/* Customer Header */}
                        <div className="flex items-center gap-6 mb-8 p-6 bg-gradient-to-r from-[#9C8E6B]/10 to-[#ffd700]/10 rounded-2xl">
                            <div className="text-5xl text-[#9C8E6B]">
                                <MdPerson />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 capitalize">{customer.name}</h2>
                                <p className="text-gray-600">ID: {String(parseInt(customer._id.slice(-3), 16)).padStart(3, '0')}</p>
                                <div className="mt-2">
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(getEffectiveStatus(customer))}`}>
                                        {isLoanClosed() ? `Closed on ${new Date(customer.status).toLocaleDateString()}` : getEffectiveStatus(customer)}
                                    </span>
                                    {isOlderThan6Months() && getEffectiveStatus(customer).toLowerCase() === 'pending' && (
                                        <div className="mt-1">
                                            <span className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded">
                                                ⚠️ Loan is 6+ months old
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <MdPerson className="text-[#9C8E6B]" />
                                    Personal Information
                                </h3>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <MdPhone className="text-[#9C8E6B] text-lg" />
                                    <div>
                                        <p className="text-sm text-gray-500">Mobile Number</p>
                                        <p className="font-semibold text-gray-800">{customer.mobile}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                    <MdLocationOn className="text-[#9C8E6B] text-lg mt-1" />
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="font-semibold text-gray-800 capitalize">{customer.address}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <GiGoldBar className="text-[#9C8E6B]" />
                                    Item Information
                                </h3>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <GiGoldBar className="text-[#9C8E6B] text-lg" />
                                    <div>
                                        <p className="text-sm text-gray-500">Item Name</p>
                                        <p className="font-semibold text-gray-800 capitalize">{customer.itemName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <GiWeight className="text-[#9C8E6B] text-lg" />
                                    <div>
                                        <p className="text-sm text-gray-500">Weight</p>
                                        <p className="font-semibold text-gray-800">{customer.itemWeight} grams</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Loan Information */}
                        <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <GiReceiveMoney className="text-[#9C8E6B]" />
                                Loan Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                    <MdAttachMoney className="text-blue-600 text-2xl" />
                                    <div>
                                        <p className="text-sm text-blue-600">Loan Amount</p>
                                        <p className="text-xl font-bold text-blue-800">₹{parseFloat(customer.loanAmount).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                                    <MdPercent className="text-green-600 text-2xl" />
                                    <div>
                                        <p className="text-sm text-green-600">Interest Rate</p>
                                        <p className="text-xl font-bold text-green-800">{customer.interestRate}%</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                                    <MdDateRange className="text-purple-600 text-2xl" />
                                    <div>
                                        <p className="text-sm text-purple-600">Loan Date</p>
                                        <p className="text-xl font-bold text-purple-800">{new Date(customer.loanDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Time and Interest Calculation */}
                            {elapsedTime && (
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                                        <FaClock className="text-yellow-600 text-2xl" />
                                        <div>
                                            <p className="text-sm text-yellow-600">Duration</p>
                                            <p className="text-lg font-bold text-yellow-800">
                                                {elapsedTime.months}M {elapsedTime.days}D
                                            </p>
                                        </div>
                                    </div>

                                    {isLoanClosed() && (
                                        <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                                            <FaCheckCircle className="text-red-600 text-2xl" />
                                            <div>
                                                <p className="text-sm text-red-600">Closed Date</p>
                                                <p className="text-lg font-bold text-red-800">
                                                    {new Date(customer.status).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                                        <MdCalculate className="text-orange-600 text-2xl" />
                                        <div>
                                            <p className="text-sm text-orange-600">Interest Amount</p>
                                            <p className="text-lg font-bold text-orange-800">₹{totalInterest?.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                                        <GiReceiveMoney className="text-green-600 text-2xl" />
                                        <div>
                                            <p className="text-sm text-green-600">Total Amount</p>
                                            <p className="text-xl font-bold text-green-800">₹{totalAmount?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Image and Actions */}
                    <div className="space-y-6">
                        {/* Item Image */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 animate-slide-up">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaImage className="text-[#9C8E6B]" />
                                Item Image
                                {customer.imageUrl && (
                                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                        URL Found
                                    </span>
                                )}
                                {!customer.imageUrl && (
                                    <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                                        No URL
                                    </span>
                                )}
                            </h3>



                            <div className="relative group">
                                <ImageDisplay
                                    imageUrl={customer.imageUrl}
                                    alt="Item"
                                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                                />
                                {customer.imageUrl && customer.imageUrl.trim() !== '' && (
                                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                                        <button
                                            onClick={handleViewFullImage}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-opacity-100"
                                        >
                                            View Full Size
                                        </button>
                                    </div>
                                )}
                            </div>


                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 animate-slide-up">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Actions</h3>

                            <div className="space-y-3">
                                {!isLoanClosed() ? (
                                    <button
                                        onClick={handleCloseLoan}
                                        disabled={closingLoan}
                                        className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-white font-semibold transition-all duration-300 ${
                                            closingLoan
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:scale-105 shadow-lg hover:shadow-xl'
                                        }`}
                                    >
                                        {closingLoan ? (
                                            <FaSpinner className="animate-spin" />
                                        ) : (
                                            <MdCalculate />
                                        )}
                                        {closingLoan ? 'Closing Loan...' : 'Close Loan'}
                                    </button>
                                ) : (
                                    <div className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-red-100 border border-red-300 rounded-xl text-red-700 font-semibold">
                                        <FaCheckCircle />
                                        Loan Closed
                                    </div>
                                )}



                                {!isLoanClosed() ? (
                                    <Link
                                        to={`/updatecustomer/${customer._id}`}
                                        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <MdEdit />
                                        Update Customer
                                    </Link>
                                ) : (
                                    <div className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gray-400 text-gray-200 rounded-xl font-semibold cursor-not-allowed">
                                        <MdEdit />
                                        Update Disabled (Loan Closed)
                                    </div>
                                )}

                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-white font-semibold transition-all duration-300 ${
                                        deleting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-105 shadow-lg hover:shadow-xl'
                                    }`}
                                >
                                    {deleting ? (
                                        <FaSpinner className="animate-spin" />
                                    ) : (
                                        <MdDelete />
                                    )}
                                    {deleting ? 'Deleting...' : 'Delete Customer'}
                                </button>

                                <BackButton
                                    variant="default"
                                    size="large"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal for Base64 Images */}
            {showImageModal && customer.imageUrl && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={() => setShowImageModal(false)}
                            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full p-2 z-10 transition-all duration-300"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={customer.imageUrl}
                            alt="Full size item"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={() => setShowImageModal(false)}
                        />
                        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg">
                            <p className="text-sm">Click anywhere to close</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Viewcustomer;

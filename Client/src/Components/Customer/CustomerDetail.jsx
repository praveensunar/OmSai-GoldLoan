import React, { useEffect, useRef, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { MdLocalPrintshop } from "react-icons/md";
import { MdBackspace } from "react-icons/md";
import { Link} from 'react-router-dom';
import axios from 'axios';

function CustomerDetail() {
    const tableRef = useRef(null);

    // State for customers and search functionality
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    // Fetch customers from backend
    useEffect(() => {
        axios.get('http://localhost:3001/customerdetail')
            .then(response => {
                setCustomers(response.data);
                setFilteredCustomers(response.data); // Initially set filtered data to all customers
            })
            .catch(error => console.error("Error fetching customers:", error));
    }, []);

    // Handle search functionality
    const handleSearch = () => {
        const filtered = customers.filter((customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.mobile.includes(searchTerm)
        );
        setFilteredCustomers(filtered);
    };

    // Print function
    const handlePrint = () => {
        const printContent = tableRef.current.innerHTML;
        const newWindow = window.open('', '', 'width=800,height=600');
        newWindow.document.writeln('<html><head><title>Print</title>');
        newWindow.document.writeln('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; }</style>');
        newWindow.document.writeln('</head><body>');
        newWindow.document.writeln(printContent);
        newWindow.document.writeln('</body></html>');
        newWindow.document.close();
        newWindow.print();
    };
    return (
        <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className='text-3xl font-bold my-5 text-gray-800'>Customer Details</h1>

            {/* Search and Print Buttons */}
            <div className="flex w-full max-w-2xl items-center gap-2 mb-5">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Name or Mobile"
                    className='w-full rounded-xl text-lg bg-gray-200 p-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch} className="rounded-xl bg-blue-400 text-white text-2xl p-3 hover:bg-blue-500">
                    <IoSearchSharp />
                </button>
                <button onClick={handlePrint} className="rounded-xl bg-green-400 text-black text-2xl p-3 hover:bg-green-500">
                    <MdLocalPrintshop />
                </button>
            </div>

            {/* Customer Table */}
            <div className="w-full max-w-4xl overflow-x-auto" ref={tableRef}>
                <table className='w-full bg-white shadow-md rounded-xl overflow-hidden'>
                    <thead className='bg-blue-400 text-white'>
                        <tr>
                            <th className='py-3 px-4 text-left'>Id No</th>
                            <th className='py-3 px-4 text-left'>Name</th>
                            <th className='py-3 px-4 text-left'>Mobile No</th>
                            <th className='py-3 px-4 text-left'>Loan Date</th>
                            <th className='py-3 px-4 text-left'>Loan Amount</th>
                            <th className='py-3 px-4 text-left'>Status</th>
                            <th className='py-3 px-10 text-left'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer, index) => (
                                <tr className='border-b hover:bg-gray-100 text-center' key={customer._id}>
                                    <td className='py-3 px-4'>{String(index + 1).padStart(2, '0')}</td>
                                    <td className='py-3 px-4 capitalize'>{customer.name}</td>
                                    <td className='py-3 px-4'>{customer.mobile}</td>
                                    <td className='py-3 px-4'>{customer.loanDate}</td>
                                    <td className='py-3 px-4'>₹ {customer.loanAmount}</td>
                                    <td className='py-3 px-4'>{customer.status}</td>
                                    <td className='py-3 px-4'>
                                        <Link to={`/customer/${customer._id}`} className="bg-blue-400 text-white px-3 py-1 rounded-lg hover:bg-blue-600">VIEW</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-gray-500">No customers found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Back Button */}
            <Link to="/home" className="bg-gray-500 text-white px-5 py-3 my-4 text-2xl rounded-lg shadow-md hover:bg-gray-600">
                                <MdBackspace />
                            </Link>
        </div>
    );
}

export default CustomerDetail;

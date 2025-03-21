import React, { useEffect, useState } from 'react';
import { MdBackspace } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaRegSave } from "react-icons/fa";
import axios from 'axios';

function UpdateCustomer() {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate(); // Used for navigation
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/customer/${id}`)
            .then(response => setCustomer(response.data))
            .catch(error => console.error("Error fetching customer:", error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        axios.put(`http://localhost:3001/updatecustomer/${id}`, customer)
            .then(() => {
                console.log("Customer updated successfully");
                navigate(`/customer/${id}`); // Redirect to View Customer page
            })
            .catch(error => console.error("Error updating customer:", error));
    };

    if (!customer) return <p>Loading...</p>;

    return (
        <div className="flex flex-col items-center p-5 bg-gray-100 shadow-gray-600 shadow-lg">
            <h1 className='text-3xl font-bold my-5 text-gray-800'>Update Customer</h1>
            
            <div className="bg-white p-5 rounded-xl shadow-md w-full max-w-lg">
                <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">{customer.name}</h3>
                
                <div className="space-y-3 text-gray-700 m-5">
                    <label>Customer Name:
                        <input type="text" name="name" value={customer.name} onChange={handleChange} className="w-full p-2 border rounded" />
                    </label>
                    <label>Address:
                        <input type="text" name="address" value={customer.address} onChange={handleChange} className="w-full p-2 border rounded" />
                    </label>
                    <label>Mobile:
                        <input type="text" name="mobile" value={customer.mobile} onChange={handleChange} className="w-full p-2 border rounded" />
                    </label>
                    <label>Loan Date:
                        <input type="date" name="loanDate" value={customer.loanDate} onChange={handleChange} className="w-full p-2 border rounded" />
                    </label>
                    <label>Item Weight:
                        <input type="text" name="itemWeight" value={customer.itemWeight} onChange={handleChange} className="w-full p-2 border rounded" />
                    </label>
                    <label>Status:
                        <select name="status" value={customer.status} onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </label>
                    <label>Interest Rate:
                        <input type="text" name="interestRate" value={customer.interestRate} onChange={handleChange} className="w-full p-2 border rounded" />
                    </label>
                    <label>Loan Amount:
                        <input type="text" name="loanAmount" value={customer.loanAmount} onChange={handleChange} className="w-full p-2 border rounded" />
                    </label>
                </div>
            </div>

            <div className="flex gap-4 mt-5">
                <Link to={`/customer/${id}`} className="bg-gray-500 text-white px-5 py-3 text-2xl rounded-lg shadow-md hover:bg-gray-600"><MdBackspace /></Link>
                <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-3 text-xl rounded-lg shadow-md font-[500] hover:bg-blue-600">save</button>
            </div>
        </div>
    );
}

export default UpdateCustomer;

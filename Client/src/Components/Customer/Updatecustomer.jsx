import React, { useEffect, useState } from 'react';
import { MdBackspace } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegSave } from "react-icons/fa";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function UpdateCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`https://omsai-goldloan.onrender.com/customer/${id}`)
      .then(response => setCustomer(response.data))
      .catch(error => {
        console.error("Error fetching customer:", error);
        toast.error("Failed to load customer data.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!customer) return;
    setLoading(true);

    axios.put(`https://omsai-goldloan.onrender.com/updatecustomer/${id}`, customer)
      .then(() => {
        setLoading(false);
        toast.success("Customer updated successfully!");
        setTimeout(() => navigate(`/customer/${id}`), 1500);
      })
      .catch(error => {
        setLoading(false);
        console.error("Error updating customer:", error);
        toast.error("Failed to update customer.");
      });
  };

  if (!customer) return <p className="text-center mt-10 text-lg text-gray-600">Loading customer data...</p>;

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
          <label>Completed Date:
            <input type="date" name="status" value={customer.status} onChange={handleChange} className="w-full p-2 border rounded text-red-500" />
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
        <Link to={`/customer/${id}`} className="bg-gray-500 text-white px-5 py-3 text-2xl rounded-lg shadow-md hover:bg-gray-600">
          <MdBackspace />
        </Link>
        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-3 text-xl rounded-lg font-medium shadow-md transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <FaRegSave /> {loading ? "Saving..." : "Save"}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default UpdateCustomer;

import React, { useEffect, useState } from 'react';
import { MdBackspace } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineSaveAlt } from "react-icons/md";
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 md:px-0">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Customer</h1>

      <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">{customer.name}</h2>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Customer Name</label>
            <input type="text" name="name" value={customer.name} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input type="text" name="address" value={customer.address} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Mobile</label>
            <input type="text" name="mobile" value={customer.mobile} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Loan Date</label>
            <input type="date" name="loanDate" value={customer.loanDate} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Item Weight</label>
            <input type="text" name="itemWeight" value={customer.itemWeight} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-red-600">Completed Date</label>
            <input type="date" name="status" value={customer.status} onChange={handleChange} className="w-full p-2 border rounded-lg text-red-600" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Interest Rate</label>
            <input type="text" name="interestRate" value={customer.interestRate} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Loan Amount</label>
            <input type="text" name="loanAmount" value={customer.loanAmount} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Link to={`/customer/${id}`} className="bg-gray-500 gap-2 font-semibold text-white text-lg px-5 py-3 rounded-xl shadow hover:bg-gray-600  flex items-center justify-center">
          <MdBackspace /> Back
        </Link>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`flex items-center gap-2 px-5 py-3 text-lg rounded-xl font-semibold shadow transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <MdOutlineSaveAlt /> {loading ? "Saving..." : "Save"}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default UpdateCustomer;

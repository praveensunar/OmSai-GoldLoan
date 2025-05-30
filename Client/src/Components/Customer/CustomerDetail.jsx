import React, { useEffect, useRef, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { MdLocalPrintshop, MdBackspace } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerDetail() {
  const tableRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://omsai-goldloan.onrender.com/customerdetail')
      .then((response) => {
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      })
      .catch((error) => console.error('Error fetching customers:', error));
  }, []);

  const handleSearch = () => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.mobile.includes(searchTerm)
    );
    setFilteredCustomers(filtered);
  };

  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML;
    const newWindow = window.open('', '', 'width=800,height=600');
    newWindow.document.writeln('<html><head><title>Print</title>');
    newWindow.document.writeln(
      '<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; }</style>'
    );
    newWindow.document.writeln('</head><body>');
    newWindow.document.writeln(printContent);
    newWindow.document.writeln('</body></html>');
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold my-5 text-gray-800">Customer Details</h1>

      {/* Buttons */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-4 gap-2">
        {/* Back + Print for mobile */}
        <div className="md:hidden flex gap-2">
          <Link
            to="/home"
            className="w-11 h-11 flex items-center justify-center bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
          >
            <MdBackspace className="text-xl" />
          </Link>
          <button
            onClick={handlePrint}
            className="w-11 h-11 flex items-center justify-center bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            <MdLocalPrintshop className="text-xl" />
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name or Mobile"
            className="w-full rounded-xl text-lg bg-gray-200 p-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="rounded-xl bg-yellow-200 text-black text-2xl p-3 hover:bg-yellow-600"
          >
            <IoSearchSharp />
          </button>
        </div>

        {/* Back + Print for desktop */}
        <div className="hidden md:flex gap-2">
          <Link
            to="/home"
            className="w-11 h-11 flex items-center justify-center bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
          >
            <MdBackspace className="text-xl" />
          </Link>
          <button
            onClick={handlePrint}
            className="w-11 h-11 flex items-center justify-center bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            <MdLocalPrintshop className="text-xl" />
          </button>
        </div>
      </div>

      {/* Customer Table (desktop only) */}
      <div
        ref={tableRef}
        className="hidden md:block w-full max-w-5xl overflow-x-auto print:block"
      >
        <table className="w-full bg-yellow-50 shadow-md rounded-xl overflow-hidden">
          <thead className="bg-yellow-100 text-yellow-700">
            <tr>
              <th className="py-3 px-4 text-left">Id No</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Mobile No</th>
              <th className="py-3 px-4 text-left">Loan Date</th>
              <th className="py-3 px-4 text-left">Loan Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <tr
                  key={customer._id}
                  onClick={() => navigate(`/customer/${customer._id}`)}
                  className="border-b hover:bg-gray-100 text-center cursor-pointer"
                >
                  <td className="py-3 px-4">{String(index + 1).padStart(2, '0')}</td>
                  <td className="py-3 px-4 capitalize text-left">{customer.name}</td>
                  <td className="py-3 px-4">{customer.mobile}</td>
                  <td className="py-3 px-4 text-left">{customer.loanDate}</td>
                  <td className="py-3 px-4 text-center">₹ {customer.loanAmount}</td>
                  <td
                    className={
                      !isNaN(Date.parse(customer.status))
                        ? 'text-red-500 font-[500]'
                        : customer.status.toLowerCase() === 'active'
                        ? 'text-green-600 font-[600]'
                        : 'font-[500]'
                    }
                  >
                    {customer.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards - hidden on print */}
      <div className="md:hidden space-y-4 print:hidden">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer, index) => (
            <div
              key={customer._id}
              onClick={() => navigate(`/customer/${customer._id}`)}
              className="bg-yellow-50 rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            >
              <p>
                <span className="font-semibold text-gray-600">Id No:</span>{' '}
                {String(index + 1).padStart(2, '0')}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Name:</span>{' '}
                {customer.name}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Mobile:</span>{' '}
                {customer.mobile}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Loan Date:</span>{' '}
                {customer.loanDate}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Loan Amount:</span>{' '}
                ₹ {customer.loanAmount}
              </p>
              <p>
                <span className="font-semibold text-gray-600">Status:</span>{' '}
                <span
                  className={
                    !isNaN(Date.parse(customer.status))
                      ? 'text-red-500 font-[500]'
                      : customer.status.toLowerCase() === 'active'
                      ? 'text-green-600 font-[600]'
                      : 'font-[500]'
                  }
                >
                  {customer.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No customers found.</p>
        )}
      </div>
    </div>
  );
}

export default CustomerDetail;

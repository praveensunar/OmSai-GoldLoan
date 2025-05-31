import React, { useEffect, useState } from 'react';
import { MdBackspace } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoanAmount() {
  const [totals, setTotals] = useState({
    activeLoan: 0,
    closedLoan: 0,
    recoveredInterest: 0,
  });

  useEffect(() => {
    axios
      .get('https://omsai-goldloan.onrender.com/customerdetail')
      .then((response) => {
        calculateTotals(response.data);
      })
      .catch((error) => console.error('Error fetching loan data:', error));
  }, []);

  const calculateTotals = (customers) => {
    let activeLoan = 0;
    let closedLoan = 0;
    let recoveredInterest = 0;

    customers.forEach((customer) => {
      const amount = parseFloat(customer.loanAmount) || 0;
      const status = customer.status?.toLowerCase() || '';
      const interestRate = parseFloat(customer.interestRate) / 100 || 0;

      if (status === 'active') {
        activeLoan += amount;
      } else if (!isNaN(Date.parse(customer.status))) {
        // Closed loan case
        closedLoan += amount;

        let loanDate = new Date(customer.loanDate);
        let closeDate = new Date(customer.status);

        if (!isNaN(loanDate.getTime()) && !isNaN(closeDate.getTime())) {
          const diffTime = closeDate - loanDate;
          const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          const fullMonths = Math.floor(totalDays / 30);
          const hasRemainingDays = totalDays % 30 > 0;

          const months = fullMonths + (hasRemainingDays ? 1 : 0);
          const interest = amount * interestRate * months;

          recoveredInterest += interest;
        }
      }
    });

    setTotals({
      activeLoan,
      closedLoan,
      recoveredInterest: parseFloat(recoveredInterest.toFixed(2)),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <GiReceiveMoney /> Loan Summary
      </h1>

      <div className="w-full max-w-3xl grid gap-6 grid-cols-1 md:grid-cols-3 text-white">
        <div className="bg-green-400 rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Active Loan Amount</h2>
          <p className="text-2xl font-bold">₹ {totals.activeLoan.toLocaleString()}</p>
        </div>
        <div className="bg-blue-400 rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Closed Loan Amount</h2>
          <p className="text-2xl font-bold">₹ {totals.closedLoan.toLocaleString()}</p>
        </div>
        <div className="bg-yellow-400 rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Recovered Interest</h2>
          <p className="text-2xl font-bold">₹ {totals.recoveredInterest.toLocaleString()}</p>
        </div>
      </div>

      <Link
        to="/home"
        className="mt-10 flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition"
      >
        <MdBackspace /> Back to Home
      </Link>
    </div>
  );
}

export default LoanAmount;

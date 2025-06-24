import { useEffect, useState } from 'react';
import { MdBackspace, MdTrendingUp, MdAccountBalance, MdAttachMoney } from 'react-icons/md';
import { GiReceiveMoney, GiGoldBar, GiTwoCoins } from 'react-icons/gi';
import { FaChartLine, FaUsers, FaSpinner, FaCalendarAlt, FaPercentage } from 'react-icons/fa';
import { BiMoney } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
// Removed navigation hooks to prevent alert conflicts
import { BackToHome } from '../../components/common/BackButton';

function LoanAmount() {
  const [totals, setTotals] = useState({
    activeLoan: 0,
    closedLoan: 0,
    recoveredInterest: 0,
  });
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    completedLoans: 0,
    averageLoanAmount: 0,
    totalLoanAmount: 0
  });
  const { resetAutoLogout } = useAuth();

  useEffect(() => {
    fetchLoanData();
  }, []);

  const fetchLoanData = async (retryCount = 0) => {
    try {
      setLoading(true);
      resetAutoLogout();
      console.log(`Fetching loan data, attempt ${retryCount + 1}`);

      const response = await axios.get('/api/customerdetail', {
        timeout: 10000 // 10 second timeout
      });
      setCustomers(response.data);
      calculateTotals(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching loan data:', error);

      // Check if it's a network error and retry
      if ((error.code === 'ERR_NETWORK' || error.code === 'ERR_INSUFFICIENT_RESOURCES') && retryCount < 2) {
        console.log(`Network error, retrying in 2 seconds... (attempt ${retryCount + 2})`);
        setTimeout(() => fetchLoanData(retryCount + 1), 2000);
        return;
      } else {
        toast.error('Failed to fetch loan data. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

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

  const calculateStats = (customers) => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status?.toLowerCase() === 'active').length;
    const completedLoans = customers.filter(c => !isNaN(Date.parse(c.status))).length;
    const totalLoanAmount = customers.reduce((sum, c) => sum + (parseFloat(c.loanAmount) || 0), 0);
    const averageLoanAmount = totalCustomers > 0 ? totalLoanAmount / totalCustomers : 0;

    setStats({
      totalCustomers,
      activeCustomers,
      completedLoans,
      averageLoanAmount: parseFloat(averageLoanAmount.toFixed(2)),
      totalLoanAmount
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-[#9C8E6B] mx-auto mb-4" />
          <p className="text-gray-600 text-xl">Loading loan data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="text-6xl text-[#9C8E6B] animate-float">
              <FaChartLine />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Loan Analytics Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive overview of loan portfolio performance and financial metrics
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white shadow-2xl card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl opacity-80">
                <MdTrendingUp />
              </div>
              <div className="text-right">
                <p className="text-green-100 text-sm font-medium">ACTIVE LOANS</p>
                <p className="text-3xl font-bold">₹{totals.activeLoan.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <GiGoldBar className="text-lg" />
              <span className="text-sm">Currently outstanding</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl opacity-80">
                <MdAccountBalance />
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm font-medium">CLOSED LOANS</p>
                <p className="text-3xl font-bold">₹{totals.closedLoan.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <FaCalendarAlt className="text-lg" />
              <span className="text-sm">Successfully completed</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl p-8 text-white shadow-2xl card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl opacity-80">
                <FaPercentage />
              </div>
              <div className="text-right">
                <p className="text-yellow-100 text-sm font-medium">INTEREST EARNED</p>
                <p className="text-3xl font-bold">₹{totals.recoveredInterest.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-100">
              <BiMoney className="text-lg" />
              <span className="text-sm">Total revenue generated</span>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 animate-slide-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Portfolio Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl text-[#9C8E6B] mb-2">
                <FaUsers />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.totalCustomers}</div>
              <div className="text-sm text-gray-600">Total Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-green-500 mb-2">
                <GiReceiveMoney />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.activeCustomers}</div>
              <div className="text-sm text-gray-600">Active Loans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-blue-500 mb-2">
                <GiTwoCoins />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.completedLoans}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-purple-500 mb-2">
                <MdAttachMoney />
              </div>
              <div className="text-2xl font-bold text-gray-800">₹{stats.averageLoanAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Avg Loan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-orange-500 mb-2">
                <GiGoldBar />
              </div>
              <div className="text-2xl font-bold text-gray-800">₹{stats.totalLoanAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Volume</div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Financial Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">Total Portfolio Value</span>
                <span className="text-xl font-bold text-[#9C8E6B]">
                  ₹{(totals.activeLoan + totals.closedLoan).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">Revenue Generated</span>
                <span className="text-xl font-bold text-green-600">
                  ₹{totals.recoveredInterest.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">Active vs Closed Ratio</span>
                <span className="text-xl font-bold text-blue-600">
                  {totals.closedLoan > 0 ? ((totals.activeLoan / totals.closedLoan) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl">
                <h4 className="font-bold text-green-800">Strong Portfolio</h4>
                <p className="text-green-700 text-sm">
                  {stats.activeCustomers} active loans generating steady revenue
                </p>
              </div>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
                <h4 className="font-bold text-blue-800">Completion Rate</h4>
                <p className="text-blue-700 text-sm">
                  {stats.totalCustomers > 0 ? ((stats.completedLoans / stats.totalCustomers) * 100).toFixed(1) : 0}% of loans successfully completed
                </p>
              </div>
              <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl">
                <h4 className="font-bold text-purple-800">Average Loan Size</h4>
                <p className="text-purple-700 text-sm">
                  ₹{stats.averageLoanAmount.toLocaleString()} per customer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <BackToHome
            size="large"
            className="inline-flex"
          />
        </div>
      </div>
    </div>
  );
}

export default LoanAmount;

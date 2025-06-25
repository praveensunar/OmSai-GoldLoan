import { useEffect, useRef, useState } from 'react';
import { IoSearchSharp, IoPersonSharp, IoCalendarSharp } from 'react-icons/io5';
import { MdLocalPrintshop, MdVisibility, MdAttachMoney, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaUsers, FaSpinner, FaFilter } from 'react-icons/fa';
import { BiSortAlt2 } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation, useBrowserBackButton } from '../../hooks/useNavigation';
import { BackToHome } from '../common/BackButton';
import { checkServerStatus } from '../../utils/serverCheck';

function CustomerDetail() {
  const tableRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();
  const { resetAutoLogout } = useAuth();
  const { goBack } = useNavigation();

  // Handle browser back button
  useBrowserBackButton(false, () => {
    goBack();
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      resetAutoLogout();
      console.log('Fetching customers...');

      const response = await axios.get('/api/customerdetail', {
        timeout: 15000 // 15 second timeout
      });

      // Ensure response.data is an array
      const customerData = Array.isArray(response.data) ? response.data : [];
      console.log('Customer data received:', customerData);

      setCustomers(customerData);
      setFilteredCustomers(customerData);
    } catch (error) {
      console.error('Error fetching customers:', error);

      // Handle errors without continuous popups
      if (error.code === 'ERR_NETWORK' || error.code === 'ERR_INSUFFICIENT_RESOURCES') {
        console.log('Network error - server might be down');
        // Don't show toast for network errors to avoid spam
      } else if (error.code === 'ECONNABORTED') {
        toast.error('Request timed out. Please try again.');
      } else {
        toast.error('Failed to fetch customers. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort customers
  useEffect(() => {
    let filtered = customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.mobile.includes(searchTerm) ||
        customer.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = (() => {
        if (statusFilter === 'all') return true;

        const effectiveStatus = getEffectiveStatus(customer);
        const isLoanClosed = !isNaN(Date.parse(effectiveStatus));

        switch (statusFilter) {
          case 'active':
            return effectiveStatus.toLowerCase() === 'active';
          case 'pending':
            return effectiveStatus.toLowerCase() === 'pending';
          case 'closed':
            return isLoanClosed;
          default:
            return effectiveStatus.toLowerCase() === statusFilter.toLowerCase();
        }
      })();

      return matchesSearch && matchesStatus;
    });

    // Sort customers
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'loanAmount') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else if (sortBy === 'loanDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = aValue?.toString().toLowerCase() || '';
        bValue = bValue?.toString().toLowerCase() || '';
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, statusFilter, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Calculate effective status based on loan age
  const getEffectiveStatus = (customer) => {
    const loanDate = new Date(customer.loanDate);
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // If loan is closed (status is a date), return the original status
    if (!isNaN(Date.parse(customer.status))) {
      return customer.status;
    }

    // If loan is older than 6 months and not closed, set to pending
    if (loanDate < sixMonthsAgo && customer.status.toLowerCase() !== 'pending') {
      return 'Pending';
    }

    return customer.status;
  };

  const getStatusColor = (status) => {
    const effectiveStatus = typeof status === 'object' ? getEffectiveStatus(status) : status;

    switch (effectiveStatus.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      default:
        if (!isNaN(Date.parse(effectiveStatus))) {
          return 'text-blue-600 bg-blue-100'; // Changed from red to blue for closed loans
        }
        return 'text-gray-600 bg-gray-100';
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-[#9C8E6B] mx-auto mb-4" />
          <p className="text-gray-600 text-xl">Loading customers...</p>
          <p className="text-gray-500 text-sm mt-2">This may take a moment if the server is starting up</p>
        </div>
      </div>
    );
  }

  // Show error state if no customers loaded and not loading
  if (!loading && customers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md mx-auto p-8">
          <FaUsers className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Customers</h2>
          <p className="text-gray-600 text-lg mb-6">
            We're having trouble connecting to the server. This might be because:
          </p>
          <ul className="text-left text-gray-600 mb-6 space-y-2">
            <li>• The server is starting up (this can take a few minutes)</li>
            <li>• Your internet connection is unstable</li>
            <li>• The server is temporarily unavailable</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={async () => {
                const result = await checkServerStatus();
                if (result.status === 'online') {
                  fetchCustomers();
                } else {
                  toast.error(result.message);
                }
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Check Server & Retry
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Refresh Page
            </button>
            <Link
              to="/home"
              className="px-6 py-3 bg-[#9C8E6B] text-white rounded-lg hover:bg-[#8B7D5A] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="text-6xl text-[#9C8E6B] animate-float">
              <FaUsers />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Customer Management</h1>
          <p className="text-gray-600 text-lg">View and manage all customer records</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8 animate-slide-up">
          {/* Search Section */}
          <div className="mb-4">
            <div className="relative">
              <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, mobile, or address..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Filter Controls */}
            <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 flex-1">
              {/* Status Filter */}
              <div className="flex items-center gap-2 min-w-0">
                <FaFilter className="text-gray-500 hidden xs:block" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 xs:flex-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-2 min-w-0">
                <BiSortAlt2 className="text-gray-500 hidden xs:block" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 xs:flex-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent text-sm"
                >
                  <option value="name">Sort by Name</option>
                  <option value="loanDate">Sort by Date</option>
                  <option value="loanAmount">Sort by Amount</option>
                  <option value="status">Sort by Status</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300 text-sm"
                  title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
              <button
                onClick={handlePrint}
                className="hidden lg:flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 text-sm"
              >
                <MdLocalPrintshop />
                <span className="hidden xs:inline">Print</span>
              </button>

              <BackToHome
                size="small"
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{customers.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Customers</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                {customers.filter(c => getEffectiveStatus(c).toLowerCase() === 'active').length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Active Loans</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-yellow-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-yellow-600">
                {customers.filter(c => getEffectiveStatus(c).toLowerCase() === 'pending').length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Pending (6+ months)</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg col-span-2 lg:col-span-1">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">
                ₹{customers.reduce((sum, c) => sum + (parseFloat(c.loanAmount) || 0), 0).toLocaleString()}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Total Amount</div>
            </div>
          </div>
        </div>

        {/* Customer Table - Desktop Only */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden animate-slide-up">
          <div ref={tableRef} className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 hover:text-[#ffd700] transition-colors"
                    >
                      <IoPersonSharp />
                      Customer
                      {sortBy === 'name' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </button>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">
                    <div className="flex items-center gap-2">
                      <MdPhone />
                      Contact
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">
                    <button
                      onClick={() => handleSort('loanDate')}
                      className="flex items-center gap-2 hover:text-[#ffd700] transition-colors"
                    >
                      <IoCalendarSharp />
                      Loan Date
                      {sortBy === 'loanDate' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </button>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">
                    <button
                      onClick={() => handleSort('loanAmount')}
                      className="flex items-center gap-2 hover:text-[#ffd700] transition-colors"
                    >
                      <MdAttachMoney />
                      Amount
                      {sortBy === 'loanAmount' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </button>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">
                    <button
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-2 hover:text-[#ffd700] transition-colors"
                    >
                      Status
                      {sortBy === 'status' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </button>
                  </th>
                  <th className="py-4 px-6 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer, index) => (
                    <tr
                      key={customer._id}
                      className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                      onClick={() => navigate(`/customer/${customer._id}`)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#9C8E6B] text-white rounded-full flex items-center justify-center font-semibold">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 capitalize">{customer.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <MdLocationOn className="text-xs" />
                              {customer.address?.substring(0, 30)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900 font-medium">{customer.mobile}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900">{new Date(customer.loanDate).toLocaleDateString()}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-900 font-semibold">₹{parseFloat(customer.loanAmount).toLocaleString()}</div>
                      </td>
                      <td className="py-4 px-6">
                        {(() => {
                          const effectiveStatus = getEffectiveStatus(customer);
                          const isOlderThan6Months = (() => {
                            const loanDate = new Date(customer.loanDate);
                            const sixMonthsAgo = new Date();
                            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                            return loanDate < sixMonthsAgo && !isNaN(Date.parse(customer.status)) === false;
                          })();

                          return (
                            <div className="flex flex-col gap-1">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(customer)}`}>
                                {!isNaN(Date.parse(effectiveStatus))
                                  ? `Closed ${new Date(effectiveStatus).toLocaleDateString()}`
                                  : effectiveStatus
                                }
                              </span>
                              {isOlderThan6Months && effectiveStatus.toLowerCase() === 'pending' && (
                                <span className="text-xs text-orange-600 font-medium">
                                  (6+ months old)
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/customer/${customer._id}`);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <MdVisibility />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-12 text-center">
                      <div className="text-gray-500">
                        <FaUsers className="mx-auto text-4xl mb-4 opacity-50" />
                        <p className="text-lg">No customers found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Cards - Responsive View */}
        <div className="lg:hidden space-y-4">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer, index) => (
              <div
                key={customer._id}
                onClick={() => navigate(`/customer/${customer._id}`)}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#9C8E6B] text-white rounded-full flex items-center justify-center font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 capitalize">{customer.name}</h3>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MdPhone className="text-sm" />
                        {customer.mobile}
                      </p>
                    </div>
                  </div>
                  {(() => {
                    const effectiveStatus = getEffectiveStatus(customer);
                    const isOlderThan6Months = (() => {
                      const loanDate = new Date(customer.loanDate);
                      const sixMonthsAgo = new Date();
                      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                      return loanDate < sixMonthsAgo && !isNaN(Date.parse(customer.status)) === false;
                    })();

                    return (
                      <div className="flex flex-col items-end gap-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(customer)}`}>
                          {!isNaN(Date.parse(effectiveStatus))
                            ? `Closed ${new Date(effectiveStatus).toLocaleDateString()}`
                            : effectiveStatus
                          }
                        </span>
                        {isOlderThan6Months && effectiveStatus.toLowerCase() === 'pending' && (
                          <span className="text-xs text-orange-600 font-medium">
                            (6+ months old)
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Loan Date</p>
                    <p className="font-semibold">{new Date(customer.loanDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Loan Amount</p>
                    <p className="font-semibold text-[#9C8E6B]">₹{parseFloat(customer.loanAmount).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-500 text-sm mb-1">Address</p>
                  <p className="text-gray-700 text-sm">{customer.address}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/customer/${customer._id}`);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <MdVisibility />
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <FaUsers className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-xl text-gray-500 mb-2">No customers found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;

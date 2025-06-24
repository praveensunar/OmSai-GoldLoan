import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./Components/Home/Home";
import Landing from "./Landing";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Addcustomer from "./Components/Customer/Addcustomer";
import CustomerDetail from "./Components/Customer/CustomerDetail";
import Viewcustomer from "./Components/Customer/Viewcustomer";
import UpdateCustomer from "./Components/Customer/Updatecustomer";
import Signup from "./Components/Signup/Signup";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import LoanAmount from "./Components/Customer/LoanAmount";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Full height wrapper with proper viewport handling */}
        <div className="min-h-screen flex flex-col bg-gray-50">
          {/* Navbar stays at top with fixed positioning for landing page */}
          <Navbar />

          {/* Main content grows to fill space with proper overflow handling and navbar spacing */}
          <main className="flex-grow relative overflow-hidden pt-16 sm:pt-20">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/service" element={<Service />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Routes */}
              <Route path="/home" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/addcustomer" element={
                <ProtectedRoute>
                  <Addcustomer />
                </ProtectedRoute>
              } />
              <Route path="/customerdetail" element={
                <ProtectedRoute>
                  <CustomerDetail />
                </ProtectedRoute>
              } />
              <Route path="/customer/:id" element={
                <ProtectedRoute>
                  <Viewcustomer />
                </ProtectedRoute>
              } />
              <Route path="/updatecustomer/:id" element={
                <ProtectedRoute>
                  <UpdateCustomer />
                </ProtectedRoute>
              } />
              <Route path="/loanamount" element={
                <ProtectedRoute>
                  <LoanAmount />
                </ProtectedRoute>
              } />
            </Routes>
          </main>

          {/* Footer sticks to bottom if content is short */}
          <Footer />
        </div>

        {/* Global Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

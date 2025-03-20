import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Landing from "./Landing";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Addcustomer from "./Components/Customer/Addcustomer";
import CustomerDetail from "./Components/Customer/CustomerDetail";
import Viewcustomer from "./Components/Customer/Viewcustomer";
import UpdateCustomer from "./Components/Customer/Updatecustomer";
import Signup from "./Components/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar stays visible on all pages */}
      <Navbar />
      <Routes>
        <Route path="/register" element={<Signup />} />
        
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addcustomer" element={<Addcustomer />} />
        <Route path="/customerdetail" element={<CustomerDetail />} />
        <Route path="/customer/:id" element={<Viewcustomer />} />
        <Route path="/updatecustomer/:id" element={<UpdateCustomer />} />
      </Routes>

      {/* Footer stays visible on all pages */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;

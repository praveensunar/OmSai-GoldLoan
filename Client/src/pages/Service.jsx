import React from 'react'
import { Link } from 'react-router-dom';


function Service() {
 
  return (
    <div className="bg-white text-gray-800 py-10 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center">
          Our Services – Omsai GoldLoan & Jeweller's
        </h1>

        <p className="text-lg text-gray-700 text-center mb-10 max-w-3xl mx-auto">
          At <span className="text-yellow-700 font-semibold">Omsai</span>, we are proud to offer a combination of trusted gold loan services and fine jewellery craftsmanship. Explore the services we provide through our two verticals – <span className="font-medium">Omsai GoldLoan</span> and <span className="font-medium">Omsai Jeweller's</span>.
        </p>

        {/* Gold Loan Services */}
        <div className="bg-yellow-50 rounded-xl p-6 shadow-md mb-12">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">💰 Omsai GoldLoan Services</h2>
          <p className="text-gray-700 mb-4">
            We offer reliable and secure gold loan services for individuals and businesses in need of quick financial assistance. With minimal paperwork and fast disbursal, Omsai GoldLoan is a trusted name in your financial emergencies.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Instant gold loan approval & disbursal</li>
            <li>Minimum documentation</li>
            <li>Safe & secure storage of gold ornaments</li>
            <li>Transparent interest rates</li>
            <li>Flexible repayment options</li>
            <li>Friendly and professional customer support</li>
          </ul>
        </div>

        {/* Jewellery Services */}
        <div className="bg-yellow-50 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">💎 Omsai Jeweller's Services</h2>
          <p className="text-gray-700 mb-4">
            As a trusted jewellery store, Omsai Jeweller's offers high-quality gold and silver ornaments along with custom design, repair, and manufacturing services. Our commitment to purity and perfection makes us the preferred jeweller for families and generations.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Sale of certified gold & silver jewellery</li>
            <li>Custom jewellery design as per your preference</li>
            <li>Jewellery manufacturing & repair services</li>
            <li>Festive & bridal collections</li>
            <li>916 hallmarked gold, 20-carat gold, and 999 pure silver</li>
            <li>Affordable making charges and fair pricing</li>
          </ul>
        </div>

        {/* Optional Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold text-yellow-700 mb-2">Visit Us Today!</h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-4">
            Whether you're looking for a trustworthy gold loan provider or a beautiful piece of jewellery for a special occasion, Omsai is here to help.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};




export default Service
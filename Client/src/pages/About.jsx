import React from 'react';

const About = () => {
  return (
    <div className="bg-white text-gray-800 py-10 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center">
          About Us – GodLoan & Omsai Jeweller's
        </h1>

        <p className="text-lg text-gray-700 text-center mb-10 max-w-3xl mx-auto">
          Welcome to <span className="text-yellow-700 font-semibold">GodLoan & Omsai Jeweller's</span>, your trusted partner for secure gold loan services and premium gold and silver jewellery. With years of commitment, we serve as both a reliable financial support system and a beloved neighbourhood jeweller under one roof.
        </p>

        {/* Two-column section */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Gold Loan Section */}
          <div>
            <img
              src="https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/gold-loan-emi-cal/benefits.png"
              alt="Gold Loan Services"
              className="rounded-xl shadow-md w-full h-auto mb-4"
            />
            <h2 className="text-2xl font-semibold text-yellow-700 mb-3">Gold Loan Services</h2>
            <p className="text-gray-700 mb-4">
              Our gold loan services offer fast, secure, and flexible financial solutions. Whether it's an emergency or business need, you can trust us to provide immediate funds against your gold with transparent interest rates and top-notch safety.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 pb-4">
              <li>Quick approval & disbursal</li>
              <li>Trusted storage facilities</li>
              <li>Fast & hassle-free gold loan process</li>
              <li>Secure storage with top-notch safety</li>
              <li>Transparent interest rates</li>
              <li>Friendly and professional staff</li>
              <li>Flexible repayment options</li>
            </ul>
            <img
              src="https://i.pinimg.com/736x/58/19/5c/58195ce2c019d401892f1c6f0428b325.jpg"
              alt="Gold Loan Services"
              className="rounded-xl shadow-md w-full h-auto mb-4"
            />
          </div>

          {/* Jewellery Section */}
          <div>
            <img
              src="showcase.png"
              alt="Jewellery Showcase"
              className="rounded-xl shadow-md w-full h-auto mb-4"
            />
            <h2 className="text-2xl font-semibold text-yellow-700 mb-3 pt-4">Omsai Jeweller's</h2>
            <p className="text-gray-700 mb-4">
              At Omsai Jeweller's, we bring you an exclusive collection of gold and silver jewellery that blends tradition with elegance. We offer a full range of services — from design to repair — making us your one-stop destination for all jewellery needs.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Certified gold & silver ornaments</li>
              <li>Custom jewellery design</li>
              <li>Jewellery manufacturing and repair services</li>
              <li>Affordable making charges</li>
              <li>Festive & wedding collections</li>
              <li>Available in 916 hallmarked gold and 999 pure silver</li>
              <li>We provide 20-carat gold options</li>
            </ul>
          </div>
        </div>

        {/* Brand Values Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Our Commitment</h2>
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
            At GodLoan & Omsai Jeweller's, we are driven by integrity, quality, and customer trust. Whether you're seeking financial assistance or shopping for timeless jewellery, we are here to serve you with excellence.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {["Trust", "Transparency", "Craftsmanship", "Security", "Customer First", "Tradition"].map((value) => (
              <div
                key={value}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-medium text-yellow-800">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

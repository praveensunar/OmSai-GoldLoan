import React from 'react';

const Contact = () => {
  return (
    <div className="bg-white text-gray-800 py-10 px-4 sm:px-6 lg:px-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-yellow-700 mb-6">Contact Us</h1>

        <div className="mb-8">
          <p className="text-base md:text-sm font-medium">
            <span className="font-semibold">Email:</span> omsaijewellers7773@gmail.com
          </p>
          <p className="text-base md:text-sm font-medium">
            <span className="font-semibold">Phone:</span> 9900828269
          </p>
          <p className="text-base md:text-sm font-medium max-w-lg mx-auto mt-2">
            <span className="font-semibold">Address:</span> NEAR S.S.PATIL Function Hall Complex, Manna-E-Khelli Main Road, KAMTHANA, TQ. DIST-BIDAR 585226
          </p>
        </div>

        {/* Optional contact form UI */}
        <div className="bg-yellow-50 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-yellow-700 mb-4">Send us a message</h2>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-yellow-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-yellow-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full border border-yellow-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

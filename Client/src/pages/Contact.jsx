import { FaPhone, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaPaperPlane } from 'react-icons/fa';
import { MdLocationOn, MdEmail, MdPhone, MdAccessTime } from 'react-icons/md';
import { GiGoldBar } from 'react-icons/gi';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="text-6xl text-[#ffd700] animate-float">
              <FaPhone />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Get in <span className="text-[#ffd700]">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            We're here to help you with all your gold loan and jewelry needs.
            Contact us today for personalized service and expert guidance.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-xl text-gray-600">
                  Reach out to us through any of the following channels
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg card-hover">
                  <div className="text-3xl text-[#9C8E6B]">
                    <MdPhone />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
                    <p className="text-gray-600 mb-2">Call us for immediate assistance</p>
                    <a href="tel:+919900828269" className="text-[#9C8E6B] font-semibold hover:text-[#8B7D5A] transition-colors">
                      +91 99008 28269
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg card-hover">
                  <div className="text-3xl text-[#9C8E6B]">
                    <MdEmail />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-600 mb-2">Send us your queries</p>
                    <a href="mailto:omsaijewellers7773@gmail.com" className="text-[#9C8E6B] font-semibold hover:text-[#8B7D5A] transition-colors">
                      omsaijewellers7773@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg card-hover">
                  <div className="text-3xl text-[#9C8E6B]">
                    <MdLocationOn />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Address</h3>
                    <p className="text-gray-600 mb-2">Visit our store</p>
                    <p className="text-gray-700 leading-relaxed">
                      NEAR S.S.PATIL Function Hall Complex,<br />
                      Manna-E-Khelli Main Road, KAMTHANA,<br />
                      TQ. DIST-BIDAR 585226
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg card-hover">
                  <div className="text-3xl text-[#9C8E6B]">
                    <MdAccessTime />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Business Hours</h3>
                    <p className="text-gray-600 mb-2">We're open</p>
                    <div className="text-gray-700">
                      <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                      <p>Sunday: 10:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://wa.me/919900828269" target="_blank" rel="noopener noreferrer" className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                    <FaWhatsapp className="text-xl" />
                  </a>
                  <a href="#" className="p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="#" className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                    <FaFacebook className="text-xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="text-4xl text-[#9C8E6B]">
                    <GiGoldBar />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                <p className="text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300">
                    <option value="">Select a subject</option>
                    <option value="gold-loan">Gold Loan Inquiry</option>
                    <option value="jewelry">Jewelry Purchase</option>
                    <option value="custom-design">Custom Design</option>
                    <option value="repair">Jewelry Repair</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    rows="5"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9C8E6B] focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-hover-effect flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Find Us</h2>
          <p className="text-xl text-gray-600 mb-12">Visit our store for personalized service</p>

          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <FaMapMarkerAlt className="text-6xl mx-auto mb-4" />
              <p className="text-xl">Interactive Map Coming Soon</p>
              <p className="text-sm mt-2">KAMTHANA, TQ. DIST-BIDAR 585226</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import { FaShieldAlt, FaHandshake, FaGem, FaLock, FaUsers, FaCrown, FaCoins, FaAward, FaHeart, FaCheckCircle } from 'react-icons/fa';
import { GiGoldBar, GiDiamondRing, GiTwoCoins } from 'react-icons/gi';
import { MdSecurity, MdVerified, MdStars } from 'react-icons/md';

const About = () => {
  const values = [
    { icon: FaShieldAlt, title: "Trust", description: "Built on decades of reliable service and customer satisfaction" },
    { icon: MdVerified, title: "Transparency", description: "Clear processes and honest dealings in every transaction" },
    { icon: FaGem, title: "Craftsmanship", description: "Exquisite jewelry crafted with precision and artistry" },
    { icon: FaLock, title: "Security", description: "State-of-the-art security for your precious assets" },
    { icon: FaUsers, title: "Customer First", description: "Your needs and satisfaction are our top priority" },
    { icon: FaCrown, title: "Tradition", description: "Honoring traditional values while embracing modern practices" }
  ];

  const features = [
    { icon: FaCheckCircle, text: "Quick approval & disbursal" },
    { icon: MdSecurity, text: "Trusted storage facilities" },
    { icon: FaHandshake, text: "Fast & hassle-free process" },
    { icon: FaShieldAlt, text: "Secure storage with top-notch safety" },
    { icon: MdVerified, text: "Transparent interest rates" },
    { icon: FaUsers, text: "Friendly and professional staff" },
    { icon: FaCoins, text: "Flexible repayment options" },
    { icon: FaAward, text: "Certified gold & silver ornaments" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="text-6xl text-[#ffd700] animate-float">
              <GiGoldBar />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            About <span className="text-[#ffd700]">OmSai Gold Loan</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            Your trusted partner for secure gold loan services and premium gold and silver jewellery.
            With years of commitment, we serve as both a reliable financial support system and a beloved neighbourhood jeweller.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial and jewelry solutions tailored to your needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Gold Loan Services */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 card-hover animate-slide-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl text-[#9C8E6B]">
                  <GiGoldBar />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Gold Loan Services</h3>
              </div>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our gold loan services offer fast, secure, and flexible financial solutions. Whether it's an emergency or business need,
                you can trust us to provide immediate funds against your gold with transparent interest rates and top-notch safety.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.slice(0, 7).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#9C8E6B]/10 transition-colors">
                    <feature.icon className="text-[#9C8E6B] text-lg flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-[#9C8E6B]/10 to-[#ffd700]/10 rounded-2xl">
                <h4 className="font-bold text-gray-800 mb-2">Why Choose Our Gold Loans?</h4>
                <p className="text-gray-600">
                  Competitive interest rates, quick processing, and secure storage facilities make us the preferred choice for gold loans.
                </p>
              </div>
            </div>

            {/* Jewelry Services */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 card-hover animate-slide-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl text-[#9C8E6B]">
                  <GiDiamondRing />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">OmSai Jeweller's</h3>
              </div>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                At OmSai Jeweller's, we bring you an exclusive collection of gold and silver jewellery that blends tradition with elegance.
                We offer a full range of services — from design to repair — making us your one-stop destination for all jewellery needs.
              </p>

              <div className="space-y-4">
                {[
                  "Certified gold & silver ornaments",
                  "Custom jewellery design",
                  "Jewellery manufacturing and repair services",
                  "Affordable making charges",
                  "Festive & wedding collections",
                  "Available in 916 hallmarked gold and 999 pure silver",
                  "We provide 20-carat gold options"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[#9C8E6B]/10 transition-colors">
                    <FaCheckCircle className="text-[#9C8E6B] text-lg flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-[#9C8E6B]/10 to-[#ffd700]/10 rounded-2xl">
                <h4 className="font-bold text-gray-800 mb-2">Craftsmanship Excellence</h4>
                <p className="text-gray-600">
                  Every piece is crafted with precision and care, ensuring the highest quality and lasting beauty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Core Values</h2>
          <p className="text-xl text-gray-200 mb-16 max-w-3xl mx-auto">
            At OmSai Gold Loan, we are driven by integrity, quality, and customer trust. Whether you're seeking financial assistance
            or shopping for timeless jewellery, we are here to serve you with excellence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 card-hover glass-effect"
              >
                <div className="text-4xl text-[#ffd700] mb-4 flex justify-center">
                  <value.icon />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-200 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-[#9C8E6B] mb-2">15+</div>
              <div className="text-gray-600 font-medium">Years of Experience</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-[#9C8E6B] mb-2">10K+</div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-[#9C8E6B] mb-2">₹50Cr+</div>
              <div className="text-gray-600 font-medium">Loans Disbursed</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold text-[#9C8E6B] mb-2">100%</div>
              <div className="text-gray-600 font-medium">Secure Transactions</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="text-6xl text-[#9C8E6B] animate-float">
              <FaHeart />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Experience the <span className="text-[#9C8E6B]">OmSai</span> Difference
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join thousands of satisfied customers who trust us for their gold loan and jewelry needs.
            Experience our commitment to excellence, security, and customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-hover-effect px-8 py-4 bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
              Get Gold Loan
            </button>
            <button className="btn-hover-effect px-8 py-4 bg-white border-2 border-[#9C8E6B] text-[#9C8E6B] rounded-xl text-lg font-semibold hover:bg-[#9C8E6B] hover:text-white hover:scale-105 transition-all duration-300 shadow-lg">
              View Jewelry Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

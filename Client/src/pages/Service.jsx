import { Link } from 'react-router-dom';
import {
  FaShieldAlt,
  FaClock,
  FaHandshake,
  FaTools,
  FaPalette,
  FaHeart,
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import {
  GiGoldBar,
  GiDiamondRing,
  GiTwoCoins,
  GiJewelCrown,
  GiReceiveMoney
} from 'react-icons/gi';
import { MdSecurity, MdVerified, MdStars, MdAttachMoney } from 'react-icons/md';

// Om Sai Logo Component - Same as navbar and home
const OmSaiLogo = ({ className, title = "Om Sai Gold Loan" }) => (
  <svg className={className} viewBox="0 0 140 140" fill="none" role="img" aria-labelledby="omsai-logo-title">
    <title id="omsai-logo-title">{title}</title>

    {/* Main golden circle - matches your logo exactly */}
    <circle
      cx="70"
      cy="70"
      r="60"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.9"
    />

    {/* Decorative arc at top - partial circle */}
    <path
      d="M 25 50 A 45 45 0 0 1 115 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.6"
    />

    {/* Main text "Om Sai" - elegant serif font */}
    <text
      x="70"
      y="65"
      textAnchor="middle"
      fontSize="20"
      fontWeight="600"
      fill="currentColor"
      fontFamily="Georgia, serif"
      opacity="0.95"
    >
      Om Sai
    </text>

    {/* Subtitle "GOLD LOAN" - spaced letters like your logo */}
    <text
      x="70"
      y="85"
      textAnchor="middle"
      fontSize="9"
      fontWeight="400"
      fill="currentColor"
      letterSpacing="3px"
      fontFamily="Arial, sans-serif"
      opacity="0.8"
    >
      GOLD LOAN
    </text>

    {/* Side decorative elements */}
    <circle cx="25" cy="70" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="115" cy="70" r="2" fill="currentColor" opacity="0.6"/>

    {/* Elegant side lines */}
    <line x1="15" y1="70" x2="20" y2="70" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
    <line x1="120" y1="70" x2="125" y2="70" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
  </svg>
);

function Service() {
  const goldLoanServices = [
    {
      icon: FaClock,
      title: "Instant Approval",
      description: "Get your gold loan approved and disbursed within minutes with minimal documentation."
    },
    {
      icon: MdSecurity,
      title: "Secure Storage",
      description: "Your precious gold ornaments are stored in our state-of-the-art secure facilities."
    },
    {
      icon: MdVerified,
      title: "Transparent Rates",
      description: "Clear and competitive interest rates with no hidden charges or fees."
    },
    {
      icon: FaHandshake,
      title: "Flexible Repayment",
      description: "Choose from multiple repayment options that suit your financial situation."
    },
    {
      icon: FaShieldAlt,
      title: "Trusted Service",
      description: "Years of experience and thousands of satisfied customers trust our services."
    },
    {
      icon: GiReceiveMoney,
      title: "Quick Disbursal",
      description: "Receive funds immediately after approval with hassle-free processing."
    }
  ];

  const jewelryServices = [
    {
      icon: GiDiamondRing,
      title: "Certified Jewelry",
      description: "916 hallmarked gold, 20-carat gold, and 999 pure silver with authenticity certificates."
    },
    {
      icon: FaPalette,
      title: "Custom Design",
      description: "Create unique jewelry pieces tailored to your personal style and preferences."
    },
    {
      icon: FaTools,
      title: "Repair Services",
      description: "Expert jewelry repair and maintenance services to restore your precious pieces."
    },
    {
      icon: GiJewelCrown,
      title: "Bridal Collections",
      description: "Exquisite bridal and festive collections for your special occasions."
    },
    {
      icon: MdStars,
      title: "Quality Craftsmanship",
      description: "Each piece is crafted with precision and attention to detail by skilled artisans."
    },
    {
      icon: MdAttachMoney,
      title: "Fair Pricing",
      description: "Competitive making charges and transparent pricing for all our jewelry."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <div className="text-black animate-float">
              <OmSaiLogo className="w-16 h-16" />
            </div>
            <div className="text-5xl text-black animate-float" style={{ animationDelay: '0.5s' }}>
              <GiDiamondRing />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Our <span className="text-[#ffd700]">Premium</span> Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            At OmSai, we offer a perfect combination of trusted gold loan services and exquisite jewelry craftsmanship.
            Discover our comprehensive range of financial and jewelry solutions.
          </p>
        </div>
      </div>

      {/* Gold Loan Services Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="text-black animate-float">
                <OmSaiLogo className="w-16 h-16" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Gold Loan Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick, secure, and reliable gold loan services for all your financial needs.
              Get instant funds against your gold with transparent processes and competitive rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {goldLoanServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 card-hover group"
              >
                <div className="text-4xl text-[#9C8E6B] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Gold Loan Process */}
          <div className="bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A] rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Simple 3-Step Process</h3>
              <p className="text-xl text-gray-200">Get your gold loan in just a few minutes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ffd700] rounded-full flex items-center justify-center text-2xl font-bold text-gray-800 mx-auto mb-4">
                  1
                </div>
                <h4 className="text-xl font-bold mb-2">Bring Your Gold</h4>
                <p className="text-gray-200">Visit our branch with your gold ornaments and required documents</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ffd700] rounded-full flex items-center justify-center text-2xl font-bold text-gray-800 mx-auto mb-4">
                  2
                </div>
                <h4 className="text-xl font-bold mb-2">Get Evaluation</h4>
                <p className="text-gray-200">Our experts evaluate your gold and provide instant loan approval</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ffd700] rounded-full flex items-center justify-center text-2xl font-bold text-gray-800 mx-auto mb-4">
                  3
                </div>
                <h4 className="text-xl font-bold mb-2">Receive Funds</h4>
                <p className="text-gray-200">Get immediate cash disbursement with secure gold storage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jewelry Services Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="text-6xl text-[#9C8E6B] animate-float">
                <GiDiamondRing />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Jewelry Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Exquisite jewelry craftsmanship with certified gold and silver ornaments.
              From custom designs to repairs, we offer comprehensive jewelry solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {jewelryServices.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 card-hover group border border-gray-100"
              >
                <div className="text-4xl text-[#9C8E6B] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Jewelry Collections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Collections</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-[#9C8E6B] mt-1">
                    <GiJewelCrown />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Bridal Collection</h4>
                    <p className="text-gray-600">Stunning bridal sets and wedding jewelry for your special day</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-[#9C8E6B] mt-1">
                    <GiTwoCoins />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Traditional Designs</h4>
                    <p className="text-gray-600">Classic and traditional jewelry pieces that never go out of style</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-[#9C8E6B] mt-1">
                    <MdStars />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Contemporary Styles</h4>
                    <p className="text-gray-600">Modern and trendy designs for the fashion-forward individual</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#9C8E6B]/10 to-[#ffd700]/10 rounded-3xl p-8">
              <h4 className="text-2xl font-bold text-gray-800 mb-6">Quality Assurance</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-700 font-medium">916 Hallmarked Gold</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-700 font-medium">999 Pure Silver</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-700 font-medium">Certified Authenticity</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-700 font-medium">Lifetime Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-[#9C8E6B] to-[#8B7D5A]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="text-6xl text-[#ffd700] animate-float">
              <FaHeart />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Whether you need a quick gold loan or want to explore our exquisite jewelry collection,
            we're here to serve you with excellence and trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-hover-effect flex items-center justify-center gap-3 px-8 py-4 bg-[#ffd700] text-gray-800 rounded-xl text-lg font-semibold hover:bg-[#ffed4e] hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <FaPhone />
              Contact Us Today
            </Link>
            <Link
              to="/about"
              className="btn-hover-effect flex items-center justify-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-lg border border-white/30 text-white rounded-xl text-lg font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <FaArrowRight />
              Learn More About Us
            </Link>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-200">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>Bangalore, Karnataka</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone />
              <span>+91 99008 28269</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service
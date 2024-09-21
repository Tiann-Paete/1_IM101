import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCartIcon, EnvelopeIcon, PencilIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);

      const sections = ["home", "about", "products", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-neutral-800 text-neutral-800">
      <style jsx global>{`
        body {
          --scrollbar-color: #f97316;
          --scrollbar-bg-color: #262626;
        }
        ::-webkit-scrollbar {
          width: 14px;
        }
        ::-webkit-scrollbar-track {
          background: var(--scrollbar-bg-color);
        }
        ::-webkit-scrollbar-thumb {
          background-color: var(--scrollbar-color);
          border-radius: 7px;
          border: 3px solid var(--scrollbar-bg-color);
        }
      `}</style>

<header className={`py-3 px-4 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/Logo/narslogo.png" alt="Nar's Logo" width={140} height={140} />
          </div>
          <nav className="flex items-center">
            <ul className="flex space-x-6 mr-12">
              {["home", "about", "products", "contact"].map((section) => (
                <li key={section}>
                  <button 
                    onClick={() => scrollToSection(section)} 
                    className={`text-neutral-100 hover:text-orange-400 transition duration-300 ${activeSection === section ? "text-orange-400 font-bold" : ""}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => router.push('/signup')} 
              className="bg-orange-400 text-neutral-100 px-4 py-2 rounded-lg hover:bg-orange-500 transition duration-300 flex items-center"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="py-24 min-h-screen flex items-center">
          <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl text-white font-bold mb-6">Welcome to Nar's School Supplies</h1>
              <p className="text-xl text-gray-100 mb-10">Your one-stop shop for all your educational needs</p>
              <button 
                onClick={() => router.push('/signin')} 
                className="bg-orange-400 text-neutral-100 px-8 py-3 rounded-lg text-lg hover:bg-orange-500 transition duration-300 shadow-md flex items-center justify-center mx-auto md:mx-0"
              >
                <ShoppingCartIcon className="h-6 w-6 mr-2" />
                Shop Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center hidden md:flex mt-36 ml-16">
              <Image 
                src="/ImageSample/BagN3.png" 
                alt="School Bag" 
                width={500} 
                height={500} 
                className="custom-drop-shadow"
              />
            </div>
          </div>
        </section>

       {/* About Section */}
       <section id="about" className="py-24 min-h-screen flex items-center bg-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/ImageSample/buildingN1.png" 
            alt="Nar's School Supply Store" 
            layout="fill"
            objectFit="cover"
            className="object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800/70 to-neutral-800"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2"></div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-400">About Nar's</h2>
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              Nar's School Supplies has been serving students and educators for over 4 years. 
              We pride ourselves on offering high-quality products at affordable prices, 
              ensuring that everyone has access to the tools they need for success.
            </p>
          </div>
        </div>
      </section>

        {/* Featured Products Section */}
        <section id="products" className="py-24 min-h-screen flex items-center">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-orange-400">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {[
                { name: "Basic Bundle", description: "Essential school supplies for everyday use", feature: "As low as ₱60", image: "7972_6643" },
                { name: "Premium Package", description: "High-quality materials for the dedicated student", feature: "High Quality", image: "7978_6646" },
                { name: "Complete Set", description: "Everything you need for a successful school year", feature: "15% off", image: "7976_7976" }
              ].map((product, index) => (
                <div key={index} className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col transform hover:scale-105 ${index === 1 ? 'md:-mt-4 md:mb-4' : ''}`}>
                  <div className={`relative overflow-hidden ${index === 1 ? 'h-56' : 'h-48'}`}>
                    <Image 
                      src={`https://www.officewarehouse.com.ph/__resources/_web_data_/products/products/image_gallery/${product.image}.jpg`} 
                      alt={product.name} 
                      layout="fill" 
                      objectFit="contain" 
                      className="transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className={`p-6 flex-grow flex flex-col justify-between ${index === 1 ? 'md:p-7' : ''}`}>
                    <div>
                      <h3 className={`font-semibold mb-2 text-orange-400 ${index === 1 ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>{product.name}</h3>
                      <p className="text-neutral-600 mb-3">{product.description}</p>
                      <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                        {product.feature}
                      </div>
                    </div>
                    <button 
                      onClick={() => router.push('/signin')}
                      className="bg-orange-400 text-neutral-100 px-4 py-2 rounded hover:bg-orange-500 transition duration-300 w-full shadow-sm mt-auto flex items-center justify-center"
                    >
                      Check Now
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Call to Action Section */}
        <section id="contact" className="py-24 min-h-screen flex items-center bg-neutral-800">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-400">Ready to get started?</h2>
            <p className="text-xl text-gray-100 mb-10">Contact us today to learn more about our products and services.</p>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-orange-400 text-neutral-100 px-8 py-3 rounded-lg text-lg hover:bg-orange-500 transition duration-300 shadow-md flex items-center justify-center mx-auto"
            >
              <EnvelopeIcon className="h-6 w-6 mr-2" />
              Contact Us
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-800 text-neutral-100 py-6">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p>&copy; 2024 Nar's School Supplies. All rights reserved.</p>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-8 max-w-md w-full m-4 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 text-orange-400">Contact Us</h3>
            <div className="flex justify-center space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition duration-300">
                <Image src="/ImageLogo/facebook.png" alt="Facebook" width={40} height={40} />
              </a>
              <a href="mailto:contact@narsschoolsupplies.com" className="transition duration-300">
                <Image src="/ImageLogo/gmail.png" alt="Gmail" width={40} height={40} />
              </a>
            </div>
            <p className="text-gray-600 text-center">Follow us on Facebook or send us an email!</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
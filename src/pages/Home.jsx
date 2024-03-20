import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form data
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const menuItems = [
    {
      name: "Margherita Pizza",
      description:
        "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.",
      price: "$12.99",
    },
    {
      name: "Spaghetti Bolognese",
      description:
        "Spaghetti pasta with a rich meat sauce made with ground beef and tomatoes.",
      price: "$14.99",
    },
    {
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce, croutons, parmesan cheese, and Caesar dressing.",
      price: "$8.99",
    },
    // Add more menu items here
  ];

  return (
    <div>
      <header className='bg-white shadow-md fixed w-full z-10'>
        <nav className='container mx-auto px-6 py-2 flex items-center justify-between'>
          <a href='#' className='text-xl font-bold text-gray-800'>
            Delicious
          </a>
          <div className='hidden md:flex space-x-4'>
            <a href='#menu' className='text-gray-800 hover:text-gray-600'>
              Menu
            </a>
            <a href='#about' className='text-gray-800 hover:text-gray-600'>
              About
            </a>
            <a href='#contact' className='text-gray-800 hover:text-gray-600'>
              Contact
            </a>
            {user ? (
              <button
                onClick={() =>
                  signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                      setUser(null);
                    })
                    .catch((error) => {
                      // An error happened.
                      console.log(error);
                    })
                }
              >
                Logout
              </button>
            ) : (
              <Link to='/login' className='text-gray-800 hover:text-gray-600'>
                Login
              </Link>
            )}
          </div>
          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className='text-gray-800 hover:text-gray-600 focus:outline-none'
            >
              <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24'>
                <path d='M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z'></path>
              </svg>
            </button>
          </div>
        </nav>
        <div
          className={`md:hidden bg-white shadow-md absolute w-full left-0 mt-12 py-2 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <a
            href='#menu'
            className='block text-gray-800 hover:bg-gray-200 py-2 px-4'
          >
            Menu
          </a>
          <a
            href='#about'
            className='block text-gray-800 hover:bg-gray-200 py-2 px-4'
          >
            About
          </a>
          <a
            href='#contact'
            className='block text-gray-800 hover:bg-gray-200 py-2 px-4'
          >
            Contact
          </a>
        </div>
      </header>

      <main>
        <section
          className='hero-image h-screen flex items-center justify-center'
          style={{
            backgroundImage:
              "url('https://source.unsplash.com/random/1920x1080/?restaurant')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "darken",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className='text-center text-white'>
            <h1 className='text-5xl font-bold mb-4'>
              Welcome to Our Restaurant
            </h1>
            <p className='text-xl mb-8'>
              Enjoy delicious food and a cozy atmosphere
            </p>
            <a
              href='#menu'
              className='bg-white text-gray-800 py-2 px-4 rounded hover:bg-gray-200'
            >
              View Menu
            </a>
          </div>
        </section>

        <section id='menu' className='container mx-auto py-12 px-6'>
          <h2 className='text-3xl font-bold mb-8'>Our Menu</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {menuItems.map((item, index) => (
              <div key={index} className='bg-white shadow-md rounded-md p-6'>
                <h3 className='text-xl font-bold mb-2'>{item.name}</h3>
                <p className='text-gray-700 mb-4'>{item.description}</p>
                <p className='text-gray-600'>{item.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section id='about' className='bg-gray-100 py-12'>
          <div className='container mx-auto px-6'>
            <h2 className='text-3xl font-bold mb-8'>About Us</h2>
            <p className='text-gray-800 mb-8'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor, magna a efficitur vehicula, velit libero efficitur odio,
              id fringilla tellus nunc vel ipsum.
            </p>
            <a href='#' className='text-blue-500 hover:text-blue-800'>
              Read More
            </a>
          </div>
        </section>

        <section id='contact' className='container mx-auto py-12 px-6'>
          <h2 className='text-3xl font-bold mb-8'>Contact Us</h2>
          <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-gray-700 font-bold mb-2'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-gray-700 font-bold mb-2'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='message'
                className='block text-gray-700 font-bold mb-2'
              >
                Message
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                rows='4'
                required
              ></textarea>
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
      <footer className='bg-gray-800 text-white py-6'>
        <div className='container mx-auto px-6'>
          <p>&copy; 2023 Restaurant Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

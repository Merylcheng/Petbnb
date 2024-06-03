import { Link } from "react-router-dom";

const BeASitter = () => {
  return (
    <div className="h-screen">
      <div className="relative">
        <div
          className="bg-cover bg-center py-12"
          style={{
            backgroundImage: "url('/images/pet4.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "1000px",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-8">
                  <h1 className="text-4xl font-semibold text-indigo-600">
                    Adore animals? Become a pet sitter today!
                  </h1>
                  <p className="mt-4 text-lg text-gray-600">
                    A fun, flexible job to fit around your life:
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                    <img
                      src="/images/hand.png"
                      alt="Money Logo"
                      className="w-12 h-12 mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                        Choose your prices and services
                      </h3>
                      <p className="text-gray-600">
                        Set your own rates and decide which services you want to
                        offer.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                    <img
                      src="/images/cup.png"
                      alt="Boss Logo"
                      className="w-12 h-12 mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                        Be your own boss and control your schedule
                      </h3>
                      <p className="text-gray-600">
                        Work on your own terms and take jobs that fit your
                        availability.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                    <img
                      src="/images/balance.png"
                      alt="Balance Logo"
                      className="w-12 h-12 mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                        Enjoy work-life balance
                      </h3>
                      <p className="text-gray-600">
                        Have the flexibility to balance work with your personal
                        life.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Link to="/signup">
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 mt-10">
                      Apply to become a pet sitter
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeASitter;

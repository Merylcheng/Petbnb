function HowItWorks() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-indigo-600 text-center mb-8">
          Navigating Petbnb: A Step-by-Step Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <img
              src="/images/step1-logo.png"
              alt="Step 1 Logo"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                Step 1: Find a Pet Sitter
              </h3>{" "}
              <p className="text-gray-600">
                Browse through the profiles of local pet sitters and find the
                perfect match for your pet.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <img
              src="/images/man.png"
              alt="Step 2 Logo"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                Step 2: Book a Meet & Greet
              </h3>{" "}
              <p className="text-gray-600">
                Schedule a Meet & Greet to ensure it is a good fit before
                booking the service.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <img
              src="/images/step3-logo.png"
              alt="Step 3 Logo"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                Step 3: Enjoy Peace of Mind
              </h3>{" "}
              <p className="text-gray-600">
                Relax knowing your pet is in good hands with daily updates and
                photos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;

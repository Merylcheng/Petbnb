function FAQSection() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              What are the drop off / pick up times?
            </h3>
            <p className="text-gray-600">
              Pet boarding are charged per 24 hours. Example, if a dog is
              dropped off at 8:00am one day and collected at 8:00am the next
              day.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              How do I find a pet sitter?
            </h3>
            <p className="text-gray-600">
              Finding a pet sitter is easy! Simply browse through the profiles
              of local pet sitters on our website, read reviews, and contact
              sitters to discuss your pet care needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              How do I book a pet sitting service?
            </h3>
            <p className="text-gray-600">
              Once you have found the perfect pet sitter, you can book their
              services directly through our website. Simply select the dates you
              need pet care, review the sitters availability, and confirm your
              booking.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              What if I need to cancel my booking?
            </h3>
            <p className="text-gray-600">
              We understand that plans can change. If you need to cancel your
              booking, simply contact the pet sitter directly to discuss
              cancellation policies and any applicable fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;

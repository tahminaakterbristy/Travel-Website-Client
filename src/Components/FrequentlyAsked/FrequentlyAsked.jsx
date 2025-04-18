import { useState } from "react";


const FrequentlyAsked = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [darkMode] = useState(false); // Add state for dark mode

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the currently open accordion
    } else {
      setActiveIndex(index); // Open the clicked accordion
    }
  };

  // FAQ data
  const faqs = [
    {
      question: "What basic preparations should be made for travel?",
      answer:
        "For travel, first confirm your travel route and ensure you have the necessary documents like visa, passport, and flight tickets. Additionally, gather information about your travel destination.",
    },
    {
      question: "How can I travel cheaply?",
      answer:
        "To travel cheaply, it is advisable to travel during the off-peak season, use discount tickets and hostels. Buy food from local restaurants or markets and use public transport.",
    },
    {
      question: "Which country offers the best travel experience?",
      answer:
        "It depends on your interests. Europe offers historical and cultural experiences, Asia is great for affordable travel and natural landscapes, while America provides modern cities and adventure opportunities.",
    },
    {
      question: "Do I need to take any health precautions while traveling?",
      answer:
        "As a primary health precaution, vaccinations are recommended, especially if you're traveling to countries with disease outbreaks. Also, be aware of the local healthcare system and carry basic medical supplies.",
    },
  ];

  // Toggle dark mode
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

  return (
    <div
      className={`max-w-2xl mx-auto p-6 my-8 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-green-600">Frequently Asked Question (FAQ)</h2>

      {/* Dark Mode Toggle Button */}
      {/* <div className="text-center mb-6">
        <button
          onClick={toggleDarkMode}
          className={`py-2 px-4 rounded ${darkMode ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}
        >
          Toggle Dark Mode
        </button>
      </div> */}

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <div
              className={`cursor-pointer p-4 text-xl font-medium ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              onClick={() => toggleAccordion(index)}
            >
              {faq.question}
            </div>
            {activeIndex === index && (
              <div className="p-4">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAsked;

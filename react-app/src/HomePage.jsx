import React from 'react';
import { useNavigate } from "react-router-dom";
import karnataka_png from "./assets/karnataka_prev_ui.png";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate1 = () => {
        navigate("/dashboard/wind");
  };
  const handleNavigate2 = () => {
    navigate("/dashboard/solar");
};
  const featureHighlights = [
    // { title: 'Terrain Analysis', description: 'Assessing elevation variances to understand construction challenges and costs.' },
    { title: 'Population Density', description: 'Evaluating potential user bases and the potential impact on the local community.' },
    { title: 'Closest Highway Distance', description: 'Analyzing distances to highways for transportation and construction cost efficiency.' },
    // { title: 'Nearby House Count', description: 'Assessing the impact on project construction by counting nearby buildings.' },
    { title: 'Daylight Duration', description: 'Calculating daylight duration and cloud cover to estimate solar power generation potential.' },
    // { title: 'Annual Usable Wind Days Percentage', description: 'Determining the percentage of days with optimal wind speeds for energy generation.' },
    { title: 'Wind Direction', description: 'Assessing wind direction stability to identify locations with consistent wind patterns.' },
    { title: 'High Radiation Days Percentage', description: 'Evaluating the percentage of days with high solar radiation, crucial for solar energy generation.' },
    { title: 'Solar Energy Loss Mean', description: 'Calculations considered solar energy loss due to temperature coefficients.' },
    // { title: 'Distance to Substation', description: 'Computed distance to the nearest substation to understand infrastructure costs.' },
    // { title: 'Irradiation', description: 'Obtained irradiation data from an external source, a critical factor for solar power generation.' },
    // { title: 'Distance from Houses', description: 'Determined the distance from populated areas to minimize potential disruptions.' },
    // { title: 'Distance from Roads', description: 'Assessed the proximity to roads, impacting accessibility and construction logistics.' },
    { title: 'Land Use Patterns', description: 'Incorporating land use patterns to understand land availability.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#4558cf] shadow-md">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center mx-4">
          <h1 className="text-2xl font-bold text-white">Renewable Energy Site Selection</h1>
          {/* <nav>
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          </nav> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        {/* Project Description */}
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-700">About Our Project</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Our solution leverages data-driven insights to guide renewable energy site selection in Karnataka. 
            By combining advanced geospatial analysis and strategic feature engineering, we provide comprehensive 
            recommendations that facilitate efficient power generation and attractive returns on investment.
          </p>
          <div className='inline-flex gap-4'>
          <button 
            onClick={handleNavigate1} 
            className="w-full md:w-auto px-4 py-2 bg-[#4558cf] text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Go to Wind Map
          </button>
          <button 
            onClick={handleNavigate2} 
            className="w-full md:w-auto px-4 py-2 bg-[#4558cf] text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Go to Solar Map
          </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-1">
          {/* {featureHighlights.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg hover:bg-blue-50 transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-base">{feature.description}</p>
            </div>
          ))} */}
          <img className="object-cover h-auto ml-36" src={karnataka_png}></img>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          © 2024 Renewable Energy Site Selection Project
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
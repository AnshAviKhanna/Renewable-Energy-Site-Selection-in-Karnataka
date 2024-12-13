import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const districtData = [
    { name: "Bagalkot", lat: 16.181075, lon: 75.695042, value: 42 },
    { name: "Ballari (Bellary)", lat: 15.139476, lon: 76.921476, value: 65 },
    { name: "Belagavi (Belgaum)", lat: 15.864674, lon: 74.506519, value: 55 },
    { name: "Bengaluru Rural", lat: 13.218577, lon: 77.438063, value: 78 },
    { name: "Bengaluru Urban", lat: 12.971677, lon: 77.594687, value: 90 },
    { name: "Bidar", lat: 17.910777, lon: 77.519935, value: 35 },
    { name: "Chamarajanagar", lat: 11.923876, lon: 76.940724, value: 48 },
    { name: "Chikkaballapur", lat: 13.435077, lon: 77.731570, value: 62 },
    { name: "Chikkamagaluru", lat: 13.316175, lon: 75.772355, value: 57 },
    { name: "Chitradurga", lat: 14.227676, lon: 76.400692, value: 53 },
    { name: "Dakshina Kannada", lat: 12.870274, lon: 74.842831, value: 71 },
    { name: "Davanagere", lat: 14.464475, lon: 75.923880, value: 46 },
    { name: "Dharwad", lat: 15.458975, lon: 75.007848, value: 59 },
    { name: "Gadag", lat: 15.429475, lon: 75.629777, value: 44 },
    { name: "Hassan", lat: 13.005576, lon: 76.102520, value: 66 },
    { name: "Haveri", lat: 14.793675, lon: 75.399069, value: 41 },
    { name: "Kalaburagi (Gulbarga)", lat: 17.329776, lon: 76.834357, value: 37 },
    { name: "Kodagu (Coorg)", lat: 12.337575, lon: 75.806988, value: 81 },
    { name: "Kolar", lat: 13.136778, lon: 78.129150, value: 54 },
    { name: "Koppal", lat: 15.346076, lon: 76.154134, value: 39 },
    { name: "Mandya", lat: 12.522376, lon: 76.897012, value: 63 },
    { name: "Mysuru (Mysore)", lat: 12.295876, lon: 76.639464, value: 75 },
    { name: "Raichur", lat: 16.204777, lon: 77.354581, value: 33 },
    { name: "Ramanagara", lat: 12.721177, lon: 77.281322, value: 68 },
    { name: "Shivamogga (Shimoga)", lat: 13.929975, lon: 75.568149, value: 56 },
    { name: "Tumakuru (Tumkur)", lat: 13.339277, lon: 77.101668, value: 52 },
    { name: "Udupi", lat: 13.340974, lon: 74.742130, value: 67 },
    { name: "Uttara Kannada", lat: 14.818074, lon: 74.138697, value: 72 },
    { name: "Bijapur (Vijayapura)", lat: 16.830275, lon: 75.710053, value: 40 },
    { name: "Yadgir", lat: 16.770077, lon: 77.137690, value: 36 }
  ];
  
  const suitabilityIndex = [
    { id: 27, name: "Raichur", value: 0.08572 },
    { id: 26, name: "Kolar", value: 0.049515 },
    { id: 25, name: "Mandya", value: 0.046548 },
    { id: 24, name: "Belagavi (Belgaum)", value: 0.043129 },
    { id: 23, name: "Bidar", value: 0.041831 },
    { id: 22, name: "Gadag", value: 0.037687 },
    { id: 21, name: "Koppal", value: 0.037405 },
    { id: 20, name: "Haveri", value: 0.034862 },
    { id: 19, name: "Hassan", value: 0.034429 },
    { id: 18, name: "Bengaluru Rural", value: 0.034259 },
    { id: 17, name: "Kalaburagi (Gulbarga)", value: 0.034188 },
    { id: 16, name: "Udupi", value: 0.0339 },
    { id: 15, name: "Kodagu (Coorg)", value: 0.033696 },
    { id: 14, name: "Dakshina Kannada", value: 0.033438 },
    { id: 13, name: "Bengaluru Urban", value: 0.033391 },
    { id: 12, name: "Chikkamagaluru", value: 0.033259 },
    { id: 11, name: "Bagalkot", value: 0.033077 },
    { id: 10, name: "Dharwad", value: 0.032621 },
    { id: 9, name: "Tumakuru (Tumkur)", value: 0.032237 },
    { id: 8, name: "Uttara Kannada", value: 0.03212 },
    { id: 7, name: "Davanagere", value: 0.032057 },
    { id: 6, name: "Chitradurga", value: 0.031996 },
    { id: 5, name: "Shivamogga (Shimoga)", value: 0.031628 },
    { id: 4, name: "Ballari (Bellary)", value: 0.031464 },
    { id: 3, name: "Bijapur (Vijayapura)", value: 0.031339 },
    { id: 2, name: "Chamarajanagar", value: 0.031299 },
    { id: 1, name: "Mysuru (Mysore)", value: 0.031244 }
];
  
  // Filter and map the data
  const updatedDistrictData = districtData
    .filter(d => suitabilityIndex.some(s => s.name === d.name))
    .map(d => {
      const updatedValue = suitabilityIndex.find(s => s.name === d.name).value;
      return { ...d, value: updatedValue };
    });

// Custom Marker Icon Creator
const createMarkerIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color:${color}; width:20px; height:20px; border-radius:50%; border:2px solid white;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};
const SolarMap = () => {
  const [minId, setMinId] = useState(1);
  const [maxId, setMaxId] = useState(27);

  // Helper function to interpolate color based on id
  const getColorForId = (id) => {
    const normalizedId = (id - minId) / (maxId - minId);
    const red = Math.round(255 * (1 - normalizedId));
    const green = Math.round(255 * normalizedId);
    return `rgb(${red}, ${green}, 0)`;
  };

  // Filter districts based on suitability index id range
  const filteredDistricts = useMemo(() => {
    return updatedDistrictData.filter((district) => {
      const districtSuitability = suitabilityIndex.find(s => s.name === district.name);
      return districtSuitability && districtSuitability.id >= minId && districtSuitability.id <= maxId;
    }).map((district) => {
      const districtSuitability = suitabilityIndex.find(s => s.name === district.name);
      return { ...district, id: districtSuitability.id };
    });
  }, [minId, maxId]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <h1 className="text-2xl font-bold mb-4">Solar Suitability Map</h1> */}
      <header className="bg-[#4558cf] shadow-md mb-1">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center mx-4">
          <h1 className="text-2xl font-bold text-white">Solar Suitability Map</h1>
          {/* <nav>
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          </nav> */}
        </div>
      </header>
      <div className='p-4'>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="minId" className="block text-lg font-medium">
            Top {28-minId} suitable districts
          </label>
          <input
            type="range"
            id="minId"
            min="1"
            max="27"
            value={minId}
            onChange={(e) => setMinId(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <MapContainer 
        center={[15.3, 75.7]} 
        zoom={7} 
        scrollWheelZoom={false}
        className="h-[600px] w-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {filteredDistricts.map((district) => (
          <Marker
            key={district.name}
            position={[district.lat, district.lon]}
            icon={createMarkerIcon(getColorForId(district.id))}
          >
            <Popup>
              <div>
                <strong>{district.name}</strong>
                <br />
                Suitability Index ID: {district.id}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Filtered Districts</h2>
        <div className="grid grid-cols-3 gap-2">
          {filteredDistricts.map((district) => (
            <div 
              key={district.name} 
              className="bg-white p-2 rounded shadow flex justify-between items-center"
              style={{ 
                borderLeft: `6px solid ${getColorForId(district.id)}`
              }}
            >
              <span className="font-medium">{district.name}</span>
              <span className="text-gray-600">{district.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SolarMap;
import React, { useState } from 'react';
import { Home, MapPin, Bed, Bath, Square, Calendar, DollarSign, TrendingUp, Sparkles } from 'lucide-react';

interface HouseFeatures {
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  yearBuilt: string;
  lotSize: string;
  garageSpaces: string;
  neighborhood: string;
  condition: string;
}

function App() {
  const [features, setFeatures] = useState<HouseFeatures>({
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    yearBuilt: '',
    lotSize: '',
    garageSpaces: '',
    neighborhood: '',
    condition: 'good'
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFeatures(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const simulatePrediction = () => {
    // Simulate ML prediction with realistic calculation
    const base = 150000;
    const bedroomValue = parseInt(features.bedrooms) * 25000;
    const bathroomValue = parseInt(features.bathrooms) * 15000;
    const sqftValue = parseInt(features.squareFootage) * 120;
    const ageValue = (2024 - parseInt(features.yearBuilt)) * -500;
    const lotValue = parseInt(features.lotSize) * 5;
    const garageValue = parseInt(features.garageSpaces) * 8000;
    const conditionMultiplier = features.condition === 'excellent' ? 1.2 : features.condition === 'good' ? 1.0 : 0.8;
    
    const estimated = (base + bedroomValue + bathroomValue + sqftValue + ageValue + lotValue + garageValue) * conditionMultiplier;
    return Math.round(estimated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const predictedPrice = simulatePrediction();
    setPrediction(predictedPrice);
    setIsLoading(false);
    setShowResult(true);
  };

  const resetForm = () => {
    setFeatures({
      bedrooms: '',
      bathrooms: '',
      squareFootage: '',
      yearBuilt: '',
      lotSize: '',
      garageSpaces: '',
      neighborhood: '',
      condition: 'good'
    });
    setPrediction(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            House Price Predictor
          </h1>
          <p className="text-blue-200 text-lg">Get an AI-powered estimate of your property's value</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
              <h2 className="text-2xl font-bold text-white">Property Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    <Bed className="inline w-4 h-4 mr-1" />
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={features.bedrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                    placeholder="3"
                    required
                    min="1"
                    max="10"
                  />
                </div>

                <div className="group">
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    <Bath className="inline w-4 h-4 mr-1" />
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={features.bathrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                    placeholder="2"
                    required
                    min="1"
                    max="8"
                    step="0.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <Square className="inline w-4 h-4 mr-1" />
                  Square Footage
                </label>
                <input
                  type="number"
                  name="squareFootage"
                  value={features.squareFootage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  placeholder="2000"
                  required
                  min="500"
                  max="10000"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Year Built
                  </label>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={features.yearBuilt}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                    placeholder="1995"
                    required
                    min="1900"
                    max="2024"
                  />
                </div>

                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Lot Size (sq ft)
                  </label>
                  <input
                    type="number"
                    name="lotSize"
                    value={features.lotSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                    placeholder="8000"
                    required
                    min="1000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Garage Spaces
                  </label>
                  <input
                    type="number"
                    name="garageSpaces"
                    value={features.garageSpaces}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                    placeholder="2"
                    required
                    min="0"
                    max="4"
                  />
                </div>

                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Condition
                  </label>
                  <select
                    name="condition"
                    value={features.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                    required
                  >
                    <option value="poor" className="bg-gray-800">Poor</option>
                    <option value="fair" className="bg-gray-800">Fair</option>
                    <option value="good" className="bg-gray-800">Good</option>
                    <option value="excellent" className="bg-gray-800">Excellent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Neighborhood
                </label>
                <input
                  type="text"
                  name="neighborhood"
                  value={features.neighborhood}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  placeholder="Downtown, Suburbs, etc."
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Predict Price
                    </>
                  )}
                </button>

                {showResult && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300 border border-white/20"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <DollarSign className="w-6 h-6 text-green-400 mr-2" />
              <h2 className="text-2xl font-bold text-white">Price Estimate</h2>
            </div>

            {showResult && prediction ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4">
                    <Home className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-2">
                    ${prediction.toLocaleString()}
                  </h3>
                  <p className="text-green-200">Estimated Market Value</p>
                </div>

                <div className="bg-white/10 rounded-xl p-6 space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Property Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Bedrooms:</span>
                      <span className="text-white font-medium">{features.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Bathrooms:</span>
                      <span className="text-white font-medium">{features.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Square Feet:</span>
                      <span className="text-white font-medium">{parseInt(features.squareFootage).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Year Built:</span>
                      <span className="text-white font-medium">{features.yearBuilt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Lot Size:</span>
                      <span className="text-white font-medium">{parseInt(features.lotSize).toLocaleString()} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Condition:</span>
                      <span className="text-white font-medium capitalize">{features.condition}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl p-4 border border-yellow-400/30">
                  <p className="text-yellow-200 text-sm">
                    <strong>Note:</strong> This is a simulated estimate for demonstration purposes. 
                    Actual property values may vary based on market conditions, location specifics, and other factors.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                  <Home className="w-8 h-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Predict</h3>
                <p className="text-blue-200">Fill out the property details to get your price estimate</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-blue-300 text-sm">
            Powered by advanced machine learning algorithms •
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
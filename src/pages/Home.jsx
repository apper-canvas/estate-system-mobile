import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Icon declarations
  const HomeIcon = getIcon('Home');
  const SearchIcon = getIcon('Search');
  const MapPinIcon = getIcon('MapPin');
  const BuildingIcon = getIcon('Building');
  const HomeModernIcon = getIcon('Building2');
  const DollarSignIcon = getIcon('DollarSign');
  const CheckCircleIcon = getIcon('CheckCircle');
  
  // Sample properties data
  const [properties] = useState([
    {
      id: 1,
      title: "Modern Waterfront Villa",
      location: "Miami, FL",
      price: 1250000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      type: "house",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Downtown Luxury Apartment",
      location: "New York, NY",
      price: 850000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: "apartment",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Suburban Family Home",
      location: "Austin, TX",
      price: 550000,
      bedrooms: 3,
      bathrooms: 2.5,
      area: 2100,
      type: "house",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Oceanview Condo",
      location: "San Diego, CA",
      price: 690000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1350,
      type: "condo",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Cityview Penthouse",
      location: "Chicago, IL",
      price: 1750000,
      bedrooms: 3,
      bathrooms: 3.5,
      area: 2900,
      type: "apartment",
      image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Rustic Mountain Retreat",
      location: "Denver, CO",
      price: 920000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2600,
      type: "house",
      image: "https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ]);
  
  // Filter properties based on search query and active filter
  const filteredProperties = properties.filter(property => {
    // Apply text search
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesFilter = activeFilter === 'all' || property.type === activeFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Toggle favorite property
  const handleFavorite = (propertyId) => {
    toast.success("Property added to favorites!");
  };
  
  // Format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/80 to-secondary/80 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')]"></div>
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-white mb-4 text-3xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Dream Property with EstateVue
            </motion.h1>
            <motion.p 
              className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover thousands of properties and connect with real estate professionals to find your perfect home.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="relative max-w-2xl mx-auto mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location or property name..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-5 py-4 pr-12 rounded-xl text-surface-800 shadow-xl border border-white/30 bg-white/90 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <SearchIcon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div className="bg-white dark:bg-surface-800 shadow-sm sticky top-16 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide py-2 gap-2">
            <button 
              onClick={() => setActiveFilter('all')} 
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              All Properties
            </button>
            <button 
              onClick={() => setActiveFilter('house')} 
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                activeFilter === 'house' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              <HomeIcon className="w-4 h-4" /> Houses
            </button>
            <button 
              onClick={() => setActiveFilter('apartment')} 
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                activeFilter === 'apartment' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              <BuildingIcon className="w-4 h-4" /> Apartments
            </button>
            <button 
              onClick={() => setActiveFilter('condo')} 
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                activeFilter === 'condo' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              <HomeModernIcon className="w-4 h-4" /> Condos
            </button>
          </div>
        </div>
      </div>
      
      {/* Property Listings */}
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">
              {activeFilter === 'all' ? 'All Properties' : 
               activeFilter === 'house' ? 'Houses' : 
               activeFilter === 'apartment' ? 'Apartments' : 'Condos'}
            </h2>
            <p className="text-surface-600 dark:text-surface-400">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>
        </div>
        
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-surface-100 dark:bg-surface-800 mb-6">
              <SearchIcon className="w-10 h-10 text-surface-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No properties found</h3>
            <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find more properties.
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProperties.map(property => (
              <motion.div 
                key={property.id}
                variants={itemVariants}
                className="group bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden h-56">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <span className="text-white font-semibold text-lg text-shadow">${formatPrice(property.price)}</span>
                    <button 
                      onClick={() => handleFavorite(property.id)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all"
                      aria-label="Add to favorites"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:fill-red-500">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-surface-500 dark:text-surface-400 text-sm mb-3">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-surface-200 dark:border-surface-700 mb-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-surface-500 dark:text-surface-400">Beds</span>
                      <span className="font-semibold">{property.bedrooms}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-surface-500 dark:text-surface-400">Baths</span>
                      <span className="font-semibold">{property.bathrooms}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-surface-500 dark:text-surface-400">Sq.Ft</span>
                      <span className="font-semibold">{property.area.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <button 
                      className="w-full py-2.5 px-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                      onClick={() => toast.info(`Contact the agent about ${property.title}`)}
                    >
                      Contact Agent
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      
      {/* Main Feature Section */}
      <div className="bg-gradient-to-r from-surface-100/80 to-surface-200/60 dark:from-surface-800/50 dark:to-surface-900/90 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Add Your Property Listing
            </h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto text-lg">
              Ready to sell or rent your property? Create your listing in minutes and connect with potential buyers.
            </p>
          </div>
          
          <MainFeature />
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-14">
            <div className="flex flex-col items-center max-w-xs text-center">
              <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-5 mb-4">
                <CheckCircleIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Listing Creation</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Create detailed property listings with our intuitive form and reach thousands of potential buyers.
              </p>
            </div>
            <div className="flex flex-col items-center max-w-xs text-center">
              <div className="bg-secondary/10 dark:bg-secondary/20 rounded-full p-5 mb-4">
                <DollarSignIcon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Our pricing tools help you set the right price for your property based on market trends.
              </p>
            </div>
            <div className="flex flex-col items-center max-w-xs text-center">
              <div className="bg-accent/10 dark:bg-accent/20 rounded-full p-5 mb-4">
                <MapPinIcon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location Insights</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Get detailed insights about the neighborhood to help buyers make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
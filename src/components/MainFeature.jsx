import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature() {
  // Declare icons at the top
  const HomeIcon = getIcon('Home');
  const BuildingIcon = getIcon('Building');
  const LandplotIcon = getIcon('Landmark');
  const StoreIcon = getIcon('Store');
  const ImageIcon = getIcon('Image');
  const UploadIcon = getIcon('Upload');
  const MapPinIcon = getIcon('MapPin');
  const BedIcon = getIcon('Bed');
  const ShowerHeadIcon = getIcon('Shower');
  const SquareIcon = getIcon('Square');
  const DollarSignIcon = getIcon('DollarSign');
  const TagIcon = getIcon('Tag');
  const LayoutIcon = getIcon('LayoutGrid');
  const CheckIcon = getIcon('Check');
  const InfoIcon = getIcon('Info');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    type: 'house',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    features: [],
    images: []
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Available features
  const availableFeatures = [
    'Garage', 'Pool', 'Garden', 'Balcony', 
    'Air Conditioning', 'Furnished', 'Pet Friendly', 
    'Fireplace', 'Gym', 'Security System'
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle feature toggle
  const handleFeatureToggle = (feature) => {
    setFormData(prev => {
      if (prev.features.includes(feature)) {
        return {
          ...prev,
          features: prev.features.filter(f => f !== feature)
        };
      } else {
        return {
          ...prev,
          features: [...prev.features, feature]
        };
      }
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Simulate image upload by storing file objects
      // In a real app, you would upload them to a server
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Validate form
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (!formData.price) newErrors.price = "Price is required";
      else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
        newErrors.price = "Price must be a positive number";
      }
    }
    
    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.zip.trim()) newErrors.zip = "ZIP code is required";
    }
    
    if (step === 3) {
      if (!formData.bedrooms) newErrors.bedrooms = "Number of bedrooms is required";
      else if (isNaN(formData.bedrooms) || parseInt(formData.bedrooms) < 0) {
        newErrors.bedrooms = "Must be a non-negative number";
      }
      
      if (!formData.bathrooms) newErrors.bathrooms = "Number of bathrooms is required";
      else if (isNaN(formData.bathrooms) || parseFloat(formData.bathrooms) < 0) {
        newErrors.bathrooms = "Must be a non-negative number";
      }
      
      if (!formData.squareFeet) newErrors.squareFeet = "Square footage is required";
      else if (isNaN(formData.squareFeet) || parseInt(formData.squareFeet) <= 0) {
        newErrors.squareFeet = "Must be a positive number";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    const isValid = validateStep(currentStep);
    if (isValid) setCurrentStep(prev => prev + 1);
  };

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValid = validateStep(currentStep);
    if (isValid) {
      setIsSubmitting(true);
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        setIsSubmitting(false);
        setIsCompleted(true);
        toast.success("Property listing created successfully!");
        
        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({
            title: '',
            description: '',
            price: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            type: 'house',
            bedrooms: '',
            bathrooms: '',
            squareFeet: '',
            features: [],
            images: []
          });
          setCurrentStep(1);
          setIsCompleted(false);
        }, 2000);
      }, 1500);
    }
  };

  // Get property type icon
  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case 'house':
        return HomeIcon;
      case 'apartment':
        return BuildingIcon;
      case 'land':
        return LandplotIcon;
      case 'commercial':
        return StoreIcon;
      default:
        return HomeIcon;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.07,
        delayChildren: 0.2
      } 
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  // Get step title
  const getStepTitle = (step) => {
    switch (step) {
      case 1: return "Basic Information";
      case 2: return "Location Details";
      case 3: return "Property Features";
      case 4: return "Upload Images";
      default: return "Basic Information";
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden">
        {/* Stepper */}
        <div className="px-6 pt-6 pb-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    step < currentStep 
                      ? 'bg-primary text-white' 
                      : step === currentStep 
                        ? 'bg-primary/20 text-primary ring-2 ring-primary' 
                        : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'
                  }`}
                >
                  {step < currentStep ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{step}</span>
                  )}
                </div>
                <span className={`text-xs font-medium ${
                  step === currentStep
                    ? 'text-primary'
                    : 'text-surface-500 dark:text-surface-400'
                }`}>
                  {step === 1 && "Basic Info"}
                  {step === 2 && "Location"}
                  {step === 3 && "Features"}
                  {step === 4 && "Images"}
                </span>
                
                {/* Connector line */}
                {step < 4 && (
                  <div className={`hidden sm:block absolute h-0.5 w-full max-w-[calc(25%-2rem)] right-[calc(75%-1rem)] ${
                    step < currentStep ? 'bg-primary' : 'bg-surface-200 dark:bg-surface-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6">{getStepTitle(currentStep)}</h3>
            
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <label htmlFor="title" className="form-label">Property Title <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Modern Oceanfront Villa"
                      className={`form-input ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="description" className="form-label">Property Description <span className="text-red-500">*</span></label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Describe your property..."
                      className={`form-input resize-none ${errors.description ? 'border-red-500 dark:border-red-500' : ''}`}
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="price" className="form-label">Price ($) <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <DollarSignIcon className="w-4 h-4 text-surface-500" />
                      </div>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="e.g. 450000"
                        className={`form-input pl-10 ${errors.price ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                    </div>
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="type" className="form-label">Property Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                      {['house', 'apartment', 'land', 'commercial'].map((type) => {
                        const TypeIcon = getPropertyTypeIcon(type);
                        return (
                          <div 
                            key={type}
                            onClick={() => setFormData({...formData, type})}
                            className={`cursor-pointer relative border rounded-xl p-4 flex flex-col items-center justify-center transition-all ${
                              formData.type === type 
                                ? 'bg-primary/10 border-primary dark:bg-primary/20' 
                                : 'border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700'
                            }`}
                          >
                            <TypeIcon className={`w-7 h-7 mb-2 ${formData.type === type ? 'text-primary' : 'text-surface-500'}`} />
                            <span className={`capitalize text-sm font-medium ${formData.type === type ? 'text-primary' : ''}`}>
                              {type}
                            </span>
                            {formData.type === type && (
                              <div className="absolute top-2 right-2 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                                <CheckIcon className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              )}
              
              {/* Step 2: Location */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <label htmlFor="address" className="form-label">Street Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MapPinIcon className="w-4 h-4 text-surface-500" />
                      </div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="e.g. 123 Main Street"
                        className={`form-input pl-10 ${errors.address ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                    </div>
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="form-label">City <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. San Francisco"
                        className={`form-input ${errors.city ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="form-label">State <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g. California"
                        className={`form-input ${errors.state ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="zip" className="form-label">ZIP Code <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="e.g. 94103"
                      className={`form-input ${errors.zip ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors.zip && <p className="mt-1 text-sm text-red-500">{errors.zip}</p>}
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="pt-3">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex gap-3">
                      <div className="flex-shrink-0">
                        <InfoIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Your exact address will only be shared with interested buyers after your approval. We protect your privacy.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
              
              {/* Step 3: Property Features */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="bedrooms" className="form-label">Bedrooms <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <BedIcon className="w-4 h-4 text-surface-500" />
                        </div>
                        <input
                          type="number"
                          id="bedrooms"
                          name="bedrooms"
                          min="0"
                          value={formData.bedrooms}
                          onChange={handleChange}
                          placeholder="e.g. 3"
                          className={`form-input pl-10 ${errors.bedrooms ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                      </div>
                      {errors.bedrooms && <p className="mt-1 text-sm text-red-500">{errors.bedrooms}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="bathrooms" className="form-label">Bathrooms <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <ShowerHeadIcon className="w-4 h-4 text-surface-500" />
                        </div>
                        <input
                          type="number"
                          id="bathrooms"
                          name="bathrooms"
                          min="0"
                          step="0.5"
                          value={formData.bathrooms}
                          onChange={handleChange}
                          placeholder="e.g. 2.5"
                          className={`form-input pl-10 ${errors.bathrooms ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                      </div>
                      {errors.bathrooms && <p className="mt-1 text-sm text-red-500">{errors.bathrooms}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="squareFeet" className="form-label">Square Feet <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <SquareIcon className="w-4 h-4 text-surface-500" />
                        </div>
                        <input
                          type="number"
                          id="squareFeet"
                          name="squareFeet"
                          min="1"
                          value={formData.squareFeet}
                          onChange={handleChange}
                          placeholder="e.g. 2000"
                          className={`form-input pl-10 ${errors.squareFeet ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                      </div>
                      {errors.squareFeet && <p className="mt-1 text-sm text-red-500">{errors.squareFeet}</p>}
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="form-label flex items-center gap-2">
                      Property Features
                      <TagIcon className="w-4 h-4 text-surface-500" />
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-2">
                      {availableFeatures.map((feature) => (
                        <div
                          key={feature}
                          onClick={() => handleFeatureToggle(feature)}
                          className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition-all flex items-center gap-1.5 ${
                            formData.features.includes(feature)
                              ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                              : 'bg-surface-100 text-surface-700 hover:bg-surface-200 dark:bg-surface-700 dark:text-surface-300 dark:hover:bg-surface-600'
                          }`}
                        >
                          {formData.features.includes(feature) && (
                            <CheckIcon className="w-3.5 h-3.5 flex-shrink-0" />
                          )}
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="pt-3">
                    <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <LayoutIcon className="w-4 h-4 text-surface-600 dark:text-surface-400" />
                        Property Summary
                      </h4>
                      <div className="text-sm text-surface-600 dark:text-surface-300 space-y-1.5">
                        <p>
                          <span className="font-medium">Type:</span> {formData.type ? formData.type.charAt(0).toUpperCase() + formData.type.slice(1) : 'Not specified'}
                        </p>
                        <p>
                          <span className="font-medium">Size:</span> {formData.bedrooms || '-'} bed, {formData.bathrooms || '-'} bath, {formData.squareFeet ? `${formData.squareFeet} sq ft` : '-'}
                        </p>
                        <p>
                          <span className="font-medium">Location:</span> {formData.city && formData.state ? `${formData.city}, ${formData.state}` : 'Not specified'}
                        </p>
                        <p>
                          <span className="font-medium">Features:</span> {formData.features.length > 0 ? formData.features.join(', ') : 'None selected'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
              
              {/* Step 4: Images */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <label className="form-label">Upload Property Images</label>
                    <div className="mt-2 border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-xl p-8 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center justify-center gap-2"
                      >
                        <ImageIcon className="w-12 h-12 text-surface-400" />
                        <div className="space-y-1">
                          <p className="text-surface-700 dark:text-surface-300 font-medium">
                            Drag photos here or click to upload
                          </p>
                          <p className="text-xs text-surface-500 dark:text-surface-400">
                            Accepts JPG, PNG, WEBP up to 5MB each
                          </p>
                        </div>
                        <button type="button" className="mt-3 px-4 py-2 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
                          Select Files
                        </button>
                      </label>
                    </div>
                  </motion.div>
                  
                  {formData.images.length > 0 && (
                    <motion.div variants={itemVariants}>
                      <label className="form-label flex items-center gap-2">
                        Uploaded Images
                        <span className="text-xs bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400 py-0.5 px-2 rounded-full">
                          {formData.images.length}
                        </span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                        {formData.images.map((file, index) => (
                          <div key={index} className="relative group rounded-lg overflow-hidden aspect-square bg-surface-100 dark:bg-surface-700">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Property image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 6h18"></path>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line x1="10" y1="11" x2="10" y2="17"></line>
                                  <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.div variants={itemVariants} className="pt-3">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex gap-3">
                      <div className="flex-shrink-0">
                        <CheckIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Properties with high-quality images receive up to 95% more views. Add at least 5 images for better results.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
              
              {/* Success message after submission */}
              {isCompleted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <CheckIcon className="w-8 h-8 text-green-500 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Listing Created Successfully!</h3>
                  <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
                    Your property listing has been created and is now available for potential buyers to view.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Form navigation */}
          {!isCompleted && (
            <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-700 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="btn btn-outline"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn btn-primary"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Listing...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-4 h-4" />
                      Create Listing
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default MainFeature;
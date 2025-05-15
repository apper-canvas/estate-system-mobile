/**
 * Property Service - Handles all property-related API calls
 */

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Table name from the provided schema
const TABLE_NAME = 'property';

/**
 * Fetch properties with optional filtering
 * @param {Object} options - Filter options
 * @returns {Promise<Array>} - Array of property objects
 */
export const fetchProperties = async (options = {}) => {
  try {
    const apperClient = getApperClient();
    const { searchQuery = '', propertyType = '', limit = 20, offset = 0 } = options;
    
    // Build the query params
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "title" } },
        { Field: { Name: "location" } },
        { Field: { Name: "price" } },
        { Field: { Name: "bedrooms" } },
        { Field: { Name: "bathrooms" } },
        { Field: { Name: "area" } },
        { Field: { Name: "type" } },
        { Field: { Name: "image" } },
        { Field: { Name: "is_favorite" } }
      ],
      where: [],
      pagingInfo: {
        limit,
        offset
      }
    };
    
    // Add search filter if provided
    if (searchQuery) {
      params.whereGroups = [{
        operator: "OR",
        subGroups: [
          {
            conditions: [
              {
                FieldName: "title",
                operator: "Contains",
                values: [searchQuery]
              }
            ],
            operator: ""
          },
          {
            conditions: [
              {
                FieldName: "location",
                operator: "Contains",
                values: [searchQuery]
              }
            ],
            operator: ""
          }
        ]
      }];
    }
    
    // Add property type filter if not 'all'
    if (propertyType && propertyType !== 'all') {
      params.where.push({
        fieldName: "type",
        Operator: "ExactMatch",
        values: [propertyType]
      });
    }

    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    
    if (!response || !response.data) {
      return [];
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

/**
 * Get a single property by ID
 * @param {number} propertyId - The ID of the property to retrieve
 * @returns {Promise<Object>} - Property object
 */
export const getPropertyById = async (propertyId) => {
  try {
    const apperClient = getApperClient();
    
    const response = await apperClient.getRecordById(TABLE_NAME, propertyId);
    
    if (!response || !response.data) {
      return null;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching property with ID ${propertyId}:`, error);
    throw error;
  }
};

/**
 * Toggle favorite status for a property
 * @param {number} propertyId - The ID of the property
 * @param {boolean} isFavorite - New favorite status
 * @returns {Promise<Object>} - Updated property object
 */
export const toggleFavorite = async (propertyId, isFavorite) => {
  try {
    const apperClient = getApperClient();
    
    // First get the current property to avoid overwriting other fields
    const property = await getPropertyById(propertyId);
    
    if (!property) {
      throw new Error('Property not found');
    }
    
    // Update only the is_favorite field
    const params = {
      records: [
        {
          Id: propertyId,
          is_favorite: isFavorite
        }
      ]
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, params);
    
    if (!response || !response.success) {
      throw new Error('Failed to update property');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error toggling favorite for property ${propertyId}:`, error);
    throw error;
  }
};

/**
 * Create a new property listing
 * @param {Object} propertyData - New property data
 * @returns {Promise<Object>} - Created property object
 */
export const createProperty = async (propertyData) => {
  try {
    const apperClient = getApperClient();
    
    const response = await apperClient.createRecord(TABLE_NAME, { records: [propertyData] });
    
    if (!response || !response.success) {
      throw new Error('Failed to create property');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};
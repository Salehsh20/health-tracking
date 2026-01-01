const API_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Auth APIs
export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  getProfile: async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: getAuthHeaders()
    });
    return response.json();
  }
};

// Activities APIs
export const activitiesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/activities`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  create: async (activityData) => {
    const response = await fetch(`${API_URL}/activities`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(activityData)
    });
    return response.json();
  },

  update: async (id, activityData) => {
    const response = await fetch(`${API_URL}/activities/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(activityData)
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/activities/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.json();
  }
};

// Meals APIs
export const mealsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/meals`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  create: async (mealData) => {
    const response = await fetch(`${API_URL}/meals`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(mealData)
    });
    return response.json();
  },

  update: async (id, mealData) => {
    const response = await fetch(`${API_URL}/meals/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(mealData)
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/meals/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.json();
  }
};

// Exercises APIs
export const exercisesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/exercises`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  create: async (exerciseData) => {
    const response = await fetch(`${API_URL}/exercises`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(exerciseData)
    });
    return response.json();
  },

  update: async (id, exerciseData) => {
    const response = await fetch(`${API_URL}/exercises/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(exerciseData)
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/exercises/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.json();
  }
};

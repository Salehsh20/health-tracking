import { demoAPI, isDemoSession, findDemoAccount } from './demoData';

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
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Signup API error:', error);
      return { success: false, message: 'Network error' };
    }
  },

  login: async (credentials) => {
    // Hardcoded demo accounts work without the backend running
    if (findDemoAccount(credentials.email, credentials.password)) {
      return demoAPI.auth.login(credentials.email, credentials.password);
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login API error:', error);
      return { success: false, message: 'Network error' };
    }
  },

  getProfile: async () => {
    if (isDemoSession()) return demoAPI.auth.getProfile();

    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get profile API error:', error);
      return { success: false, message: 'Network error' };
    }
  }
};

// Wraps a set of endpoints so they are served from the in-browser demo store
// whenever the user is logged in with a hardcoded demo account.
const withDemoFallback = (demoHandlers, realHandlers) =>
  Object.fromEntries(
    Object.entries(realHandlers).map(([name, realFn]) => [
      name,
      async (...args) => (isDemoSession() ? demoHandlers[name](...args) : realFn(...args))
    ])
  );

// Activities APIs
export const activitiesAPI = withDemoFallback(demoAPI.activities, {
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
});

// Meals APIs
export const mealsAPI = withDemoFallback(demoAPI.meals, {
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
});

// Exercises APIs
export const exercisesAPI = withDemoFallback(demoAPI.exercises, {
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
});

// Admin APIs
export const adminAPI = withDemoFallback(demoAPI.admin, {
  getAllUsers: async () => {
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  getStats: async () => {
    const response = await fetch(`${API_URL}/admin/stats`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  deleteUser: async (id) => {
    const response = await fetch(`${API_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.json();
  },

  updateUserRole: async (id, role) => {
    const response = await fetch(`${API_URL}/admin/users/${id}/role`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role })
    });
    return response.json();
  }
});

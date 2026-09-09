const getApiBaseUrl = () => {
  // If user supplied an explicit VITE_API_URL environment variable (e.g. on Vercel)
  if (import.meta.env.VITE_API_URL) {
    const raw = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
    return raw.endsWith('/api') ? raw : `${raw}/api`;
  }

  // If running in production (deployed on Vercel or any live domain)
  if (typeof window !== 'undefined' && window.location && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://fetchmart-qvg7.onrender.com/api';
  }

  // Local development default
  return 'http://localhost:5000/api';
};

export const API_BASE_URL = getApiBaseUrl();
export default API_BASE_URL;

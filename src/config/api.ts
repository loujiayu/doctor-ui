// Configuration for API endpoints

const isDevelopment = false;

// Use localhost for development, production URL otherwise
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000'
  : 'https://vikimt-85352025976.us-central1.run.app';

// Export other API-related configuration as needed

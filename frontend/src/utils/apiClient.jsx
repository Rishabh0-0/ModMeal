import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// Axios instance for API calls
// Defined once, so its reference is stable unless AuthProvider re-mounts unnecessarily
const apiClient = axios.create({
  baseURL: API_URL,
});

export default apiClient;

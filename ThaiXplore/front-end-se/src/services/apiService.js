import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// ฟังก์ชันสำหรับการดึงข้อมูล
export const fetchData = async (endpoint) => {
    try {
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
};

// ฟังก์ชันสำหรับการส่งข้อมูล
export const postData = async (endpoint, data) => {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("Error posting data", error);
      throw error;
    }
};

// ฟังก์ชันสำหรับการส่งข้อมูล
export const putData = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error puting data", error);
    throw error;
  }
};
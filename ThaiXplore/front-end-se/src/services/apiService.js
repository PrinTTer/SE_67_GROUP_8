import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

// ฟังก์ชันสำหรับการส่งข้อมูล
export const deleteData = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error deleting data", error);
    throw error;
  }
};

export const postDataWithFiles = async (endpoint, files, data, title) => {
  try {
    const formData = new FormData();
    formData.append("title", title);

    if(data){
      formData.append("data", JSON.stringify(data));
    }

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await apiClient.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file", error);
    throw error;
  }
};



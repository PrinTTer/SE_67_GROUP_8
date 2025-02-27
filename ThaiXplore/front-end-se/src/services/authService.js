export const isAuthenticated = () => {
    // เช็คว่า token หรือข้อมูลผู้ใช้ยังคงอยู่หรือไม่
    return localStorage.getItem("auth_token") ? true : false;
  };
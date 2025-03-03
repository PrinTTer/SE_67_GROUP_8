export const isAuthenticated = () => {
  // ตรวจสอบว่ามีคุกกี้ที่ชื่อ "token" หรือไม่
  return document.cookie.split("; ").some(cookie => cookie.startsWith("token="));
};
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProvinceDropdown = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(""); // เพิ่ม state สำหรับเก็บค่าที่เลือก
    const navi = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
      );
      setData(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedProvince(event.target.value);
    
    navi(`/listpage/${event.target.value}`)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col items-center mt-5">
      
      <select
        className="w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={selectedProvince} 
        onChange={handleSelectChange} 
      >
        <option value="">--Select Province--</option>
        {data.map((province) => (
          <option key={province.id} value={province.name_en}>
            {province.name_th} ({province.name_en})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceDropdown;

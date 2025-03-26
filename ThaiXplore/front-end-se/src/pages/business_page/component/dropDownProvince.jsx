import { useState, useEffect } from "react";
import axios from "axios";

export const ProvinceDropdown = (prop) => {
  const { selectedProvince, onProvinceChange } = prop;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col mt-5">
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={selectedProvince}
        onChange={(e) => onProvinceChange(e.target.value)} 
      >
        {data.map((province) => (
          <option key={province.id} value={province.name_en}>
            {province.name_th} ({province.name_en})
          </option>
        ))}
      </select>
    </div>
  );
};

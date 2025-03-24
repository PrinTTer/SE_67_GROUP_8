import { Link } from 'react-router-dom';

export const PostCardPackage = ({ name, id, description, date }) => {
  const link = `/DetailPackage/${id}`;

  const formattedDate = new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <Link to={link} className="bg-white shadow rounded-xl p-4 hover:shadow-md transition-all">
      <img
        src="https://i.pinimg.com/736x/a1/06/c7/a106c7e0256afac9d2e4295c42bf0163.jpg"
        className="w-full h-40 object-cover rounded-lg mb-3"
        alt={name}
      />
      <div className="flex items-start justify-between mb-2">
      <h3 className="text-xl font-bold text-gray-800 hover:text-amber-600 transition-colors">{name}</h3>
        <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider">Premium</span>
      </div>
      
      <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
      <p className="text-gray-600 text-sm mt-2">{description?.slice(0, 80) || "No description"}</p>
    </Link>
  );
};

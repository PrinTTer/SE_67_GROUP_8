const PackageCard = ({ data }) => {
    const { image, title, subtitle, description } = data;
  
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-md font-semibold truncate">{title}</h3>
          <p className="text-sm text-blue-600 mt-1">{subtitle}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
        </div>
      </div>
    );
  };
  
  export default PackageCard;
  
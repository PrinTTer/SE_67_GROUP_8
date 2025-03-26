const PackageCard = ({ data }) => {
  const { image, title, subtitle, description, price } = data;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="w-1 h-5 bg-amber-500 mr-2"></div>
          <h3 className="text-xl font-semibold text-gray-800 truncate">{title}</h3>
        </div>
        
        <p className="text-sm text-blue-600 mb-4 font-medium">{subtitle}</p>
        
        <div className="h-px w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 my-4"></div>
        
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{description}</p>
        
        <div className="mt-5 flex justify-between items-center">
          {/* <span className="text-lg font-bold text-gray-800">{price}</span> */}
          <span className="text-xs text-amber-600 font-medium tracking-wider">price : {price} BATH</span>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
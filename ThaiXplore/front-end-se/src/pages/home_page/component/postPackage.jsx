import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck, faTimes, faLocationDot, faImage } from '@fortawesome/free-solid-svg-icons';

export const PostCardPackage = ({ name, id, description, date, media }) => {
  const link = `/DetailPackage/${id}`;

  const formattedDate = new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <Link to={link} className="bg-white shadow rounded-xl p-4 hover:shadow-md transition-all">
      <div className="w-full aspect-[3/2] bg-gray-100 flex items-center justify-center relative overflow-hidden rounded-lg mb-2">
          {media.length > 0 ? (

            <div className="w-full h-full overflow-hidden rounded-l-lg">
              <img
                src={`http://localhost:3000/public/uploads/businesses/images/${media[0]}`}
                alt="main-img"
                className="w-full h-full object-cover"

              />
            </div>



          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
              <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
              <span className="text-sm">No picture</span>
            </div>
          )}

          {/* {category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {category}
                      </span>
                    </div>
                  )} */}
        </div>
      <div className="flex items-start justify-between mb-2">
      <h3 className="text-xl font-bold text-gray-800 hover:text-amber-600 transition-colors">{name}</h3>
        <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider">Premium</span>
      </div>
      
      <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
      <p className="text-gray-600 text-sm mt-2">{description?.slice(0, 80) || "No description"}</p>
    </Link>
  );
};
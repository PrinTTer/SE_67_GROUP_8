import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser as faCircleUserRegular } from '@fortawesome/free-regular-svg-icons';
import { faFileInvoiceDollar, faBuilding, faUserGroup  } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const SideBarWithRole = (prop) =>{
    const {role} = prop;
    switch (role){
        case "tourish":
            return(
                <Link to={"/profile"} className=" p-1.5  hover:bg-gray-300 rounded-full ">
                    <FontAwesomeIcon icon={faCircleUserRegular} size="lg" className="ml-1"/>
                    <span className="text-lg ml-2">Profile</span>
                </Link>
            );
        case "entrepreneur":
            return(
                <>
                    <Link to={"/profile"} className="block p-1.5  hover:bg-gray-300 rounded-full ">
                        <FontAwesomeIcon icon={faCircleUserRegular} size="lg" className="ml-1"/>
                        <span className="text-lg ml-2">Profile</span>
                    </Link>
                    <Link to={null} className="block p-1.5  hover:bg-gray-300 rounded-full ">
                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" className="ml-1"/>
                        <span className="text-lg ml-2">Quotation</span>
                    </Link>
                    <Link to={"/profile/mainBusiness"} className="block p-1.5  hover:bg-gray-300 rounded-full ">
                        <FontAwesomeIcon icon={faBuilding} size="lg" className="ml-1"/>
                        <span className="text-lg ml-2">Business</span>
                    </Link>
                </>
                
            );
        case "admin":
            return(
                <>
                <Link to={"/profile"} className="block p-1.5  hover:bg-gray-300 rounded-full ">
                    <FontAwesomeIcon icon={faCircleUserRegular} size="lg" className="ml-1"/>
                    <span className="text-lg ml-2">Profile</span>
                </Link>
                <Link to={"/usermanage"} className="block p-1.5  hover:bg-gray-300 rounded-full ">
                    <FontAwesomeIcon icon={faUserGroup} size="lg" className="ml-1"/>
                    <span className="text-lg ml-2">User Management</span>
                </Link>
                <Link to={"/profile"} className="block p-1.5  hover:bg-gray-300 rounded-full ">
                    <FontAwesomeIcon icon={faBuilding} size="lg" className="ml-1"/>
                    <span className="text-lg ml-2">Business Management</span>
                </Link>
                </>
            );

    }
    

}
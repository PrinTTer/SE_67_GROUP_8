import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser as faCircleUserRegular } from '@fortawesome/free-regular-svg-icons';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const SideBarWithRole = (prop) =>{
    const {role} = prop;
    switch (role){
        case "tourish":
            return(
                <Link to={"/profile"} className=" p-1.5 hover:bg-gray-300 rounded-full">
                    <FontAwesomeIcon icon={faCircleUserRegular} size="lg"/>
                    <span className="text-lg"> Profile</span>
                </Link>
            );
        case "entrepreneur":
            return(
                <>
                    <Link to={"/profile"} className="block p-1.5 hover:bg-gray-300 rounded-full">
                    <FontAwesomeIcon icon={faCircleUserRegular} size="lg"/>
                    <span className="text-lg"> Profile</span>
                    </Link>
                    <Link to={null} className="block p-1.5 hover:bg-gray-300 rounded-full">
                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg"/>
                        <span className="text-lg"> Quotation</span>
                    </Link>
                </>
                
            );

    }
    

}
import { BusinessInformation } from "./component/BusinessDetail";

const CreateBusiness = () => {
    return(
        <>
        {/* bg-gray-200 */}
            <div className="flex flex-5 bg-white">
                <BusinessInformation />
            </div>
        </>
    );
}

export default CreateBusiness;
export const CreateInformation = (prop) => {
    const {title , data, placeholder, handleChange , id} = prop;
    return (
        <div className="bg-white flex justify-between px-10 py-5 w-5xl drop-shadow-lg rounded-md">
            <div className="flex flex-col gap-2">
                <div className="font-semibold">
                    {title}
                </div>
                <div className="border border-gray-300 rounded-md">
                    <input id={id} onChange={handleChange} className="focus:outline-0 px-4 py-2 w-xl" type={id} placeholder={placeholder}/>
                </div>
            </div>
        </div>
    );
}
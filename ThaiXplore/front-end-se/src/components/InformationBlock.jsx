export const CreateInformation = (prop) => {
    const { title, placeholder, handleChange, id } = prop;
    return (
        <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-700">{title}</label>
            <input
                id={id}
                onChange={handleChange}
                placeholder={placeholder}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
            />
        </div>
    );
};

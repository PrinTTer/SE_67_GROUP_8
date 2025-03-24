const BookingForm = () => {
    return(
        <div className="flex flex-1 w-full h-full bg-gray-50">
            <div className="w-full max-w-5xl mx-auto my-8 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {/* Header with gradient background matching BookingDetail */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 text-white mr-3">
                            <span className="text-xl">📝</span>
                        </div>
                        <h2 className="text-xl font-bold">Booking Form</h2>
                    </div>
                </div>
                
                {/* Form content with improved spacing and design */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField 
                            label="Check-in Date" 
                            type="date" 
                            icon="📅" 
                        />
                        <TextField 
                            label="Check-out Date" 
                            type="date" 
                            icon="📅" 
                        />
                        <TextField 
                            label="First Name" 
                            placeholder="John" 
                            icon="👤" 
                        />
                        <TextField 
                            label="Last Name" 
                            placeholder="Doe" 
                            icon="👤" 
                        />
                        <TextField 
                            label="Email" 
                            placeholder="example@gmail.com" 
                            type="email" 
                            icon="✉️" 
                        />
                        <TextField 
                            label="Phone Number" 
                            placeholder="+66 x-xxxx-xxxx" 
                            type="tel" 
                            icon="📱" 
                        />
                        <div className="col-span-1 md:col-span-2">
                            <TextArea 
                                label="Special Requests" 
                                placeholder="Any additional information or special requests..." 
                                icon="📋" 
                            />
                        </div>
                    </div>
                    
                    {/* Submit button with gradient that matches the header */}
                    <div className="mt-8 flex justify-end">
                        <button 
                            type="submit" 
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-md shadow-sm hover:from-amber-600 hover:to-amber-700 transition-all duration-200 flex items-center"
                        >
                            <span className="mr-2">Confirm Booking</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>
                
                {/* Footer section matching BookingDetail */}
                <div className="border-t border-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                            All fields marked with * are required
                        </span>
                        <div className="text-sm font-medium text-amber-600">
                            ThaiXplore
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced TextField component with icons and better styling
export const TextField = (prop) => {
    const { label, placeholder, type = "text", icon } = prop;
    return(
        <div className="relative">
            <label className="text-gray-700 font-medium block mb-2 flex items-center">
                {icon && <span className="mr-2">{icon}</span>}
                {label}
            </label>
            <input 
                type={type} 
                className="w-full p-3 text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" 
                placeholder={placeholder}
            />
        </div>
    );
}

// New TextArea component for longer text inputs
export const TextArea = (prop) => {
    const { label, placeholder, icon } = prop;
    return(
        <div className="relative">
            <label className="text-gray-700 font-medium block mb-2 flex items-center">
                {icon && <span className="mr-2">{icon}</span>}
                {label}
            </label>
            <textarea 
                className="w-full p-3 min-h-32 text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 placeholder-gray-400" 
                placeholder={placeholder}
            />
        </div>
    );
}

export default BookingForm;
const BookingForm = () => {
    return(
        <div className="flex flex-1 w-full h-full bg-gray-50">
            <div className="w-full my-8 mx-16 bg-white border-2 rounded-lg shadow-black shadow-md ">
                <div className="grid grid-cols-2 grid-flow-row m-8 gap-10">
                    <TextField label="Check-in Date"/>
                    <TextField label="Check-out Date"/>
                    <TextField label="First Name"/>
                    <TextField label="Last Name"/>
                    <TextField label="Email" ph="example@gmail.com"/>
                    <TextField label="Phone Number"/>
                    <div className="col-span-2">
                        <TextField label="Description"/>
                    </div>
                    
                </div>
            </div>
        </div>
    );

}

export const TextField = (prop) => {
    const { label, ph } = prop;
    return(
        <div>
            <label className="text-2xl font-medium block">{label}</label>
            <input type="text" className="w-3/4 p-2 mt-2 text-xl border rounded-md" placeholder={ph}/>

        </div>
    );
}

export default BookingForm;

const BookingDetail = (prop) => {
    const { business, index } = prop;

    return(
        <div className="flex flex-1 flex-col w-full h-full bg-[#BCD1FB] border-r-2">
            <div className="grid grid-cols-1 gap-4 m-4">
                <div>
                    <h1>Image</h1>
                </div>
                <div>
                    <h1 className="font-bold">Room Type</h1>
                    <h1 className="">Superior Double</h1>
                </div>
                <div>
                    <h1 className="font-bold">Size (sq.m)</h1>
                    <h1 className="">20</h1>
                </div>
                <div>
                    <h1 className="font-bold">Number of guests/room</h1>
                    <h1 className="">2 Unit</h1>
                </div>
                <div>
                    <h1 className="flex flex-col font-bold">Room Facilities</h1>
                    <h1 className="">Air Conditioner</h1>
                </div>
                <div>
                    <h1 className="font-bold">Price</h1>
                    <h1 className="">1300 THB</h1>
                </div>
                
                
                
                
            </div>
        </div>
    );

}

export default BookingDetail;
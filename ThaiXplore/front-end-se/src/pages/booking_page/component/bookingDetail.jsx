
const BookingDetail = (prop) => {
    const { business, index } = prop;

    return(
        <div className="flex flex-1 flex-col w-full h-full bg-[#BCD1FB] border-r-2">
            <div className="grid grid-cols-1 gap-4 m-4">
                <div>
                    <img className="rounded-md" src={business.image.main}/>
                </div>
                <div>
                    <h1 className="font-bold">Room Type</h1>
                    <label>{business.service[index].roomType}</label>
                </div>
                <div>
                    <h1 className="font-bold">Size (sq.m)</h1>
                    <label>{business.service[index].size} sq.m</label>
                </div>
                <div>
                    <h1 className="font-bold">Number of guests/room</h1>
                    <label>{business.service[index]["Number of guests/room"]}</label>
                </div>
                <div>
                    <h1 className="flex flex-col font-bold">Room Facilities</h1>
                    <label>{business.service[index]["Room Facilities"]}</label>
                </div>
                <div>
                    <h1 className="font-bold">Price</h1>
                    <label>{business.service[index].price}</label>
                </div>
                
                
                
                
            </div>
        </div>
    );

}

export default BookingDetail;
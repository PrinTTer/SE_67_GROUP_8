const data =[
        {
            "name" : "Hotel A",
            "type" : "hotel",
            "address" : "Kabi"
        },
        {
            "name" : "Hotel B",
            "type" : "hotel",
            "address" : "KUKPS"
        },
        {
            "name" : "Event C",
            "type" : "event",
            "address" : "KUBK"
        },
        {
            "name" : "Hotel D",
            "type" : "hotel",
            "address" : "Bangkok"
        },
        {
            "name" : "Food F",
            "type" : "food",
            "address" : "Bangkok"
        }
]
const types = ['hotel' , 'event' , 'food' ,'car'];
export const getData = (type) =>{
    
    let business;
    console.log(type)
    if(types.includes(type))
    {
        business = Object.values(data).filter(item => item.type == type);
    }
    else
    {
        business = Object.values(data)
    }
    
    return business ;
}


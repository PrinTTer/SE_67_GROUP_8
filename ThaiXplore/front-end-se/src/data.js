const data ={
        "1":{
            "name" : "Hotel A",
            "type" : "hotel"
        },
        "2":{
            "name" : "Hotel B",
            "type" : "hotel"
        },
        "3":{
            "name" : "Event C",
            "type" : "event"
        },
        "4":{
            "name" : "Hotel D",
            "type" : "event"
        },
        "5":{
            "name" : "Food F",
            "type" : "food"
        }
}

export const getData = ({type}) =>{
    let business
    if(type != null)
    {
        business = Object.values(data).filter(item => item.type === type);
    }
    else
    {
        business = Object.values(data)
    }
    
    return business ;
}


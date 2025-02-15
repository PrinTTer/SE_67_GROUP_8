const data =[
        {
            "name" : "Hotel A",
            "type" : "hotel",
            "address" : "Kabi",
            "image" : {
                            "main" : "https://i.pinimg.com/736x/a1/06/c7/a106c7e0256afac9d2e4295c42bf0163.jpg",
                            "second" : "https://i.pinimg.com/736x/6c/88/6a/6c886a58955b62b80b29d29a69432904.jpg",
                            "thrid" : "https://i.pinimg.com/736x/28/43/33/2843338424bf5bfe0bfa8ce859f6bb06.jpg",
                            "fourth" : "https://i.pinimg.com/736x/1a/d6/bf/1ad6bfed676eed221798220774924745.jpg"
                        }
        },
        {
            "name" : "Hotel B",
            "type" : "hotel",
            "address" : "KUKPS",
            "image" : {
                            "main" : "https://i.pinimg.com/736x/a1/06/c7/a106c7e0256afac9d2e4295c42bf0163.jpg",
                            "second" : "https://i.pinimg.com/736x/6c/88/6a/6c886a58955b62b80b29d29a69432904.jpg",
                            "thrid" : "https://i.pinimg.com/736x/28/43/33/2843338424bf5bfe0bfa8ce859f6bb06.jpg",
                            "fourth" : "https://i.pinimg.com/736x/1a/d6/bf/1ad6bfed676eed221798220774924745.jpg"
                        }
        },
        {
            "name" : "Event C",
            "type" : "event",
            "address" : "KUBK",
            "image" : {
                            "main" : "https://i.pinimg.com/736x/d2/c8/b8/d2c8b883a9ba9907b12a73f76c18f385.jpg",
                            "second" : "https://i.pinimg.com/736x/bf/08/dc/bf08dc21abb41dff6b17e7d8d82cfbef.jpg",
                            "thrid" : "https://i.pinimg.com/736x/4c/8e/24/4c8e24335f110f6abdf3f938ffabc0d0.jpg",
                            "fourth" : "https://i.pinimg.com/736x/0d/b2/58/0db258db5e2d343fc930aeef0ead3a38.jpg"
                        }
        },
        {
            "name" : "Hotel E",
            "type" : "hotel",
            "address" : "Bangkok",
            "image" : {
                            "main" : "https://i.pinimg.com/736x/a1/06/c7/a106c7e0256afac9d2e4295c42bf0163.jpg",
                            "second" : "https://i.pinimg.com/736x/6c/88/6a/6c886a58955b62b80b29d29a69432904.jpg",
                            "thrid" : "https://i.pinimg.com/736x/28/43/33/2843338424bf5bfe0bfa8ce859f6bb06.jpg",
                            "fourth" : "https://i.pinimg.com/736x/1a/d6/bf/1ad6bfed676eed221798220774924745.jpg"
                        }
        },
        {
            "name" : "Food F",
            "type" : "food",
            "address" : "Bangkok",
            "image" : {
                            "main" : "https://i.pinimg.com/736x/e2/19/2f/e2192fb83071fdc2a80c2f1b092f9e5a.jpg",
                            "second" : "https://i.pinimg.com/736x/67/45/91/6745910f00688d4e49ab86be2e5db06b.jpg",
                            "thrid" : "https://i.pinimg.com/736x/b5/53/6c/b5536c69aeaaa2026c9e7cb110f04095.jpg",
                            "fourth" : "https://i.pinimg.com/736x/56/fd/90/56fd9032c6eb2c1ad41ca5d2cb1dbdf1.jpg"
                        }
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

export const getImage =(name)=> {
    
    let business;
    business=data.find(item => item.name == name);
    return business;
}

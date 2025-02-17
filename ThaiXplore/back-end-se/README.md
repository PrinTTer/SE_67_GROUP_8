## Installation & Run

```bash
git clone https://github.com/PrinTTer/SE_67_GROUP_8.git
cd back-end-se
npm install
npm start
```


## Structure

```bash
├── src
   ├── index.ts
   ├── controllers         
   │   ├── authentication.controller.ts
   │   ├── booking.controller.ts
   │   ├── business.controller.ts
   │   ├── businessDetail.controller.ts
   │   ├── car.controller.ts
   │   ├── course.controller.ts
   │   ├── event.controller.ts
   │   ├── package.controller.ts
   │   ├── room.controller.ts
   │   └── user.controller.ts  
   │   
   ├── models
   │   ├── product.ts   
   │   └── cart.ts     // Models for our application
   ├── router   
   │   ├── product_route.ts
   │   ├── index.ts    
   │   └── cart_route.ts
   ├── helpers    
   │   └── pagination.ts
   ├── configs    
       └── config.ts
```

# Todo

- [ ] Swagger api documentation
- [ ] Unit test

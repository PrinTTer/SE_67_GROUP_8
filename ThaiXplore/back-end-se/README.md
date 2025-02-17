## Installation & Run

```bash
git clone https://github.com/PrinTTer/SE_67_GROUP_8.git
cd ThaiXplore/back-end-se
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
   ├── factory  
   │   └── BusinessCategoryFactory.ts
   │
   ├── helpers
   │   ├── dateFormat.ts   
   │   └── encryption.ts
   │
   ├── interfaces       
   │   └── businessCategoryStrategy.ts
   │
   ├── middlewares
   │   ├── isAuthentication.middleware.ts    
   │   └── isOwner.middleware.ts
   │
   ├── models
   │   ├── booking.ts
   │   ├── business.ts
   │   ├── businessDetail.ts
   │   ├── car.ts
   │   ├── course.ts
   │   ├── event.ts
   │   ├── package.ts
   │   ├── room.ts   
   │   └── users.ts
   │
   ├── routes   
   │   ├── authentication.routes.ts
   │   ├── booking.routes.ts
   │   ├── business.routes.ts
   │   ├── businessDetail.routes.ts
   │   ├── car.routes.ts
   │   ├── course.routes.ts
   │   ├── event.routes.ts
   │   ├── index.ts
   │   ├── package.routes.ts
   │   ├── room.routes.ts    
   │   └── users.routes.ts
   │
   ├── strategies
   │   ├── CarRentalCategory.ts
   │   ├── EventCategory.ts
   │   ├── HotelCategory.ts    
   │   └── RestaurantCategory.ts
   │
   └── configs    
       └── config.ts
```

# Todo
- [x] User Authentication.
- [x] An entrepreneur can create a business.
- [x] Businesses can create packages or services.
- [ ] An entrepreneur can provide quotations to other entrepreneurs.
- [x] Tourist users can book packages or services.
- [ ] User Notification.
- [ ] CRUD all models.
- [ ] Swagger API documentation.
- [ ] Unit test.

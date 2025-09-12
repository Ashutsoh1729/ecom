Here i will mention my current state of the project and what are the features i am plannig to roll out and their status. It will help to understand the project wholly.

# Done

1. Authentication with auth.js, jwt token session management
2. Creatd the database schema using drizzle and connected it with neon database
3. Role of user as "Buyer" and "Seller"
4. Adding shopping-bag-page, account page with all of their components ( Currently making the ui part, will add the functionality later )
5. Upgrading the role from "Buyer" to "Seller", added zod for validating data
6. Protecting pages like dashboard based on role
7. Sidebar, store route, products route

# Currently Working

1. Making the dashboard
   a. Adding products, we will use modals to add products

# Planning

1. Creating a modal to add product, it will be devided into 3 parts
   a. taking product info
   b. taking it's variants value
   c. taking the category and tags value
2. Creating a indivisual product viewing page
3. Product table

4. Search bar, searching functionality using tags of the products

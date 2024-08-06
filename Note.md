# Project: Style, Hooks, Form, List, Routing, Context, and Fetch (axios)
## Data
1. Each product has following properties
```JavaScript
Product{
  id: string,
  name: string,
  price: number,
  origin: string,
  instock: boolean
}
```

## Implement a React app containing multiple components
1. Home
* AddNewProduct Button: To add a new product. When clicking on this button, the App should move to the component `AddNewProduct`
* ProductList component: The component should load all products and then show only products which are in stock.
* Logout Button: To log out. You should clear the localstorage to show the Login page again.
2. AddNewProduct component
* Should contain input for entering the product's information
* Submit button: When clicking on this button, the new Product is added to the list, and the App will navigate to the Home page
3. ProductDetails component
* Show the Product's information
* Edit button: When clicking on this button, the App should navigate to the component `EditProduct`
* Delete button: When clicking on this button, the App should alert to confirm the decision. If the user confirm, the App will send the request to server to delete this product. Please handle the return's value from the server.
4. EditProduct component
* Should contain all input to allow users to modify the product's information. In the beginning, these inputs should have the current product's value.
* Submit button: When clicking on this button, the current product is updated to the list, and the app will navigate to the Home page
5. Login component
* Email Input: Users can enter an email by using this input
* Password Input: Users can enter the password here
* Login Button: When users click on this button, the page will navigate to the Home page if logged in successfully. Otherwise, just alert the error and stay in the Login page.
* SignUp Button: Clicking on this button, the app will navigate to the SignUp component.
* The App always shows this Login component the first time. After logging in successfully, the token should be saved in the localstorage. When you start the App again, if the token exists in the localstorage, navigate to the Home page instead of the Login Page. 
6. SignUp component
* Email Input: To enter an email
* Password Input: To enter a password
* Repassword Input: To repeat the password
* Register Button: When clicking on this button, the client sends a request to register the user. If successful, the client should navigate to the Login page. Otherwise, just alert the error and stay in the current page.
7. (Optional for MSD) Implement the unit test for some components. Please refer to this site: https://jestjs.io/docs/tutorial-react
8. (Compro): Implement the chat assistance in the page which answer some function questions like "how is the weather today in Iowa". Please use OpenAI to get the answer.
9. (Compro): Implement the verification for the password to satify the following conditions when signing up.
- At least 10 letters or digit
- Contains at least one special character
- Has both lower case and upper case letters

## Assume that you have the following restful APIs
1. POST /signup: To register a user. The body of this request should includes an email and password. If successful, the body return {success: true}. Otherwise, it return {success: false, error: <message>}
2. POST /login: To log in. The body of this request should contain the email and password. The backend will return {success: true, token: <any string>} if this information is valid. Otherwise, it returns {success: false, error: <message>}.
3. POST /product: To add a new product. The body of this request should contain the product's information. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you log in successfully). If successful, the body return {success: true, data: <new Product>}. Otherwise, it return {success: false, error: <message>}
4. PUT /products/{id}: To update an existing product. The body of this request should contain the product's information. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you log in successfully). If successful, the body return {success: true}. Otherwise, it return {success: false, error: <message>}
5. DELETE /products/{id}: To add a new product. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you log in successfully). If successful, the body return {success: true}. Otherwise, it return {success: false, error: <message>}
6. GET /products: To get all products. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you log in successfully). If successful, the body return {success: true, data: <list of products>}. Otherwise, it return {success: false, error: <message>}

## You can create your own backend if you want
## If you have time, please try react-bootstrap to decorate your application
## You only need to demonstrate the program and answer my questions. You do not need to make any PPT files.
## Please prepare and submit the stable version by 10:00 PM the day before the presentation day
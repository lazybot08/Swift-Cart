# SwiftCart
Welcome to SwiftCart! This project was created as a hobby project using the MERN Stack, which is a powerful combination of technologies including MongoDB, Express, React, and Node.js. The website was designed to showcase my skills in full-stack web development, and was not created for any commercial purpose.

One of the key features of this E-Commerce website is its use of JWT token for authentication. This means that users can create an account and log in securely to access their account information. The express API sends the JWT token to the client as an HTTP-only cookie, ensuring that it is kept secure and cannot be accessed by third parties.

Although this E-Commerce website is a hobby project, I have put a lot of time and effort into making it functional and user-friendly.

## Frontend Deployment & Source Code
The frontend is deployed using the render.com service as a static website. 

Demo Link : https://e-commerce-frontend-yinf.onrender.com

Source Code : https://github.com/YashSharma2000/SwiftCart/tree/master/frontend
## Backend Deployment & Source Code
The backend is also deployed using render.com as a web service but on a different domain than the frontend domain. So for cross origin data sharing I have used cors middleware in expressJS. 

The API has features like login, logout, forgot password e.t.c for authentication. Furthermore features like pagination, search, filter e.t.c has also been implemented using ExpressJS.

Now I have sent JWT token as httpOnly cookie so to ensure that the browser receives the cookie successfully I have configured the cookie options with SameSite: 'none' & secure: 'true'.

Deployment Link : https://e-commerce-backend-y30k.onrender.com

Source-Code : https://github.com/YashSharma2000/SwiftCart/tree/master/backend

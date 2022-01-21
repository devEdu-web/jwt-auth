# JWT Authentication

I made this is a simple project so I could learn about register, login, and authentication using JWT. There isn't much to tell about it, it is very straightforward. The user can create an account and use it to log in to the application. 

At some point in this project, I had to do a lot of research about the best place to store the user's JWT token securely. Turns out I had the opportunity to learn about cookies, sessions, XSS, and CSRF attacks and dive more deeply into HTTP concepts. 

## Project flow

At first, the user must create an account, providing a name, an email, and a password. Then, his password is encrypted by BCRYPT and his credentials are saved into the database. After this process, he can now sign in.

The JWT token is generated when the user signs in, I set the token expiration to 60s for tests purposes. Then the application compares the token with a secret defined internally so the user can get access to the user page. If the token doesn't match the secret, an unauthorized response is sent. This token is stored inside a cookie which is returned to the user only through HTTP. After this, the user can access the user page without having to pass his credentials again.

***

## Technologies used on this project

1. NodeJS
2. Express
3. MongoDB
4. Mongoose
5. EJS

***

## What 
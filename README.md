#  EV-MANAGER API 

This is mainly an event management api. Also provides a way for restaurants and other food procurement 
establishments to advertise and market their services.

### Main Features:

-   User profile
-   Event creation and management
-   Restaurant/Food related establishment marketing


#### Setup

git clone the project, then run the below command in the root directory of the project.

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start() in the index.js file
3. Setup .env in the root
4. Add MONGO_URI with correct value
5. Add JWT_SECRET_ACCESS_TOKEN value
6. Add JWT_LIFETIME_ACCESS_TOKEN value

#### Other necessary environment variables

1. EMAIL_PASS(for the nodemailer service, you can decide to overwrite this and use your prefared mailing system)
2. EMAIL_ACCOUNT(for the nodemailer service, preferably outlook.com)
3. GOOGLE_CLIENT_ID
4. GOOGLE_CLIENT_SECRET
5. GOOGLE_CALLBACK_URL
6. CONFIRM_REGISTRATION_URL
7. RESET_PASSWORD_URL

**The below env values are just secret keys and lifetime values for jwt-tokens.

1. JWT_SECRET_CONFIRM_REG_TOKEN
2. JWT_LIFETIME_CONFIRM_REG_TOKEN
3. JWT_SECRET_FORGOT_PASSWORD
5. JWT_LIFETIME_FORGOT_PASSWORD
6. JWT_SECRET_EVENT_TOKEN
7. JWT_LIFETIME_EVENT_TOKEN

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit



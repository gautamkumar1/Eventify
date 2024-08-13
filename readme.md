
<div align="center">
<!-- Image of the heading -->
  <br />
<<<<<<< HEAD
    
  ![Eventify Home Page](https://github.com/user-attachments/assets/dde738a1-b5b7-4219-9ff5-91f623c473ac)

=======
    ![Eventify Home Page](https://github.com/user-attachments/assets/dde738a1-b5b7-4219-9ff5-91f623c473ac)

  
>>>>>>> 96c008184d03f06f4fd3bd4df480388e0305d055
  <br/>
  <br/>



  <br />

  <div>
    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="Javascript" />
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="Reactjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
    <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
    <img src="https://img.shields.io/badge/websocket-%23007dff.svg?style=for-the-badge&logo=websockets&logoColor=white" alt="WebSocket" />

  </div>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Eventify is a dynamic event management website designed to streamline the process of booking tickets for various events. Whether you're looking to attend a concert, conference, or any other event, Eventify offers an intuitive platform where users can explore available events, select their desired ticket types, and complete their bookings with ease. Our goal is to provide a seamless experience for both event organizers and attendees, making event management and ticket booking efficient and user-friendly.
<!-- Tech Stack -->
## <a name="tech-stack">⚙️ Tech Stack</a>

- JavaScript
- React Js
- Redux
- MySQL
- Shadcn UI
- Tailwind CSS
- Stripe
- Socket.io
<!-- Features -->

## <a name="features">🔋 Features</a>


👉 **Authentication**: Eventify implements robust, role-based authentication to ensure secure access to different parts of the platform. Our authentication system is built using JSON Web Tokens (JWTs), which securely store user credentials and enable protected route access.

### Key Features:
- **Real-Time Ticket Availability:** Stay updated with real-time ticket availability using WebSockets, ensuring that users can make informed decisions and avoid oversold events.

- **Role-Based Access Control:** Different roles such as Admin and User have specific permissions, ensuring that only authorized users can access certain features.

- **JWT Security:** Tokens are used to verify user identity and manage session information securely.

- **OAuth Integration:** Users can log in using their Google or Facebook accounts, thanks to seamless OAuth 2.0 integration with passport.js.

👉 **Admin Dashboard**: The Admin Dashboard in Eventify provides a comprehensive set of tools for managing events, tickets, and users. As an admin, you have full control over the platform, ensuring that all aspects of event management are handled efficiently.

## Key Features:

### Event Management:

  - **Create Event:** Easily add new events to the platform, specifying details like event name, date, location, and more.
  - **View Events:** Access a detailed list of all events, with options to view specific event details.
  - **Update Event:** Modify event information as needed to keep it up-to-date.
  - Delete Event: Remove events from the platform when they are no longer needed.

## Ticket Management:

  - **Create Ticket:** Generate tickets for different event categories, specifying details such as price, availability, and type.
  - **Update Ticket:** Edit ticket details to reflect changes in pricing, availability, or other parameters.
  - **Delete Ticket:** Remove tickets that are no longer required or need to be restructured.

### User Management:

  - **Update User:** Admins can update user details, ensuring accurate and current information.
  - **Delete User:** Remove users from the platform when necessary, maintaining a clean and organized user database.

👉 **User Dashboard**: The User Dashboard in Eventify provides users with a personalized view of their interactions with the platform. It offers convenient access to both their ticket history and upcoming events, making it easier to manage their event experiences.

## Key Features:

### Ticket History:

  - Users can view a detailed history of all the tickets they have booked, including event names, dates, ticket types, and prices.
  - This feature allows users to keep track of past events and their associated bookings.

### Upcoming Events:

  - Users can explore and view a list of upcoming events, with the option to book tickets in advance.
  - This ensures that users don't miss out on popular events and can plan their attendance ahead of time.


👉 **Stripe Payment Integration**: Eventify integrates Stripe for secure and seamless payment processing, allowing users to book tickets for events with confidence. The payment system is designed to ensure that users can easily complete transactions and receive prompt confirmation of their purchases.


👉 **Responsive Design**: Follows responsive design principles to ensure optimal user experience across devices, adapting seamlessly to different screen sizes and resolutions.


## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [mysql](https://www.mysql.com/downloads/)
**Cloning the Repository**

```bash
git clone https://github.com/gautamkumar1/Eventify.git
cd Eventify
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
PORT = 
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
JWT_SECRET=
SESSION_SECRET_KEY = 
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_ENDPOINT_KEY=
EMAIL_USER=
EMAIL_PASS=
```

**Running the Project**

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

# My React Firebase Posts App

A simple React app that allows users to log in, view posts, and like posts. Built with React, Firebase Firestore, and React Router.

## Features

- User authentication (Firebase)
- View all posts after login
- Like/unlike posts
- Responsive and clean UI

## Getting Started

### Prerequisites

- Node.js and npm installed
- A Firebase project with Firestore enabled

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Firebase Setup:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Authentication (Email/Password or your preferred method).
   - Copy your Firebase config and replace it in `src/config/firebase.ts`:

     ```ts
     // src/config/firebase.ts
     import { initializeApp } from "firebase/app";
     import { getFirestore } from "firebase/firestore";
     import { getAuth } from "firebase/auth";

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     };

     const app = initializeApp(firebaseConfig);
     export const db = getFirestore(app);
     export const auth = getAuth(app);
     ```

4. **Set Firestore Rules (for development):**

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /likes/{likeId} {
         allow read, write: if request.auth != null;
       }
       match /posts/{postId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

5. **Start the app:**

   ```sh
   npm start
   ```

6. **Open in your browser:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
  components/
    navbar.tsx
  pages/
    main/
      main.tsx
      post.tsx
      PostsList.tsx
      PostsList.css
    login.tsx
    create-post/
      create-post.tsx
  config/
    firebase.ts
  App.tsx
```

## Usage

- Register or log in.
- View all posts on the home page.
- Like or unlike posts.
- Create new posts (if implemented).

## Customization

- Update Firestore rules for production security.
- Style the app by editing `PostsList.css` and other CSS files.

## License

MIT

---

**Made with ❤️ using React and Firebase.**

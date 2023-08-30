# Restaurant Reservation System

## Overview

The Restaurant Reservation System is a robust and user-friendly application that leverages cutting-edge technologies to streamline the dining reservation process. Built with a focus on optimal user experience, the application allows customers to browse through a list of available restaurants and make reservations at their convenience.

## Technologies Used

- **Next.js**: A React-based framework optimized for server-rendered applications.
- **Firebase**: Firestore is used as the NoSQL database, and Firebase Authentication handles user authentication.
- **Tailwind CSS**: For utility-first CSS styling.
- **TypeScript**: For static type-checking.

## Architecture

The application adopts a component-based architecture facilitated by React. TypeScript is integrated to provide static type checking, which brings in robustness and maintainability to the code.

### User Authentication

Firebase Authentication is integrated to handle the authentication flow. The application uses a custom React context, `AuthContext`, to maintain the user state across different components. This enables conditional rendering and access controls based on the user's authentication status.

### Data Fetching and State Management

The application uses Next.js' server-side rendering features to fetch data from Firebase Firestore. State management is done using React's built-in `useState` and `useEffect` hooks.

### Modularization

Business logic related to Firebase queries and authentication flows is abstracted into separate modules, making the codebase clean and maintainable.

## Firebase Database Schema

### Collections

1. **Restaurants Collection**
    - `id`: Unique Identifier
    - `name`: Name of the restaurant
    - `location`: Geographical location
    - `cuisine`: Type of cuisine
    - `image`: Image URL
  
2. **Reservations Collection**
    - `userId`: Reference to the user
    - `restaurantId`: Reference to the restaurant
    - `time`: Time of the reservation
    - `date`: Date of the reservation
    - `numberOfPeople`: Number of people for the reservation

### Security Rules

Firestore security rules have been configured to ensure that only authenticated users can make reservations, and each user can only access their reservation data.

## Components

### `AuthModal`

A modal component that encapsulates the sign-in and sign-up options. It uses functions from an `authFunctions` module to handle the actual authentication.

### `Restaurant`

Each restaurant is a separate component, rendered as a card with details and a 'Make a Reservation' button.

### `ReservationForm`

This component contains the form and logic to make a new reservation. It uses the `addReservation` function from a centralized `api` module.

## Deployment

The application has been deployed on Vercel, which offers seamless deployment for Next.js applications.
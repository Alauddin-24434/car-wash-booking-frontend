# 🚗 Car Wash Booking Management Frontend

## Welcome to the frontend of a modern and responsive car wash booking management website. This application, built with Next.js, TypeScript, and Tailwind CSS, allows users to easily book car wash services, manage their appointments, and handle payments.

## 🚀 Features

  - **User Authentication & Role Management**
  - **Service Booking System**
  - **Aamarpay Payment Integration**
  - **Service Management** (Admin-only)
  - **Appointment Scheduling**
  - **User Dashboard**

-----

## 🛠 Getting Started

### 1\. Clone the Repository

```bash
git clone https://github.com/Alauddin-24434/car-wash-booking-frontend.git
cd car-wash-booking-frontend
```

### 2\. Install Dependencies

This project uses [pnpm](https://pnpm.io/) (recommended), but you can use npm if needed.

#### Using pnpm (recommended):

```bash
pnpm install
```

#### Using npm:

1.  **Delete the pnpm lockfile first:**
    ```bash
    rm -rf pnpm-lock.yaml
    ```
2.  **Then install dependencies:**
    ```bash
    npm install
    ```

> **Warning:** Do **not** mix pnpm and npm in the same project.

-----

## 🚀 Running the Project

### Development

```bash
pnpm run dev
# or
npm run dev
```

### Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```bash
NEXT_PUBLIC_API_BASE_URL=your backend url here
JWT_ACCESS_TOKEN_SECRET=your jwt secret here (must be the same as the backend secret)
```

### Production

```bash
pnpm run build && pnpm start
# or
npm run build && npm start
```

-----

## 🤝 Contributing

Contributions are welcome\! If you find a bug or have an idea for an improvement, please open an issue or submit a pull request.

-----

## 📫 Contact

For questions or support, please contact [alauddin150900@gmail.com](mailto:alauddin150900@gmail.com).

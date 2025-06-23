// User interface
export interface User {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  role: string;
}

// JWT Payload interface (আপনার JWT টোকেন থেকে যা ডিকোড হবে)
export interface JwtPayload {
  _id: string;
  name: string;
  email: string;
  phone:string;
  role: string;
  iat?: number;   // issued at (optional)
  exp?: number;   // expiry (optional)
}

// Redux Auth State
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}


// ✅ Define your refresh token response structure
export interface RefreshTokenResponse  {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
};
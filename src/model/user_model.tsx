// Import necessary types from your TypeScript environment
type Nullable<T> = T | null;

// Define TypeScript types for your data
interface Crypto {
  amountIn?: number;
  amountOut?: number;
  amountBalance?: number;
}

interface SyncBank {
  tezos?: Nullable<Crypto>;
  binance?: Nullable<Crypto>;
  polygon?: Nullable<Crypto>;
  syncId?: string;
  user?: string;
  syncBankType?: string;
  isActive?: boolean;
  id?: string;
}

interface SocialMedia {
  telegram?: string;
  discord?: string;
  medium?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
}

interface Fun {
  firstName?: string;
  lastName?: string;
  username?: string;
  photo?: string;
  id?: string;
}

interface TippingInfo {
  network?: string;
  address?: string;
  id?: string;
}

interface User {
  passwordReset?: Nullable<PasswordReset>;
  socialMedia?: Nullable<SocialMedia>;
  friends?: Nullable<Fun>[];
  firstName?: string;
  lastName?: string;
  username?: string;
  photo?: string;
  cover?: string;
  email?: string;
  bio?: string;
  location?: string;
  userType?: string;
  booms?: Nullable<any>[]; // Update with the correct type
  isAdmin?: boolean;
  passwordResetToken?: string;
  syncBank?: Nullable<SyncBank>;
  funs?: Nullable<Fun>[];
  blockedUsers?: Nullable<string>[];
  id?: string;
  tippingInfo?: Nullable<TippingInfo>[];
}

interface PasswordReset {
  isChanged?: boolean;
}

export interface UserModel {
  status?: string;
  user?: Nullable<User>;
}

// Your React component or utility function can now use these types
export {};
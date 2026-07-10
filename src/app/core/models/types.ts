export interface User {
  id?: number | string;
  username?: string;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
}

declare namespace Express {
  export interface Request {
    user: { sub: number; name: string };
    refresh_token?: string;
  }
}

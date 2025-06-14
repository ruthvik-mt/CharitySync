// types/express/index.d.ts
import { UserDocument } from '../../backend/models/User'; // Adjust this path if needed

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name?: string;
        email?: string;
        role?: string;
      };
    }
  }
}

export {};

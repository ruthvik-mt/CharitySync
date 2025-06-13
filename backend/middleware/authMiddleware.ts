// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

// Extend the Request type to include `userId`
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Authorization token required" });
    return; // ✅ Added
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(decoded.id).select("_id");
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return; // ✅ Added
    }

    req.userId = user._id.toString();
    next(); // ✅ Correct: only next if everything is okay
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
    return; // ✅ Added
  }
};

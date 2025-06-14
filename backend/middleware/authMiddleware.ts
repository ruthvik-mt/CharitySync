// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import User from "../models/User";

// // Extend Express Request to add userId
// export interface AuthenticatedRequest extends Request {
//   userId?: string;
// }

// // ✅ Authentication Middleware
// export const protect = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       res.status(401).json({ error: "Authorization token required" });
//       return;
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

//     const user = await User.findById(decoded.id).select("_id role");
//     if (!user) {
//       res.status(401).json({ error: "User not found" });
//       return;
//     }

//     req.userId = user._id.toString();
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     res.status(401).json({ error: "Invalid or expired token" });
//   }
// };

// // ✅ Admin Authorization Middleware
// export const isAdmin = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const user = await User.findById(req.userId).select("_id role");
//     if (user && user.role === "admin") {
//       return next();
//     } else {
//       res.status(403).json({ error: "Access denied: Admins only" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to verify admin privileges" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

// Extend Express Request to add userId
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

// ✅ Authentication Middleware
export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Authorization token required" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(decoded.id).select("_id role");
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// ✅ Admin Authorization Middleware
export const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select("_id role");
    if (user && user.role === "admin") {
      return next();
    } else {
      res.status(403).json({ error: "Access denied: Admins only" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to verify admin privileges" });
  }
};

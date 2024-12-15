var jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/dotenv");

const authMiddleWare = (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return res.status(403).json({ error: "Authorization header is missing" });
    }
    const [bearer, token] = authToken.split(" ");
    if (bearer !== "Bearer" || !token) {
      return res.status(400).json({ error: "Invalid token format" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authMiddleWare;

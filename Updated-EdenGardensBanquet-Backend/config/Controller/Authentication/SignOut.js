const jwt = require("jsonwebtoken");
const util = require("util");

const verifyJwt = util.promisify(jwt.verify);

const SignOut = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Extract the token without the "Bearer" prefix
  const token = authHeader.split(" ")[1];

  try {
    const decoded = await verifyJwt(token, process.env.JWT_SECRET);
    console.log(decoded);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = SignOut;

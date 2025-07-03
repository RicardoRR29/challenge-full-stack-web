// src/middlewares/isAdmin.js
function isAdmin(req, res, next) {
  if (req.userRole !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
}

module.exports = isAdmin;

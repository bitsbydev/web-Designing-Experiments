const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const JWT_SECRET = "mysecretkey";
// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/auth_demo")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));
// User schema
const userSchema = new mongoose.Schema({
email: String,
password: String
});
const User = mongoose.model("User", userSchema);
// REGISTER
app.post("/register", async (req, res) => {
const { email, password } = req.body;
const existingUser = await User.findOne({ email });
if (existingUser) {
return res.json({ msg: "User already exists" });
}
const user = new User({ email, password });
await user.save();
res.json({ msg: "Registered" });
});
// LOGIN → generate JWT
app.post("/login", async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email, password });
if (!user) {
return res.json({ msg: "Invalid credentials" });
}
const token = jwt.sign(
{ id: user._id },
JWT_SECRET,
{ expiresIn: "1h" }
);
res.json({ token });
});
// JWT MIDDLEWARE
function auth(req, res, next) {
const header = req.headers["authorization"];
if (!header) return res.json({ msg: "No token" });
const token = header.split(" ")[1];
try {
const decoded = jwt.verify(token, JWT_SECRET);
req.user = decoded;
next();
} catch {
res.json({ msg: "Invalid token" });
}
}
// PROTECTED ROUTE
app.get("/profile", auth, async (req, res) => {
const user = await User.findById(req.user.id);
res.json({ email: user.email });
});
// LOGOUT
app.post("/logout", (req, res) => {
res.json({ msg: "Logout: just delete token on client" });
});
// Start server
app.listen(5000, () => console.log("Server running"));

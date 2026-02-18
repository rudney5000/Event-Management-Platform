import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get("users").find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({ id: user.id, email: user.email });
});

server.use("/api", router);

server.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});

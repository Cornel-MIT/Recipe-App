const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/check-email', (req, res) => {
  const { email } = req.body;
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
  const userExists = db.users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Email already in use' });
  }
  res.json({ exists: false });
});

server.use('/api', router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

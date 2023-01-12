/* app.use("/api/transactions", transactions)
app.use("/api/users", users)
app.use("/api/auth", auth) */

import debug from 'debug';
import App from './app';
import { connectToDatabase } from "./src/db/database"

debug('ts-express:server');

const port = Number.parseInt(process.env.PORT || '3000', 10)
if (Number.isNaN(port)) {
  console.error('PORT must be a number');
  process.exit(1);
}

connectToDatabase().then(()=>{
    const server = App.listen(port, async () => {
        console.info(`Serveur disponible à http://localhost:${port}`);
      });
    server.on('error', onError);
}).catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});


function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') throw error;
  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

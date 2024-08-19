import { symbolTypeAnnotation } from "@babel/types";
import app from "./app";
import { prismaClient } from "./config/database";
import { start } from "repl";

const PORT = process.env.PORT || 4000;

function startServer() {
  prismaClient.$connect().catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

  return app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

startServer();

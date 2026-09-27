import { app } from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";

async function bootstrap() {
  await connectDatabase();
  app.listen(env.PORT, () => {
    console.log(`NEXORA backend running on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch(err => {
  console.error("Startup failed:", err);
  process.exit(1);
});

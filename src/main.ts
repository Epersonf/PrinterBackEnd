import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import EmailSender from "./utility/emailSender";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT);
  new EmailSender();
}
bootstrap();

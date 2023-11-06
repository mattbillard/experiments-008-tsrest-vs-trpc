import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { TrpcRouter } from './trpc/trpc.router';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors();

  // tRPC
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  // app.setGlobalPrefix('api'); // Prepend all paths with /api
  await app.listen(PORT);
}
bootstrap();

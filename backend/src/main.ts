import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Activer CORS pour toutes les origines ou seulement pour une origine spécifique
  app.enableCors({
    origin: 'http://localhost:4200', // L'URL de votre frontend Angular
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

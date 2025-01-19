import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS pour autoriser les requêtes du frontend Angular
  app.enableCors({
    origin: 'http://localhost:4200', // URL de votre frontend Angular
    methods: 'GET,POST,PUT,DELETE', // Méthodes autorisées
    allowedHeaders: 'Content-Type, Authorization', // En-têtes autorisés
  });

  // Lancer l'application sur le port spécifié dans les variables d'environnement ou sur 3000 par défaut
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();


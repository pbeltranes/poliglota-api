import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

export async function bootstrap() {
  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  const corsOptions: CorsOptions = {
    origin: `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}`, // Origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Habilitar el envío de cookies
  };
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('Poliglota API')
    .setDescription('Api for translations and languages.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const envVars = ['CLIENT_PORT', 'CLIENT_URL'];
  envVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.log(envVar);
      console.error(`Missing required environment variable: ${envVar}`);
      process.exit(1);
    }
  });
  app.use(morgan('dev')); // O puedes usar otros formatos como 'tiny', 'dev', etc.

  await app.listen(process.env.PORT, '0.0.0.0');
  console.info(
    `\n\n\n   🚀 Swagger's running on ${await app.getUrl()}/api\n\n\n`,
  );
}
bootstrap();

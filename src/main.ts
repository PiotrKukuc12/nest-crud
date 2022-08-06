import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  if (!process.env.NODE_ENV.includes('PROD')) {
    SwaggerModule.setup(
      'explorer',
      app,
      SwaggerModule.createDocument(app, new DocumentBuilder().build()),
    );
  }
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

(async function main() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  const config = new DocumentBuilder()
    .setTitle('Asset Store')
    .setDescription('Project dedicated for the load files')
    .setVersion('1.0') 
    .build();
  
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api');
  await app.listen(PORT, async () => {
    console.log(`App in: ${await app.getUrl()}`);
  });
})()

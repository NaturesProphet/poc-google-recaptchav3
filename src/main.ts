import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './domains/app/app.module';
const cors = require( 'cors' );



async function bootstrap () {
  const app = await NestFactory.create( AppModule );
  app.use( cors() );
  const options = new DocumentBuilder();
  options.setTitle( 'PoC Google Recaptcha V3' );
  options.setDescription( 'Demonstrando uma implementação simples do google recaptcha V3' );
  const document = SwaggerModule.createDocument( app, options.build() );
  SwaggerModule.setup( '', app, document );
  await app.listen( 3000 );
  console.log( `API startada na porta 3000.` );
}
bootstrap();

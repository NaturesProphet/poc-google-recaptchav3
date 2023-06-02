import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { RecaptchaV3Guard } from 'src/shared/guards/RecaptchaV3.guard';

@ApiTags( 'Google recaptcha V3' )
@Controller( 'google' )
export class AppController {
  constructor( private readonly appService: AppService ) { }

  @Get( 'recaptchav3/validate' )
  @UseGuards( RecaptchaV3Guard )
  @ApiHeader( {
    description: 'Token do google Recaptcha V3',
    name: 'recaptcha'
  } )
  validarTokenRecaptchav3 ( @Headers() recaptcha: string ) {
    return this.appService.teste();
  }

}

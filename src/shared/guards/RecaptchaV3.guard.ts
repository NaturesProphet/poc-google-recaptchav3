import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GoogleService } from '../../domains/google/google.service';


/**
 * Você precisa importar o GoogleModule nos modulos 
 * onde for implementar esse cara aqui
*/
@Injectable()
export class RecaptchaV3Guard implements CanActivate {
  constructor( private readonly googleService: GoogleService ) { }

  async canActivate ( context: ExecutionContext ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req?.headers?.recaptcha;
    const valid = await this.googleService.validateRecaptchaTokenV3( token );
    console.log( valid )
    if ( valid ) {
      return valid
    } else {
      throw new UnauthorizedException( `O Desafio de captcha falhou.` );
    }
  }
}
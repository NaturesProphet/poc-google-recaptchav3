import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";


@Injectable()
export class GoogleService {
  private readonly logger: Logger;
  constructor(
    private readonly httpService: HttpService
  ) {
    this.logger = new Logger( ' Google Service ' );
  }


  async validateRecaptchaTokenV3 ( token: string ) {
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    let res: AxiosResponse;

    try {
      res = await lastValueFrom( this.httpService.post( url, null, {
        params: {
          secret: recaptchaSecretKey,
          response: token
        }
      } ) );
    } catch ( err ) {
      this.logger.error( err );
      throw new UnprocessableEntityException( `Erro na requisição de validação de recaptchav3 ao google.` );
    }

    const data = res?.data;
    if ( data && data[ 'error-codes' ] ) {
      const errorList: [] = data[ 'error-codes' ];
      errorList.forEach( e => {
        this.logger.error( `Erro de validação do recaptchaV3: ${e}` );
      } );
      throw new InternalServerErrorException( `Erro na verificação do RecaptchaV3` );
    }
    if ( data.success && data.score >= 0.5 ) {
      // O reCAPTCHA foi verificado com sucesso e tem uma pontuação válida
      return true;
    } else {
      // O reCAPTCHA falhou na verificação ou tem uma pontuação baixa
      return false;
    }
  }


}
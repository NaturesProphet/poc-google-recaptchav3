import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  constructor() { }

  async teste () {
    // se chegou aqui significa que o guard no controller retornou true
    return { message: "Token valido :)" }
  }

}

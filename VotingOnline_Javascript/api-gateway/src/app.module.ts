import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
//import {  HttpModule, HttpService } from '@nestjs/axios';

import {  ClientsModule, Transport } from '@nestjs/microservices';
import { ApiService } from './api.service';



@Module({
  imports: [
    ClientsModule.register([
    {
        name: 'user-manager',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3000
        }
      },
    ]),
    ClientsModule.register([
      {
          name: 'nominee-catalog',
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: 3001
          }
        },
      ]),
    ClientsModule.register([
      {
          name: 'voting-manager',
           transport: Transport.TCP,
           options: {
             host: '127.0.0.1',
             port: 3002
           }
         },
     ])
  ],
  controllers: [AppController],
  providers: [ApiService],
})
export class AppModule {}

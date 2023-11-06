import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from '../trpc/trpc.module';
import { TsRestModule } from 'src/ts-rest/ts-rest.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../client/dist'),
    }),
    TrpcModule,
    TsRestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

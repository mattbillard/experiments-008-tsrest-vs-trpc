import { Module } from '@nestjs/common';
import { TsRestService } from './ts-rest.service';
import { TsRestController } from './ts-rest.controller';

@Module({
  imports: [],
  controllers: [TsRestController],
  providers: [TsRestService],
})
export class TsRestModule {}

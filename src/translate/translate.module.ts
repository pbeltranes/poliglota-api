import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
  ],
  controllers: [TranslateController],
  providers: [TranslateService],
})
export class TranslateModule {}

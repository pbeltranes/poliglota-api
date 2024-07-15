import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { RedisOptions } from './../constants';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    PrismaModule,
    CacheModule.registerAsync(RedisOptions),
  ],
  controllers: [TranslateController],
  providers: [TranslateService],
})
export class TranslateModule {}

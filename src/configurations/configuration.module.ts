import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
  ],
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
})
export class ConfigurationModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './configurations/configuration.module';
import { TranslateModule } from './translate/translate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    TranslateModule,
    ConfigurationModule,
  ],
})
export class AppModule {}

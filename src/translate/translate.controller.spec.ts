import { Cache, CacheModule } from '@nestjs/cache-manager';
import { BadRequestException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { CreateDto } from './dto/create.dto';
import { ParamsDto } from './dto/params.dto';
import { UpdateDto } from './dto/update.dto';
import { ResourceClass } from './entities/translation.entity';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';
import { RedisOptions } from '../constants';
import { PrismaModule } from '../prisma/prisma.module';

describe('TranslateController', () => {
  let controller: TranslateController;
  let service: TranslateService;
  let cache: Cache;

  beforeEach(async () => {
    process.env.REDIS_HOST = 'HOST';
    process.env.REDIS_PASSWORD = 'PASSWORD';
    process.env.REDIS_PORT = '6379';
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        CacheModule.registerAsync({
          useFactory: () => RedisOptions,
        }),
        ConfigModule.forRoot({
          isGlobal: true, // Hacerlo global asegura que está disponible en toda la aplicación de prueba
        }),
      ],
      controllers: [TranslateController],
      providers: [TranslateService],
    }).compile();

    controller = module.get<TranslateController>(TranslateController);
    service = module.get<TranslateService>(TranslateService);
    cache = module.get<Cache>(Cache);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    test('should return promise value', async () => {
      const response: ResourceClass = {
        id: '1234567890',
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
        translations: {
          string: 'string',
        },
      };
      const input: CreateDto = {
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
        translations: {
          string: 'string',
        },
      };

      vi.spyOn(service, 'retrieve').mockImplementation(async () => {
        return Promise.resolve(response);
      });
      vi.spyOn(service, 'create').mockImplementation(async () => {
        return Promise.resolve(response);
      });
      expect(await controller.post(input)).toStrictEqual(response);
    });
  });

  describe('update', () => {
    test('should return promise value', async () => {
      const response: ResourceClass = {
        id: '1234567890',
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
        translations: {
          string: 'string',
        },
      };
      const params: ParamsDto = {
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
      };
      const input: UpdateDto = {
        translations: {
          string: 'string',
        },
      };
      vi.spyOn(service, 'update').mockImplementation(async () => {
        return Promise.resolve(response);
      });
      vi.spyOn(service, 'retrieve').mockImplementation(async () => {
        return Promise.resolve(response);
      });
      vi.spyOn(cache, 'del').mockImplementation(async () => {});
      expect(await controller.update(params, input)).toStrictEqual(response);
    });

    test('should return promise value', async () => {
      const params: ParamsDto = {
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
      };
      const input: UpdateDto = {
        translations: {
          string: 'string',
        },
      };
      vi.spyOn(service, 'retrieve').mockImplementation(async () => {
        return Promise.resolve(null);
      });
      vi.spyOn(cache, 'del').mockImplementation(async () => {});
      await expect(controller.update(params, input)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('get', () => {
    test('should return promise value Cache', async () => {
      const response: ResourceClass = {
        id: '1234567890',
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
        translations: {
          string: 'string',
        },
      };
      const params: ParamsDto = {
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
      };
      vi.spyOn(cache, 'get').mockImplementation(async () => {
        return response;
      });

      expect(await controller.get(params)).toStrictEqual(response);
    });

    test('should return promise value Cache', async () => {
      const response: ResourceClass = {
        id: '1234567890',
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
        translations: {
          string: 'string',
        },
      };
      const params: ParamsDto = {
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
      };
      vi.spyOn(cache, 'get').mockImplementation(async () => {
        return null;
      });
      vi.spyOn(service, 'retrieve').mockImplementation(async () => {
        return Promise.resolve(response);
      });
      expect(await controller.get(params)).toStrictEqual(response);
    });
  });
});

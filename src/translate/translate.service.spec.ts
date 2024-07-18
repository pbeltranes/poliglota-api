import { Test, type TestingModule } from '@nestjs/testing';
import { vi, describe, test, beforeAll, expect, Mock } from 'vitest';

import { CreateDto } from './dto/create.dto';
import { ParamsDto } from './dto/params.dto';
import { UpdateDto } from './dto/update.dto';
import { ResourceClass } from './entities/translation.entity';
import { TranslateService } from './translate.service';
import { PrismaService } from '../prisma/prisma.service';

describe('translateService', () => {
  let service: TranslateService;
  let prismaServiceMock: {
    translation: {
      create: Mock<any>;
      update: Mock<any>;
      findFirst: Mock<any>;
    };
  };

  beforeAll(async () => {
    prismaServiceMock = {
      translation: {
        create: vi.fn(),
        update: vi.fn(),
        findFirst: vi.fn(),
      },
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TranslateService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = moduleRef.get<TranslateService>(TranslateService);
  });

  describe('should be defined', () => {
    test('define', () => {
      expect(service).toBeDefined();
    });
  });

  describe('Create', () => {
    test('Success', async () => {
      const create: CreateDto = {
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
        translations: {
          string: 'string',
        },
      };
      prismaServiceMock.translation.create.mockResolvedValue({
        id: '1234567890',
        ...create,
      });
      const response = await service.create(create);
      expect(response).toEqual({ id: '1234567890', ...create });
    });
  });

  describe('Update', () => {
    test('Success', async () => {
      const update: UpdateDto = {
        translations: {
          string: 'string1',
        },
      };
      const resource: ResourceClass = {
        id: '668229a',
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
        translations: {
          string: 'string1',
        },
      };
      prismaServiceMock.translation.update.mockResolvedValue(resource);
      const response = await service.update('1234567890', update);
      expect(response).toEqual(resource);
    });
  });
  describe('Retrieve', () => {
    test('Success', async () => {
      const params: ParamsDto = {
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
      };
      const resource: ResourceClass = {
        id: '668229a',
        project: 'string',
        path: 'string',
        lang: 'string',
        locale: 'string',
        translations: {
          string: 'string',
        },
      };
      prismaServiceMock.translation.findFirst.mockResolvedValue(resource);
      const response = await service.retrieve(params);
      expect(response).toEqual(resource);
    });
  });
});

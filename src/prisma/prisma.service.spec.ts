import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, test } from 'vitest';

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});

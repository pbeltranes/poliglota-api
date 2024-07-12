import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const InputSchema = extendApi(
  z.object({
    project: z.string().default('clay'),
    path: z.string().default('home'),
    lang: z.string().default('default'),
    locale: z.string().default('default'),
    translations: z.record(z.string()),
  }),
  {
    title: 'Translation',
    description: 'Translation from one project/path/lang/locale',
  },
);

export class CreateDto extends createZodDto(InputSchema) {}

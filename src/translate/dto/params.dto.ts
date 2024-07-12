import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const InputSchema = extendApi(
  z.object({
    project: z.string(),
    path: z.string(),
    lang: z.string(),
    locale: z.string(),
  }),
  {
    title: 'Translation',
    description: 'Translation from one project/path/lang/locale',
  },
);

export class ParamsDto extends createZodDto(InputSchema) {}

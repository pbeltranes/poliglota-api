import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const InputSchema = extendApi(
  z.object({
    translations: z.record(z.string()),
  }),
  {
    title: 'Assistant',
    description: 'A assistant of the organization',
  },
);
export class UpdateDto extends createZodDto(InputSchema) {}

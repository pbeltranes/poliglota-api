import { ApiProperty } from '@nestjs/swagger';

export class ResourceClass {
  @ApiProperty({ description: 'Sender of the message' })
  project: string;

  @ApiProperty({ description: 'Body of the message' })
  path: string;

  @ApiProperty({ description: 'Body of the message' })
  lang: string;

  @ApiProperty({ description: 'Body of the message' })
  locale: any;

  @ApiProperty({ description: 'Body of the message' })
  translations: Record<string, string>;
}

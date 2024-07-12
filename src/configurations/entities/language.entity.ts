import { ApiProperty } from '@nestjs/swagger';

export class ResourceClass {
  @ApiProperty({ description: 'Sender of the message' })
  project: string;
  @ApiProperty({ description: 'Sender of the message' })
  path: string;
  @ApiProperty({ description: 'Sender of the message' })
  lang: Record<string, string[]>;
}

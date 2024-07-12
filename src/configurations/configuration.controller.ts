import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { string } from 'zod';
import { ConfigurationService } from './configuration.service';
import { ParamsDto } from './dto/params.dto';
import { ResourceClass } from './entities/language.entity';

@ApiTags('config')
@Controller('config')
export class ConfigurationController {
  constructor(private readonly configuration: ConfigurationService) {}

  @Get('/:project')
  @ApiParam({ type: string, name: 'project', required: true })
  get(@Param() params: ParamsDto): Promise<ResourceClass> {
    return this.configuration.retrieve(params);
  }
}

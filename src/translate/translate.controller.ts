import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateDto } from 'translate/dto/create.dto';
import { ParamsDto } from 'translate/dto/params.dto';
import { UpdateDto } from 'translate/dto/update.dto';
import { ResourceClass } from 'translate/entities/translation.entity';
import { string } from 'zod';
import { TranslateService } from './translate.service';

@ApiTags('translate')
@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Get(':project/:path/:lang/:locale')
  @ApiParam({ type: string, name: 'project', required: true })
  @ApiParam({ type: string, name: 'path', required: true })
  @ApiParam({ type: string, name: 'lang', required: true })
  @ApiParam({ type: string, name: 'locale', required: true })
  get(@Param() params: ParamsDto): Promise<ResourceClass> {
    return this.translateService.retrieve(params);
  }

  @Post()
  @UsePipes(ZodValidationPipe)
  @ApiBody({ type: CreateDto })
  post(@Body() translation: CreateDto): Promise<ResourceClass> {
    return this.translateService.create(translation);
  }

  @UsePipes(ZodValidationPipe)
  @ApiParam({ type: string, name: 'project', required: true })
  @ApiParam({ type: string, name: 'path', required: true })
  @ApiParam({ type: string, name: 'lang', required: true })
  @ApiParam({ type: string, name: 'locale', required: true })
  @ApiBody({ type: UpdateDto })
  @Put(':project/:path/:lang/:locale')
  update(
    @Param() params: ParamsDto,
    @Body() translation: UpdateDto,
  ): Promise<ResourceClass> {
    return this.translateService.update(params, translation);
  }

  @ApiParam({ type: string, name: 'project', required: true })
  @ApiParam({ type: string, name: 'path', required: true })
  @ApiParam({ type: string, name: 'lang', required: true })
  @ApiParam({ type: string, name: 'locale', required: true })
  @Delete(':project/:path/:lang/:locale')
  delete(@Param() params: ParamsDto): Promise<ResourceClass> {
    return this.translateService.remove(params);
  }
}

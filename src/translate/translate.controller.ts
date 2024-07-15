import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  Inject,
  BadRequestException,
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
  constructor(
    private readonly translateService: TranslateService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get(':project/:path/:lang/:locale')
  @ApiParam({ type: string, name: 'project', required: true })
  @ApiParam({ type: string, name: 'path', required: true })
  @ApiParam({ type: string, name: 'lang', required: true })
  @ApiParam({ type: string, name: 'locale', required: true })
  async get(@Param() params: ParamsDto): Promise<ResourceClass> {
    const { project, path, lang, locale } = params;
    const value = await this.cacheManager.get(
      `${project}:${path}:${lang}:${locale}`,
    );
    if (value) return value as ResourceClass;

    const resouce = await this.translateService.retrieve(params);
    if (resouce) {
      this.cacheManager.set(`${project}:${path}:${lang}:${locale}`, resouce, 0);
      return resouce;
    }
    throw new Error('Resource not found');
  }

  @Post()
  @UsePipes(ZodValidationPipe)
  @ApiBody({ type: CreateDto })
  async post(@Body() translation: CreateDto): Promise<ResourceClass> {
    const { project, path, lang, locale } = translation;
    const resource = await this.translateService.retrieve({
      project,
      path,
      lang,
      locale,
    });
    if (resource) return resource;

    return this.translateService.create(translation);
  }

  @UsePipes(ZodValidationPipe)
  @ApiParam({ type: string, name: 'project', required: true })
  @ApiParam({ type: string, name: 'path', required: true })
  @ApiParam({ type: string, name: 'lang', required: true })
  @ApiParam({ type: string, name: 'locale', required: true })
  @ApiBody({ type: UpdateDto })
  @Put(':project/:path/:lang/:locale')
  async update(
    @Param() params: ParamsDto,
    @Body() translation: UpdateDto,
  ): Promise<ResourceClass> {
    const resource = await this.translateService.retrieve(params);

    if (!resource) {
      throw new BadRequestException('Resource not found');
    }
    await this.cacheManager.del(
      `${params.project}:${params.path}:${params.lang}:${params.locale}`,
    );
    return this.translateService.update(resource.id, translation);
  }

  @ApiParam({ type: string, name: 'project', required: true })
  @ApiParam({ type: string, name: 'path', required: true })
  @ApiParam({ type: string, name: 'lang', required: true })
  @ApiParam({ type: string, name: 'locale', required: true })
  @Delete(':project/:path/:lang/:locale')
  async delete(@Param() params: ParamsDto): Promise<ResourceClass> {
    const resource = await this.translateService.retrieve(params);

    if (!resource) {
      throw new BadRequestException('Resource not found');
    }
    return this.translateService.remove(resource.id);
  }
}

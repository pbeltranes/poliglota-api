import { Injectable } from '@nestjs/common';
import { CreateDto } from 'translate/dto/create.dto';
import { ParamsDto } from 'translate/dto/params.dto';
import { UpdateDto } from 'translate/dto/update.dto';
import { ResourceClass } from 'translate/entities/translation.entity';

@Injectable()
export class TranslateService {
  retrieve(params: ParamsDto): Promise<ResourceClass> {
    const { project, path, lang, locale } = params;
    return Promise.resolve({
      project,
      path,
      lang,
      locale,
      translations: {
        TITLE: 'Hello World!',
        DESCRIPTION: 'Hello World!',
      },
    });
  }
  create(create: CreateDto): Promise<ResourceClass> {
    const { project, path, lang, locale, translations } = create;
    return Promise.resolve({ project, path, lang, locale, translations });
  }
  update(
    params: ParamsDto,
    { translations }: UpdateDto,
  ): Promise<ResourceClass> {
    const { project, path, lang, locale } = params;
    return Promise.resolve({ project, path, lang, locale, translations });
  }
  remove(params: ParamsDto): Promise<ResourceClass> {
    const { project, path, lang, locale } = params;
    return Promise.resolve({
      project,
      path,
      lang,
      locale,
      translations: {
        TITLE: 'Hello World!',
        DESCRIPTION: 'Hello World!',
      },
    });
  }
}

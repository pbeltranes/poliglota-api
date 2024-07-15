import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateDto } from 'translate/dto/create.dto';
import { ParamsDto } from 'translate/dto/params.dto';
import { UpdateDto } from 'translate/dto/update.dto';
import { ResourceClass } from 'translate/entities/translation.entity';

@Injectable()
export class TranslateService {
  constructor(private readonly prismaService: PrismaService) {}

  retrieve(params: ParamsDto): Promise<ResourceClass> {
    const { project, path, lang, locale } = params;
    return this.prismaService.translation.findFirst({
      where: { project, path, lang, locale },
    }) as Promise<ResourceClass>;
  }
  async create(create: CreateDto): Promise<any> {
    const { project, path, lang, locale, translations } = create;
    return this.prismaService.translation.create({
      data: {
        project,
        path,
        lang,
        locale,
        translations,
      },
    }) as Promise<ResourceClass>;
  }
  async update(
    id: string,
    { translations }: UpdateDto,
  ): Promise<ResourceClass> {
    return this.prismaService.translation.update({
      where: { id },
      data: { translations },
    }) as Promise<ResourceClass>;
  }
  async remove(id: string): Promise<ResourceClass> {
    return this.prismaService.translation.delete({
      where: { id },
    }) as Promise<ResourceClass>;
  }
}

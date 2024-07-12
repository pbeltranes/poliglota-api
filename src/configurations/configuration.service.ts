import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ParamsDto } from './dto/params.dto';
import { ResourceClass } from './entities/language.entity';

@Injectable()
export class ConfigurationService {
  constructor(private readonly prismaService: PrismaService) {}

  async retrieve(params: ParamsDto): Promise<ResourceClass> {
    const { project } = params;
    const resources = await this.prismaService.translation.findMany({
      where: { project },
    });
    const path = resources.reduce((acc, curr) => {
      const { path, lang, locale } = curr;
      if (!acc[path]) {
        acc[path] = {};
      }
      if (!acc[path][lang]) {
        acc[path][lang] = [];
      }
      acc[path][lang].push(locale);
      return acc;
    }, {});
    return Promise.resolve({
      project,
      path,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { ParamsDto } from './dto/params.dto';
import { ResourceClass } from './entities/language.entity';

@Injectable()
export class ConfigurationService {
  retrieve(params: ParamsDto): Promise<ResourceClass> {
    const { project } = params;
    return Promise.resolve({
      project,
      path: {
        _: { es: ['cl', 'arg'], en: ['us', 'uk'] },
      },
    });
  }
}

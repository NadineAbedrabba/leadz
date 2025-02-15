import { Test, TestingModule } from '@nestjs/testing';
import { ProjetService } from './project.service';

describe('ProjectService', () => {
  let service: ProjetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjetService],
    }).compile();

    service = module.get<ProjetService>(ProjetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DatabaeService } from './database.service';

describe('DatabaeService', () => {
  let service: DatabaeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaeService],
    }).compile();

    service = module.get<DatabaeService>(DatabaeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

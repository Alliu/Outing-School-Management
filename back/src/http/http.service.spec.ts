import { Test, TestingModule } from '@nestjs/testing';
import { HttpDataService } from './http.service';

describe('HttpDataService', () => {
  let service: HttpDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpDataService],
    }).compile();

    service = module.get<HttpDataService>(HttpDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

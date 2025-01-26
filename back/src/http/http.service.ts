import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HttpDataService {
  constructor(private readonly httpService: HttpService) {}

  async getSchollEmailFromApi(params: {
    schoolName: string;
    schoolPostalCode: string;
    schoolAddress: string;
  }): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(
          `https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records?where=%22${params.schoolName.replace(/\s+/g, '%20')}%22%20AND%20%22${params.schoolPostalCode}%22%20AND%20%22${params.schoolAddress.replace(/\s+/g, '%20')}%22&group_by=mail`,
        ),
      );
      if (response) return response.data.results[0].mail;
    } catch (error) {
      throw new BadRequestException(
        "L'école que vous recherchez n'existe pas",
        {
          cause: 'email établissement inconnu',
          description: 'email',
        },
      );
    }
  }
}

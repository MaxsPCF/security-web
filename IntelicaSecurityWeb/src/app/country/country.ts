import { Guid } from 'guid-typescript';

export class Country {
  countryID: string = Guid.EMPTY;
  countryName: string = '';

  constructor() {}
}

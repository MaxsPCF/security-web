import { Guid } from 'guid-typescript';

export class Bank {
  bankID: string = Guid.EMPTY;
  countryID: string = '';
  bankName: string = '';
  bankDatabase: string = '';
  contactName: string = '';
  contactPhone: string = '';
  constructor() {}
}

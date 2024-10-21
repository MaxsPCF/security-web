import { Guid } from 'guid-typescript';

export class Bank {
  bankID: string = Guid.EMPTY;
  countryID: string | any = null;
  bankName: string = '';
  bankDatabase: string = '';
  contactName: string = '';
  contactPhone: string = '';
  constructor() {}
}

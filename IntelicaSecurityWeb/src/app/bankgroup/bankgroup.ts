import { Guid } from 'guid-typescript';
import { BankGroupDetail } from './bankGroupDetail';

export class BankGroup {
  bankGroupID: string = Guid.EMPTY;
  bankGroupName: string = '';
  bankGroupDatabase: string = '';
  bankGroupDetails: BankGroupDetail[] = [];
  constructor() {}
}

import { Guid } from "guid-typescript";

export class BankGroupDetail {
    bankGroupDetailID: string = Guid.EMPTY; 
    bankGroupID: string = Guid.EMPTY;
    bankID: string = Guid.EMPTY;
  
    constructor() {}
  }
  
import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace emp.bank.cbdt.network{
   export enum Category {
      A,
      B,
      O,
   }
   export class SampleParticipant extends Participant {
      participantId: string;
      firstName: string;
      lastName: string;
      category: Category;
   }
   export class Account extends Asset {
      accountId: string;
      owner: SampleParticipant;
      value: number;
      timestamp: Date;
   }
   export class AccountTransfer extends Transaction {
      from: Account;
      bank: Account;
      to: Account;
      cbdt: Account;
      newValue: number;
   }
   export class SampleEvent extends Event {
      asset: Account;
      oldValue: string;
      newValue: string;
   }
// }

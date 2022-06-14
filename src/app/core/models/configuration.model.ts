import { BaseModel } from './base.model';

export class ConfigurationProfile extends BaseModel {
  override id: number;
  configurationProfileId: number;

  name: string;
  key: string;
  code: string;
  description: string;
  valueType: string;
  value: any;

  active: boolean = false;

  configurationParameters: ConfigurationParameter[] = [];


}

export class ConfigurationParameter extends BaseModel {
  override id: number;
  configurationParameterId: number;

  configurationProfileId: number;
  configurationProfile: any;

  name: string;
  key: string;
  code: string;
  description: string;
  valueType: string;
  value: any;

  active: boolean = false;

}



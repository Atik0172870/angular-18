import { ImageLoader } from "@angular/common";

// export class Personnel {
//   public id: string = '';
//   public firstName: string = "";
//   public lastName: string = "";
//   public middleName: string = "";
//   public badge: number = 0;
//   public facility: number = 0;
//   public facilityDisplay: string = 'Not Used';
//   public issue: number = 0;
//   public reIssue: string = 'Ingnore Issue #';
//   public enabled: boolean = false;
//   public embossed: number = 0;
//   public companyId: number = 0;
//   public companyName: string = "";
//   public badgeImage?: any[];
//   public imgUrl: string = '';
// }


export interface BadgeVm {
  constructor(): void;
  id: string;
  personID: string;
  firstName: string;
  lastName: string;
  middleName: string;
  badge: number;
  facility: number;
  badgeImage: Uint8Array | null;
  issue: number;
  enabled: boolean;
  embossed: number;
  companyId: number;
  companyName: string;
  facilityDisplay: string;
  reIssue: string;
  imgUrl: string;
  apbArea: number;
  apbSet: number;
  durUse: boolean;
  mApbExempt: boolean;
  track: boolean;
  escort: boolean;
  firstInControl: boolean;
  supervisor: boolean;
  shunt: boolean;
  shuntId: number;
  socSecId: string;
  companyInfoId: number;
  deptId: number;
  locationId: number;
  supervisorID: string; // Assuming GUID is represented as a string
  dateOfBirth?: string | '';
  gender: string;
  hireDate?: string | null;
  phone: string;
  contPhone: string;
  mobileNo: string;
  email: string;
  vehicle: string;
  license: string;
  remarks: string;
  subBadgeList: Array<BadgeVm>;
  isExpand: boolean;

}

export interface MAccGrpVm {
  constructor(): void;
  agrpNo: number;
  description: string;
  companyId: number;
}

export interface BadgeAccessVm {
  constructor(): void;
  badge: number;
  facility: number;
  aGroupNo: number;
  agSeq: number;
  aGroupActivationDate: Date | null;
  aGroupExpirationDate: Date | null;
  companyId: number;
  description: string | ''
}
export interface DefaultAccessGroupVm {
  constructor(): void;
  id: number;
  seq: number;
  description: string;
  isUsed: boolean;
  selectedAccessGroup: BadgeAccessVm;
}
export interface ThreatLevelBadgeCategoryVm {
  constructor(): void;
  catNumber: number;
  description: string;
  isUsed: boolean;
}
export interface BadgeCategoryVm {
  constructor(): void;
  catNumber: number;
  badge: number;
  facility: number;
  companyId: number;
}
export interface ApbControlVm {
  constructor(): void;
  id: number;
  name: string;
  isUsed: boolean;
}
export interface APBAreaVm {
  constructor(): void;
  areaNo: number;
  description: string;
  companyId: number;
  isUsed: boolean;
}
export interface ShuntVm {
  constructor(): void;
  shuntId: number;
  shuntName: string;
  companyId: number;
  isUsed: boolean;
}
export interface SupervisorInfoVm {
  personID: string;
  supervisorName: string;
  supervisor: number;
  companyID: number;
  isUsed: boolean;
}

export interface DepartmentInfoVm {
  departmentID: number;
  departmentName: string;
  lastUpdated: Date;
  companyId: number;
  isUsed: boolean;
}

export interface LocationInfoVm {
  locationID: number;
  location: string
  lastUpdated: Date;
  companyId: number;
  isUsed: boolean;

}
export interface GenderVm {
  gender: string;
  genderName: string;
  isUsed: boolean;
}
export interface CompanyVm {
  CompanyId: number;
  CompanyName: string;
}
export class PersonVm {
  totalPersons:number=0;
  badgeList: Array<BadgeVm> = new Array<BadgeVm>();
  mAccGrpList: Array<MAccGrpVm> = new Array<MAccGrpVm>();
  badgeAccessList: Array<BadgeAccessVm> = new Array<BadgeAccessVm>();
  defaultAccessGroupList: Array<DefaultAccessGroupVm> = new Array<DefaultAccessGroupVm>();
  threatLevelBadgeCategoryList: Array<ThreatLevelBadgeCategoryVm> = new Array<ThreatLevelBadgeCategoryVm>();
  badgeCategoryList: Array<BadgeCategoryVm> = new Array<BadgeCategoryVm>();
  apbControlList: Array<ApbControlVm> = new Array<ApbControlVm>();
  apbAreaList: Array<APBAreaVm> = new Array<APBAreaVm>();
  shuntList: Array<ShuntVm> = new Array<ShuntVm>();
  supervisorInfoList: Array<SupervisorInfoVm> = new Array<SupervisorInfoVm>();
  departmentInfoList: Array<DepartmentInfoVm> = new Array<DepartmentInfoVm>();
  locationInfoList: Array<LocationInfoVm> = new Array<LocationInfoVm>();
  companyList: Array<CompanyVm> = new Array<CompanyVm>();
  genderList: Array<GenderVm> = new Array<GenderVm>();

}

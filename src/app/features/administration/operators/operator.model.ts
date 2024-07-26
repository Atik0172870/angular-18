export interface Operator {
  operatorId: string; // Guid
  operLoginName: string;
  operFName: string;
  operLName: string;
  autoAckTime: number | null;
  lastUpdated: Date;
  companyId: number;
  companyName: string;
  isPortalUser: boolean | null;
}

export interface Request {
  id: string;
  title: string;
  description: string;
  requester: string;
  approver: string;
  requestType: RequestType;
  status: RequestStatus;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum RequestType {
  DEPLOYMENT = 'DEPLOYMENT',
  ACCESS = 'ACCESS',
  TECHNICAL_CHANGE = 'TECHNICAL_CHANGE',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  SECURITY = 'SECURITY',
  OTHER = 'OTHER'
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface CreateRequestDto {
  title: string;
  description: string;
  requester: string;
  approver: string;
  requestType: RequestType;
}

export interface ApprovalActionDto {
  comment: string;
}


export interface RequestTypeOption {
  label: string;
  value: RequestType;
}

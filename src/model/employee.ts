export interface Data {
  total: number;
  rows: Row[];
}

export interface Row {
  id: string;
  mobile: string;
  username: string;
  password: string;
  timeOfEntry: string;
  formOfEmployment: number;
  workNumber: string;
  correctionTime: string;
  departmentName: string;
  staffPhoto: string;
}
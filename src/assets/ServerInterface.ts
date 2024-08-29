export interface ServerInterface {
  name: string;
  label: string;
  power_on: boolean;
  online: boolean;
  status: string;
  users: string[];
  icon?: string;
}

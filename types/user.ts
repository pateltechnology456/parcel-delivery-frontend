export type AccountType = "normal" | "enterprise";

export interface User {
  id: string;
  name: string;
  email: string;
  accountType: AccountType;
}

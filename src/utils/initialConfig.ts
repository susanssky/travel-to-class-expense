import { ConfigType } from "./types";
export const itialConfig: ConfigType = {
  isEditMode: {
    nameOnBankAccount: false,
    accountNumber: false,
    sortCodeWithDashes: false,
    amount: false,
  },
  fieldName: {
    nameOnBankAccount: `Name on Bank Account`,
    accountNumber: "Account Number",
    sortCodeWithDashes: "Sort Code with dashes",
    amount: "Amount of the receipt",
  },
  tips: {
    nameOnBankAccount: `(This is usually your full name, not the name on your bank card)`,
    accountNumber: "",
    sortCodeWithDashes: "(ex. 101012 should be 10-10-12)",
    amount: "",
  },
};

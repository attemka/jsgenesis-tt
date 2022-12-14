import { validate } from "crypto-address-validator-ts";
import { format } from "date-fns";

export const isValidETHAddress = (inputValue: string) =>
  validate(inputValue, "eth", {
    chainType: "eth",
    networkType: "both",
  });

export const isValidDomain = (inputValue: string) =>
  /[a-zA-Z0-9]{2,}.eth/.test(inputValue);

export const formatTimestamp = (ts: string) =>
  format(Number(ts) * 1000 || 0, "dd-MM-yyyy");

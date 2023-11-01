export type iAliasInput = {
  city: string;
  alias: string;
};

export function isIAliasInput(data: iAliasInput | unknown): data is iAliasInput {
  return (data as iAliasInput).alias !== undefined && (data as iAliasInput).city !== undefined;
}

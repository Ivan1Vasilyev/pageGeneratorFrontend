import { iPage } from './ipage';

export type iSite = {
  domain: string;
  providers: string[];
  _id: string;
};

export function isISiteInTree(data: iSite | iPage): data is iSite {
  return (data as iSite).domain !== undefined;
}

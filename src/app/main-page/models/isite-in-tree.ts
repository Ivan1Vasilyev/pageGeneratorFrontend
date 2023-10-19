import { iPageInTree } from './ipage-in-tree';

export type iSiteInTree = {
  domain: string;
  providers: string[];
  _id: string;
};

export function isISiteInTree(data: iSiteInTree | iPageInTree): data is iSiteInTree {
  return (data as iSiteInTree).domain !== undefined;
}

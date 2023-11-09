import { iSite } from './isite';

export type iPage = {
  _id: string;
  layout: string;
  siteId: string;
  url: string;
  displayText: string;
  parent: string;
  childsCount: number;
  title?: string;
  params?: {
    [key: string]: any;
  };
};

export function isIPageInTree(data: iSite | iPage): data is iPage {
  return (data as iPage).siteId !== undefined && (data as iPage).url !== undefined;
}

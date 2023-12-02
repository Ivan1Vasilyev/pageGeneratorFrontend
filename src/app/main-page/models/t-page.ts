import { tSite } from './t-site';

export type tPage = {
  _id: string;
  layout: string;
  siteId: string;
  url: string;
  displayText: string;
  parent: string;
  childsCount: number;
  dataSource?: string;
  title?: string;
  params?: {
    [key: string]: any;
  };
};

export function isIPageInTree(data: tSite | tPage): data is tPage {
  return (data as tPage).siteId !== undefined && (data as tPage).url !== undefined;
}

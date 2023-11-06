export interface iPageData {
  _id?: string;
  layout: string;
  siteId: string;
  url: string;
  displayText: string;
  isDynamic: boolean;
  parent: string | null;
  params: {
    title?: string;
  };
}

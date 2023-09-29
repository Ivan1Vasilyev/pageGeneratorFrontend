export interface iPageData {
  _id?: string;
  layout: string;
  siteId: string;
  url: string;
  displayText: string;
  parent: string;
  params?: {
    title: string;
  };
}

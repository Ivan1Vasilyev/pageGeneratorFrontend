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

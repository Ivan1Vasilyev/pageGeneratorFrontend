export type iPageInTree = {
  _id: string;
  childsCount: number;
  layout: string;
  siteId: string;
  url: string;
  displayText: string;
  parent: string;
  params?: {
    title: string;
    [key: string]: any;
  };
};

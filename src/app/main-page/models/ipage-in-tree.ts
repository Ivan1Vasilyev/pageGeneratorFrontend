export type iPageInTree = {
  _id: string;
  layout: string;
  siteId: string;
  url: string;
  displayText: string;
  isDynamic: boolean;
  parent: string;
  childsCount: number;
  params?: {
    title: string;
    [key: string]: any;
  };
};

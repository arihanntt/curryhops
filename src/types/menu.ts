export type MenuItem = {
  name: string;
  desc: string;
  price: string;
};

export type MenuSection = {
  _id: string;
  title: string;
  items: MenuItem[];
};

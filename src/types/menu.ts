export type MenuVariant = {
  name: string;
  price: string;
};

export type MenuItem = {
  // Basic Info
  name: string;
  desc: string;
  price: string;
  
  // Metadata & Images
  tags?: string[];
  imageUrl?: string;
  imageSize?: string; 
  
  // Status & customization
  available?: boolean;
  isCustomizable?: boolean;
  variants?: MenuVariant[];

  // Bar Specific
  showBottlePeg?: boolean;
  bottlePrice?: string;
  pegPrice?: string;
};

export type MenuSection = {
  id: string; 
  _id?: string; // MongoDB internal ID
  title: string;
  menuType: "food" | "bar";
  visible?: boolean; 
  
  // ✅ NEW: Added this to match your updated Database Model
  imageUrl?: string; 

  items: MenuItem[];
};
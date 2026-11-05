export interface Category {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
export type SubCategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};
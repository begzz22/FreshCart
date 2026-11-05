import CategoriesLg from "@/app/_Components/Categories/CategoriesLg";
import PageHeader from "@/app/_Components/PageHeader/PageHeader";

const Categories = () => {
  return (
    <>
      <PageHeader
        title="All Categories"
        subtitle="Browse our wide range of product categories"/>

      <CategoriesLg/>
    </>
  );
};

export default Categories;

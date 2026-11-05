import { getAllProducts } from "@/apis/product";
import Container from "@/app/_Components/Container/Container";
import HomeCard from "@/app/_Components/HomeCard/HomeCard";
import PageHeader from "@/app/_Components/PageHeader/PageHeader";
import { Product } from "@/types/product.t";

const page = async() => {
  const data: Product[] = await getAllProducts();
  return (
    <>
      <PageHeader
        title="All Products"
        subtitle="Explore our complete product collection"
      />

      <Container>
        <h3 className="my-6 text-sm text-gray-500">Showing 40 products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.map((product) => (
            <HomeCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default page;

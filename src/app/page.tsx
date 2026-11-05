import { getAllProducts } from "@/apis/product";
import { Product } from "@/types/product.t";
import HomeCard from "./_Components/HomeCard/HomeCard";
import MainSlider from "./_Components/MainSlider/MainSlider";
import Categories from "./_Components/Categories/Categories";
import FeaturesBar from "./_Components/FeaturesBar/FeaturesBar";
import PromoBanners from "./_Components/PromoBanners/PromoBanners";
import Newsletter from "./_Components/NewsLetter/NewsLetter";
import SectionTitle from "./_Components/SectionTitle/SectionTitle";
import Container from "./_Components/Container/Container";

const Products = async () => {
  const data: Product[] = await getAllProducts();

  return (
    <>
      <MainSlider />

      <section className="py-5">
        <Container>
          <FeaturesBar />
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Categories />
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <PromoBanners />
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <SectionTitle title="Featured" highlight="Products" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.map((product) => (
              <HomeCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <Newsletter />
      
    </>
  );
};

export default Products;

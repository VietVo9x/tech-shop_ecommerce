import { Contact, FeaturedProducts, Hero, Services } from '../../components/HomeComponents';
import ScrollToTopButton from '../../components/ScrollToTopButton';

export default function Home() {
  return (
    <div>
      <ScrollToTopButton />
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </div>
  );
}

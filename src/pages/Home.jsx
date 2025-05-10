import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import OffersSection from "../components/products/OffersSection";
import ProductSection from "../components/products/ProductSection";
import PrimaryButton from "../components/ui/PrimaryButton";

const Home = () => {
  return (
    <div className="w-full dark:bg-gray-900 px-5 pt-10">
      {/* Header Slider */}
      <section className="mb-10">
        <Flicking
          circular={true}
          horizontal={true}
          viewportTag={"div"}
          cameraTag={"div"}
          cameraClass=""
          align={"center"}
          className="h-64"
        >
          <div className="bg-blue-500 text-white flex items-center justify-center h-full w-full rounded-lg">
            <h2 className="text-2xl font-bold">Welcome to ShoesPanel</h2>
          </div>
          <div className="bg-green-500 text-white flex items-center justify-center h-full w-full rounded-lg">
            <h2 className="text-2xl font-bold">Discover Our Latest Offers</h2>
          </div>
          <div className="bg-purple-500 text-white flex items-center justify-center h-full w-full rounded-lg">
            <h2 className="text-2xl font-bold">Shop the Best Products</h2>
          </div>
        </Flicking>
      </section>

      {/* Services Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-5">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Fast Delivery
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get your products delivered quickly and safely.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              24/7 Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We are here to help you anytime, anywhere.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Secure Payments
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your transactions are safe with us.
            </p>
          </div>
        </div>
      </section>

      {/* Products in Offer Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Products in Offer
          </h2>
          <PrimaryButton to="/products/offers">View All Offers</PrimaryButton>
        </div>
        <OffersSection category="all" />
      </section>

      {/* Normal Products Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Explore Our Products
          </h2>
          <PrimaryButton to="/products">View All Products</PrimaryButton>
        </div>
        <ProductSection category="all" />
      </section>
    </div>
  );
};

export default Home;

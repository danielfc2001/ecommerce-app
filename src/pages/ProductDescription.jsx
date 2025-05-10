import { useState } from "react";
import FormInput from "../components/FormInput";
import StarIcon from "../components/icons/StarIcon";
import PrimaryButton from "../components/ui/PrimaryButton";

const ProductDescription = () => {
  const [hoveredRate, setHoveredRate] = useState(0);
  const [rateClicked, setRateClicked] = useState(false);
  const [rate, setRate] = useState(0);

  const handleRateClick = (e) => {
    setRateClicked(true);
    setRate(e.target.value);
    setHoveredRate(e.target.value);
  };

  const handleHoverRate = (e) => {
    return !rateClicked
      ? setHoveredRate(e.target.dataset.target)
      : setHoveredRate(hoveredRate);
  };

  const handleLeaveRate = () => {
    if (!rateClicked) {
      setHoveredRate(0);
    }
  };

  return (
    <div className="flex flex-col dark:bg-gray-900 px-10">
      <div className="flex flex-row w-full gap-3">
        <section className="w-full md:w-2/3">
          <div className="w-full h-69 bg-gray-200 dark:bg-gray-700 rounded-lg mb-5"></div>
          <h2 className="text-4xl dark:text-white mb-3">Product Title</h2>
          <p className="text-gray-800 dark:text-gray-200 mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            excepturi officia atque quibusdam nostrum in reiciendis adipisci
            maxime dolorum commodi. Magnam cupiditate enim magni alias sit
            distinctio qui voluptate cumque.
          </p>
          <div className="flex flex-row items-center justify-end mb-3">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200 mr-3">
              $99.99
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              $129.99
            </span>
          </div>
          <div className="flex flex-row items-center justify-end mb-3">
            <span className="text-sm font-light text-gray-800 dark:text-gray-200 mr-3">
              Este producto tiene habilitada la opcion de cambio de moneda
              automatico:
            </span>
            <span className="font-semibold text-sm text-gray-500 dark:text-gray-200">
              $129.99
            </span>
          </div>
        </section>
        <aside className="w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 rounded-lg p-5">
          <h2 className="font-medium text-2xl text-gray-800 dark:text-gray-200">
            Valoracion del producto:
          </h2>
          <div className="flex flex-row items-center justify-between mt-3 mb-5">
            <span className="flex flex-row gap-2 items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
              <StarIcon width={16} height={16} />
              4.5/5
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              100 valoraciones
            </span>
          </div>
          <form className="flex flex-col gap-3">
            <FormInput type="text" placeholder={"Como te llamas"} />
            <FormInput type="text" placeholder={"Danos tu opinion"} />

            <div className="flex flex-row justify-between items-center gap-5">
              {/* Input de valoración con estrellas */}
              <div className="flex flex-row justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label
                    key={star}
                    className="cursor-pointer"
                    onMouseEnter={handleHoverRate}
                    onMouseLeave={handleLeaveRate}
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      onClick={handleRateClick}
                      className="hidden"
                    />
                    <StarIcon
                      target={star}
                      width={20}
                      height={20}
                      active={
                        hoveredRate > 0 ? hoveredRate >= star : rate >= star
                      }
                      className="text-gray-400 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 transition cursor-pointer
                    "
                    />
                  </label>
                ))}
              </div>

              <PrimaryButton>Enviar</PrimaryButton>
            </div>
          </form>
          <section className="mt-4">
            <h3 className="text-gray-800 dark:text-gray-200">
              Reseñas recientes:
            </h3>
            <ul>
              <li className="flex flex-col bg-gray-200 dark:bg-gray-700 mt-3 p-3 rounded-lg">
                <div className="flex flex-row items-center justify-between">
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    Daniel Fundora
                  </span>
                  <span className="text-xs text-gray-900 dark:text-gray-100">
                    04/04/2025
                  </span>
                </div>
                <span className="flex flex-row items-center text-xs text-gray-900 dark:text-gray-100 my-1 gap-2">
                  <StarIcon width={16} height={16} />
                  4/5
                </span>
                <p className="font-light text-sm text-gray-800 dark:text-gray-200 p-2">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorum aut rerum sint assumenda, magnam quas non odio
                  molestiae mollitia esse expedita consectetur officia nobis
                  voluptatibus sed quam, omnis vero perferendis?
                </p>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default ProductDescription;

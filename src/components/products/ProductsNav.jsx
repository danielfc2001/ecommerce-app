import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import PagButton from "../ui/PagButton";

const ProductsNav = ({ current, next, prev, onClickPrev, onClickNext }) => {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-3 my-4">
      <PagButton disabled={prev === null} onClick={onClickPrev}>
        <ArrowLeftIcon width={20} height={20} />
      </PagButton>
      <PagButton disabled={prev === null}>{prev || "."}</PagButton>
      <PagButton disabled={current === null}>{current || 1}</PagButton>
      <PagButton disabled={next === null}>{next || "."}</PagButton>
      <PagButton disabled={next === null} onClick={onClickNext}>
        <ArrowRightIcon width={20} height={20} />
      </PagButton>
    </div>
  );
};

export default ProductsNav;

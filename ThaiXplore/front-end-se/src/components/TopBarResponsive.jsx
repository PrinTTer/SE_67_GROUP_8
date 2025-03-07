import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TopBarResponsive = (prop) => {
  const { setIsNaviOpen, isNaviOpen } = prop;
  return (
    <div className="lg:hidden flex justify-between p-4">
      <div className="text-2xl font-bold">ThaiXplore</div>
      <div onClick={() => setIsNaviOpen(true)} className={`flex flex-col`}>
        <div
          className={`${
            isNaviOpen ? "-rotate-45" : ""
          } h-fit w-fit transition-discrete transition-all ease-in-out`}
        >
          <FontAwesomeIcon icon={faMinus} size="2xl" />
        </div>
        <div
          className={`${
            isNaviOpen ? "rotate-45" : "top-6"
          } absolute  h-fit w-fit transition-discrete transition-all ease-in-out`}
        >
          <FontAwesomeIcon className="w-fit h-fit" icon={faMinus} size="2xl" />
        </div>
      </div>
    </div>
  );
};

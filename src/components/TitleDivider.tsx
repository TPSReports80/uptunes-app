type Props = {
  text: string;
};

const TitleDivider = ({ text }: Props) => {
  return (
    <div className="flex items-center gap-3 mb-12 max-md:mb-10">
      <h4 className="uppercase text-sm text-nowrap font-semibold tracking-3 text-orange-500">
        {text}
      </h4>
      <div className="h-[2px] w-full m-auto bg-orange-500"></div>
    </div>
  );
};

export default TitleDivider;

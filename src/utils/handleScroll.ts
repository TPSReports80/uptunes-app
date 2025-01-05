export const handleScrollToSection = (
  ref: React.MutableRefObject<HTMLButtonElement | null>
) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

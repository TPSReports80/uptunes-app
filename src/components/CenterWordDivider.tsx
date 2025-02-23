import styles from "./CenterWordDivider.module.scss";

const CenterWordDivider = () => {
  return (
    <h4
      className={`text-center uppercase font-semibold text-xl max-md:text-lg tracking-4 mb-4 text-white ${styles.title} `}
    >
      Top Albums
    </h4>
  );
};

export default CenterWordDivider;

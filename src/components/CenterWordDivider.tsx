import styles from "./CenterWordDivider.module.scss";

type Props = {};

const CenterWordDivider = (props: Props) => {
  return (
    <h4
      className={`text-center uppercase font-semibold text-xl max-md:text-lg tracking-4 mb-14 text-white ${styles.title} `}
    >
      Top Albums
    </h4>
  );
};

export default CenterWordDivider;

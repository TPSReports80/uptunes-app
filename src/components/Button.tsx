import styles from "./Button.module.scss";
import { useNavigate } from "react-router-dom";
type Props = {
  text: string;
  url: string | undefined;
  adjustWidth?: boolean;
};

const Button = ({ text, url, adjustWidth }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (url) navigate(url);
  };
  const btnStyles =
    "text-white border border-amber-400 font-semibold hover:text-amber-700 py-2 px-8 rounded-full text-lg max-md:text-sm";

  return (
    <button
      onClick={handleClick}
      className={`${btnStyles} ${styles.button} ${
        adjustWidth ? "md:w-[70%]" : ""
      } `}
    >
      {text}
    </button>
  );
};

export default Button;

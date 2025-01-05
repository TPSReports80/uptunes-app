import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.scss";

type Props = {
  isErrorPage?: boolean;
};

const Footer = ({ isErrorPage }: Props) => {
  return (
    <footer className={`${styles.footer} `}>
      <div className="container mx-auto py-20">
        <div className="md:flex gap-32">
          <div className="max-md:mb-10">
            <p className="text-base mb-20 max-md:mb-10">
              Lorem vitae ut augue auctor faucibus eget eget ut libero.
              Elementum purus et arcu massa dictum condimentum. Augue
              scelerisque iaculis orci ut habitant laoreet. Iaculis tristique.
            </p>
            <p className="text-sm">© UpTunes All Rights Reserved.</p>
          </div>
          <div className=" text-nowrap max-md:mb-10">
            <h5 className="text-lg font-semibold mb-3">Links</h5>
            <p className="text-base">About Us</p>
            <p className="text-base my-1">Careers</p>
            <p className="text-base">FAQ</p>
          </div>
          <div className="text-nowrap max-md:mb-10">
            <h5 className="text-lg font-semibold mb-3">Contact Us</h5>
            <p className="text-sm mb-3">333) 425 - 6825</p>
            <div className="flex gap-3">
              <FaFacebookSquare />
              <FaXTwitter />
              <FaInstagramSquare />
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

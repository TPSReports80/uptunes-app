import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <>
      <main className={styles.main}>
        <section>
          <div className="container mx-auto pt-60">
            <h2 className="text-5xl uppercase font-semibold mb-4">Sorry!</h2>
            <h4 className="font-light mb-10 text-4xl max-md:text-2xl">
              We couldn't find that page...
            </h4>
            <Link
              to="/"
              className="text-white border border-white font-semibold hover:text-gray-700 py-4 px-8 rounded-full text-lg max-md:text-sm"
            >
              Go back to homepage
            </Link>
          </div>
        </section>
      </main>
      <Footer isErrorPage={true} />
    </>
  );
};

export default NotFoundPage;

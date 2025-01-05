import styles from "./LoadingPage.module.scss";
type Props = {};

const LoadingPage = (props: Props) => {
  return (
    <main>
      <section className={styles.section}>
        <div className="container mx-auto pt-60">
          <h2 className="text-5xl uppercase font-semibold mb-4">Loading...</h2>
          <h4 className="font-light mb-10 text-4xl max-md:text-2xl">
            Please wait while we find what you're looking for.
          </h4>
        </div>
      </section>
    </main>
  );
};

export default LoadingPage;

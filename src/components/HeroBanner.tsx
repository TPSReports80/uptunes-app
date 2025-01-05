import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Nav from "./HeroNav";
import styles from "./HeroBanner.module.scss";

type Props = {
  section: React.MutableRefObject<HTMLButtonElement | null>;
  handleScrollToSection: (
    ref: React.MutableRefObject<HTMLButtonElement | null>
  ) => void;
};

const HeroBanner = ({ section, handleScrollToSection }: Props) => {
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="banner-section" className={`${styles.banner} relative`}>
      <Nav isTopOfPage={isTopOfPage} />

      <section className="hero">
        <div className="container mx-auto pt-60 max-md:pt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            className={`animatedWrapper mb-4 max-md:mb-0 ${styles.animatedWrapper}`}
          >
            <h2 className={`font-bold text-6xl ${styles.staticHeader}`}>Up</h2>
            <div className={styles.animatedWords}>
              <span>coming albums</span>
              <span>date your playlist</span>
              <span>loads weekly</span>
              <span>lift your day</span>
              <span>Tunes</span>
              <span>coming albums</span>
            </div>
          </motion.div>
          <div className="hero-content">
            <motion.h4
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              className={`mb-10 text-orange-800 w-[50%] max-md:w-full max-md:text-md ${styles.heroContent}`}
            >
              Explore our collection of top albums spanning genres and eras.
              Whether you're rediscovering timeless classics or finding new
              favorites, we bring you the best in music for any occasion.
            </motion.h4>
            <motion.button
              onClick={() => handleScrollToSection(section)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              className={`text-white border border-amber-400 font-semibold hover:text-amber-700 py-2 px-8 rounded-full button ${styles.heroBtn}`}
            >
              Top Albums
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroBanner;

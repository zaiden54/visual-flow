/* eslint-disable @typescript-eslint/no-unsafe-return */
import { motion, useScroll } from 'framer-motion';
import React from 'react';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';
import VideosMap from '../ui/VideosMap';

export default function MainPage(): JSX.Element {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <MenuLeft />
      <NavBar />
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
        {/* <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} > */}
        {/* <motion.div
          animate={{
            x: 0,
            backgroundColor: '#000',
            boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)',
            position: 'fixed',
            transitionEnd: {
              display: 'none',
            },
          }}
        > */}
          <VideosMap />
        {/* </motion.div> */}

        {/* </motion.div> */}
      </div>
    </>
  );
}

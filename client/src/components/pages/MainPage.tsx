/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import MenuLeft from '../ui/MenuLeft';
import ModalWindow from '../ui/ModalWindow';
import NavBar from '../ui/NavBar';
import VideosMap from '../ui/VideosMap';

export default function MainPage(): JSX.Element {
  return (
    <>
      {/* <ModalWindow /> */}
      <MenuLeft />
      <NavBar />
      <div style={{ display:'flex',flexWrap: 'wrap',flexDirection:'column' }}>
        <VideosMap />
      </div>
    </>
  );
}

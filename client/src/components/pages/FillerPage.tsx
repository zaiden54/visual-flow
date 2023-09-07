import React from 'react';
import MenuLeft from '../ui/MenuLeft';
import NavBar from '../ui/NavBar';

export default function MainPage(): JSX.Element {
  return (
    <>
      <MenuLeft />
      <NavBar />
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems:'center', marginTop: '10%'}}>
        <h1>Страница в разработке</h1>
      </div>
    </>
  );
}

import React from 'react';
import { useParams } from 'react-router-dom';
// import ModalWindow from '../ui/ModalWindow';
// import MenuLeft from '../ui/MenuLeft';
// import NavBar from '../ui/NavBar';

export default function SubscriptionsPage(): JSX.Element {
  const { link } = useParams();

  return (
    <>
      {/* <div>SUUUBS</div>
      <ModalWindow />
      <MenuLeft />
      <NavBar /> */}
      <video id="videoPlayer" width="650px" controls muted="muted" autoPlay>
        {link && <source src={`http://localhost:3001/api/watch/${link}`} />}
      </video>
    </>
  );
}

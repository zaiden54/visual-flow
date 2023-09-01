/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useEffect } from 'react';
import MenuLeft from '../ui/MenuLeft';
import ModalWindow from '../ui/ModalWindow';
import NavBar from '../ui/NavBar';
import VideosMap from '../ui/VideosMap';
import { useAppDispatch } from '../../redux/hooks/reduxHooks';
import { checkUserThunk } from '../../redux/slices/user/userThunks';

export default function MainPage(): JSX.Element {
  // const dispatch = useAppDispatch();
  // const subs = useAppSelector((state) => state.subs.rows);
  // // const [count,setCount]=useState(0)
  // // const subs = useAppSelector((state)=>state.subs.row)
  // useEffect(() => {
  //   void dispatch(getFirstSubChannelThunk(0));
  // }, []);
  // console.log(subs);

  return (
    <>
      <ModalWindow />
      <MenuLeft />
      <NavBar />
      <VideosMap />
    </>
  );
}

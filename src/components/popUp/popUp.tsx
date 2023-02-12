import styles from './popUp.module.scss';
import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

export default function({ children, openTrigger }: { children: any, openTrigger: boolean }) {
  const [opened, setOpened] = useState<boolean>(false);

  const popUp = useRef(null);
  
  useClickOutside(popUp, () => closePopUp());

  useEffect(() => openTrigger ? openPopUp() : closePopUp(), [openTrigger]);

  function openPopUp() {
    setOpened(true);
  }

  function closePopUp() {
    setOpened(false);
  }

  return (
    opened ?
      <div className={styles.popUpBackground}>
        <div className={styles.popUp} ref={popUp}>
          { children }
        </div>
      </div>
    :
      <></>
  );
}
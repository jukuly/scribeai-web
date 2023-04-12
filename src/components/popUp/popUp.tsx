import styles from './popUp.module.scss';
import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

export default function({ children, openTrigger }: { children: any, openTrigger: boolean }) {
  const [opened, setOpened] = useState<boolean>(true);

  const popUp = useRef(null);
  
  useClickOutside(popUp, () => setOpened(false));

  useEffect(() => setOpened(opened => !opened), [openTrigger]);

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
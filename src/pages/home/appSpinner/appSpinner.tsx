import { useEffect, useState } from 'react';
import styles from './appSpinner.module.scss';

const writingApplications: {[key: string]: any} = {
  'word': require('../../../assets/writingApplicationsIcons/word.svg'),
  'outlook': require('../../../assets/writingApplicationsIcons/outlook.svg'),
  'chrome': require('../../../assets/writingApplicationsIcons/chrome.svg'),
  'firefox': require('../../../assets/writingApplicationsIcons/firefox.svg'),
  'discord': require('../../../assets/writingApplicationsIcons/discord.svg'),
  'twitter': require('../../../assets/writingApplicationsIcons/twitter.svg'),
  'facebook': require('../../../assets/writingApplicationsIcons/facebook.svg'),
}

export default function() {
  const [appSpinner, setAppSpinner] = useState<[string, string][]>(
    [
      [styles.enter, 'word'],
      [`${styles.third} ${styles.left}`, 'facebook'],
      [`${styles.second} ${styles.left}`, 'chrome'],
      [styles.main, 'discord'],
      [`${styles.second} ${styles.right}`, 'outlook'],
      [`${styles.third} ${styles.right}`, 'firefox'],
      [styles.quit, 'twitter']
    ]
  );

  useEffect(() => {
    const interval = setInterval(() => spin(), 2500);
    return () => clearInterval(interval);
  }, []);

  function spin() {
    setAppSpinner(appSpinner => {
      return appSpinner.map((item, index) => [item[0], appSpinner[index === 0 ? appSpinner.length-1 : index-1][1]]);
    });
  }

  return (
    <div className={styles.spin}>
      {
        appSpinner.map(item => 
          <img className={`${styles.item} ${item[0]}`} key={item[1]} src={writingApplications[item[1]].default} alt={item[1]} draggable={false} />
        )
      }
    </div>
  );
}
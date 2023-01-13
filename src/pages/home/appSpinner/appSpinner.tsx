import { useEffect, useState } from "react";
import './appSpinner.scss';

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
      ['enter', 'word'],
      ['third left', 'facebook'],
      ['second left', 'chrome'],
      ['main', 'discord'],
      ['second right', 'outlook'],
      ['third right', 'firefox'],
      ['quit', 'twitter']
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
    <div className='spin'>
      {
        appSpinner.map(item => 
          <img className={`item ${item[0]}`} key={item[1]} src={writingApplications[item[1]].default} alt={item[1]} draggable={false} />
        )
      }
    </div>
  );
}
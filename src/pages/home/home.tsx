import DownArrow from '../../components/downArrow/downArrow';
import AppSpinner from './appSpinner/appSpinner';
import './home.scss';
import ShowOff from './showOff/showOff';

export default function({ top } : { top: boolean }) {
  return (
    <>
      <main>
        <header id='hero'>
          <div className='content'>
            <div className='gradient-circle'></div>
            <div className='title'>
              <h1 className='gradient-text'>
                ScribeAI.
              </h1>
              <h2 className='description'>
                The ScribeAI desktop app utilizes artificial intelligence to boost productivity and help write better texts with features like text completion and rephrasing.
              </h2>
            </div>
            <ShowOff />
          </div>
        </header>
        <section id='first-section'>
          <div className='content'>
            <div className='left-side'>
              <h1>Included</h1>
              <ul className='features'>
                <li>
                  Text completion
                  <p>
                    AI is used to give suggestions based on the context.<br />
                    You can also give a few keywords so you can spend less
                    time thinking how and more time thinking what.
                  </p>
                </li>
                <li>
                  Grammar correction
                  <p>
                    So you can stop stressing about perfect writing.
                  </p>
                </li>
                <li>
                  Rephrasing
                  <p>
                    Ever felt like what you wrote doesn't make sense?<br />
                    Maybe you suddently want to change an essay's style?<br />
                    Whatever it is, the rephrasing tool is life changing.
                  </p>
                </li>
                <li>
                  Translation
                  <p>
                    So you never feel limited by language anymore.
                  </p>
                </li> 
              </ul>
            </div>
            <div className='right-side'>
              <div className='video-wrapper'>
                <video src={require('../../assets/show-off-video.mp4')} autoPlay loop muted playsInline />
              </div>
            </div>            
          </div>
        </section>
        <section id='second-section'>
          <div className='content'>
            <h1>Works wherever you write</h1>
            <h2>Word, Outlook, Discord, you name it.</h2>
            <AppSpinner />
          </div>
        </section>
        <section id='third-section'>
          <div className='content'>
            "ScribeAI is so cool!!!!!!"
          </div>
        </section>
      </main>
      {
        top &&
        <DownArrow />
      }
    </>
  );
}
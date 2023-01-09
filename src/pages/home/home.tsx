import DownArrow from '../../components/downArrow/downArrow';
import './home.scss';
import ShowOff from './showOff/showOff';

export default function({ top } : { top: boolean }) {

  return (
    <>
      <main>
        <section className='hero'>
          <div className='gradient-circle'></div>
          <div className='content'>
            <h1 className='title'>
              <span className='gradient-text'>ScribeAI.</span>
              <br />
              <span className='description'>
                The ScribeAI desktop app utilizes artificial intelligence to boost productivity and help write better texts with features like text completion and rephrasing.
              </span>
            </h1>
            <ShowOff />
          </div>
        </section>
        <section className='first-section'>
          <div className='content'>
            <div className='left-side'>
              <h2>Included</h2>
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
                    So you can stop stressing about writing mistake-free.
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
              There will be a demo here
            </div>            
          </div>
        </section>
        <section className='second-section'>
          <div className='content'>
            this is the second section
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
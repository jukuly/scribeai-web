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
              <ul>
                <li>
                  Text completion
                </li>
                <li>
                  Grammar correction
                </li>
                <li>
                  Rephrasing
                </li>
                <li>
                  Translation
                </li> 
              </ul>
              <span className='try-me'>Try me</span>
            </div>
            <div className='right-side'>

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
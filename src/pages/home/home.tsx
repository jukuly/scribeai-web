import DownArrow from '../../components/downArrow/downArrow';
import Footer from '../../components/footer/footer';
import AppSpinner from './appSpinner/appSpinner';
import styles from './home.module.scss';
import ShowOff from './showOff/showOff';

export default function({ top } : { top: boolean }) {
  return (
    <>
      <main>
        <header className={styles.hero}>
          <div className={styles.content}>
            <div className={styles.gradientCircle}></div>
            <div className={styles.title}>
              <h1 className={styles.gradientText}>
                ScribeAI.
              </h1>
              <h2 className={styles.description}>
                The ScribeAI desktop app utilizes artificial intelligence to boost productivity and help write better texts with features like text completion and rephrasing.
              </h2>
            </div>
            <ShowOff />
          </div>
        </header>
        <section className={styles.firstSection} id='first-section'>
          <div className={styles.content}>
            <div className={styles.leftSide}>
              <h1>Included</h1>
              <ul className={styles.features}>
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
            <div className={styles.rightSide}>
              <div className={styles.videoWrapper}>
                <video src={require('../../assets/show-off-video.mp4')} autoPlay loop muted playsInline />
              </div>
            </div>            
          </div>
        </section>
        <section className={styles.secondSection}>
          <div className={styles.content}>
            <h1>Works wherever you write</h1>
            <h2>Word, Outlook, Discord, you name it.</h2>
            <AppSpinner />
          </div>
        </section>
        <section className={styles.thirdSection}>
          <div className={styles.content}>
            "ScribeAI is so cool!!!!!!"
          </div>
        </section>
        <section className={styles.fourthSection}>
          <div className={styles.content}>
            Download
          </div>
        </section>
      </main>
      {
        top &&
        <DownArrow />
      }
      <Footer />
    </>
  );
}
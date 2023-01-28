import styles from './download.module.scss';

export default function() {
  return (
    <div className={styles.download}>
      <div className={styles.gradientCircle}></div>
      <main className={styles.box}>
        <h1>Download</h1>
        <h2>Windows</h2>
        <a href='/'>64bit installer</a>
        <a href='/'>32bit installer</a>
        <h2>MacOS</h2>
        <a href='/'>64bit installer</a>
        <a href='/'>32bit installer</a>
        <h2>Linux</h2>
        <a href='/'>64bit installer</a>
        <a href='/'>32bit installer</a>
      </main>
    </div>
  );
}
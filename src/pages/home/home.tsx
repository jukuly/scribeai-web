import './home.scss';

export default function() {
  return (
    <main>
      <div className='hero'>
        <h1 className='title'>
          <span className='gradient-text'>ScribeAI.</span>
          <br />
          <span className='description'>The AI powered writing assistant.</span>
        </h1>
        <div className='show-off'>
          <div className='text-editor'>
            <div className='menu'>
              <span className='material-symbols-outlined minimize'>minimize</span>
              <span className='material-symbols-outlined close'>close</span>
            </div>
            <p className='text'>
              Hello professor,<br />
              <br />
              <span className='selected'>I was wondering if after next class, I could come to your office to talk about the last exam. There</span>
            </p>
            <div className='pop-up'>
              <img src={require('../../assets/show-off-pop-up.png')} alt='show-off-pop-up' draggable='false' />
              <span className='material-symbols-outlined close pointer'>near_me</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
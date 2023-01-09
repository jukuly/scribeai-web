import './header.scss';

export default function() {

  return (
    <nav className='header'>
      <a className='home' href='/'>
        ScribeAI.
      </a>
      <a className='download' href='/download'>
        <button>
          Download
        </button>
      </a>
      <a className='sign-in' href='/sign-in'>
        <button>
          Sign In
        </button>
      </a>
    </nav>
  );
}
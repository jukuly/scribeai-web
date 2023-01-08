import './header.scss';

export default function() {
  return (
    <nav>
      <a className='logo' href='/'>
        Home
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
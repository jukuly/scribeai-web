import { useState } from "react";
import './demo.scss';

export default function() {
  const [results, setResults] = useState<string[]>([]);
  const [options, setOptions] = useState<Set<string>>(new Set());

  const [current, setCurrent] = useState<string>('0');
  const [cWord, setCWord] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('');

  const opt = ['Complete', 'Grammar', 'Rephrase', 'Translate'];
  
  function refresh() {
    switch (current) {
      case '0':
        setResults([
          'were a couple of points I didn\'t understand.',
          'were a few things I wasn\'t totally sure about and I wanted to get your opinion',
          'were some mistakes in it, and I want to get them fixed.'
        ]);
        setPlaceholder('Keywords (max. 5)');
        setOptions(new Set());
        break;
      case '1':
        setResults(['May I come to your office to talk about the last exam after next class?']);
        break;
      case '2':
        setResults(['Could I schedule an appointment with you sometime after the next lecture to discuss the previous examination?']);
        break;
      case '3':
        setResults(['Je voulais savoir si après le prochain cours, je pourrais venir à votre bureau pour parler du dernier examen?']);
        setPlaceholder('Language');
        setOptions(new Set());
        break;
      default:
        break;
    }
  }
  
  function change(value: any) {
    switch (value) {
      case '0':
        setPlaceholder('Keywords (max. 5)');
        setOptions(new Set());
        break;
      case '3':
        setPlaceholder('Language');
        setOptions(new Set());
        break;
      default:
        break;
    }
  }

  function addWord(word: string): void {
    word = word.trim();
    setOptions(content => {
      const newSet = new Set(content);
      newSet.add(word);
      return newSet;
    });
    setCWord('');
  }

  function removeWord(word: string): void {
    setOptions(options => {
      const newSet = new Set(options);
      newSet.delete(word);
      return newSet;
    });
  }

  return (
    <div className="demo">
      <div className="editor">
        <div className="menu">
          <span className="material-symbols-outlined minimize">minimize</span>
          <span className="material-symbols-outlined close">close</span>
        </div>
        <p className="text">
          Hello professor,<br />
          <br />
          <span className="selected">I was wondering if after next class, I could come to your office to talk about the last exam. There</span>
        </p>
      </div>

      <div className="signed-in">
        {
          results.map((text, index) => 
            <div className="result clickable" key={index}>
              {text}
              <span className="material-symbols-outlined copy-icon">
                content_copy
              </span>
            </div>
          )
        }
        <div className="buttons">

          <div className="action">
            <span className='text' onClick={() => setOpen(open => !open)}>{opt[parseInt(current)]}</span>
            <span className='material-symbols-outlined'>expand_more</span>
            {
              open &&
              <div className="options">
                <div onClick={() => {setOpen(false); setCurrent('0'); change('0');}}>Complete</div>
                <div onClick={() => {setOpen(false); setCurrent('1'); change('1');}}>Grammar</div>
                <div onClick={() => {setOpen(false); setCurrent('2'); change('2');}}>Rephrase</div>
                <div onClick={() => {setOpen(false); setCurrent('3'); change('3');}}>Translate</div>
              </div>
            }
          </div>
          
          <button className="refresh" onClick={() => refresh()}>
            <span className="material-symbols-outlined">
              refresh
            </span>
          </button>
          <button className="close">
            <span className="material-symbols-outlined">
              close
            </span>
          </button>
        </div>
        {
          (current === "0" || current === "3") &&
          <div className="keywords">
            {
              Array.from(options).map((word, index) => 
                <span className="keyword" 
                  onClick={() => removeWord(word)} key={index}>
                  <>
                    {word}
                    <span className="material-symbols-outlined copy-icon">
                      close
                    </span>
                  </>
                </span>
              )
            }
            <form onSubmit={event => {
              event.preventDefault();
              addWord(cWord);
            }}>
              <input className="add-keyword" type="text" placeholder={placeholder} value={cWord} 
                onChange={event => setCWord(event.target.value)} maxLength={25}></input>
            </form>
          </div>
        }
      </div>

      <span className="material-symbols-outlined pointer">near_me</span>
    </div>
  );
}
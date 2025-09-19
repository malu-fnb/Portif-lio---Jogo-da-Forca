import React, { useState, useCallback, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, RotateCw } from 'lucide-react';
import './App.css';

const words = [
  "REACT", "JAVASCRIPT", "PERNAMBUCO", "COMPUTACAO", "DESENVOLVEDOR",
  "INTERFACE", "ESTILIZACAO", "COMPONENTE", "APLICATIVO", "NAVEGADOR",
  "FRAMEWORK", "BIBLIOTECA", "PROJETO", "PORTFOLIO", "CARREIRA", "TECNOLOGIA",
  "AUTOMACAO", "PYTHON", "DJANGO", "TRELLO", "ANALISE",
  "VISUALIZACAO", "INSIGHTS", "DECISOES", "LOGICA", "ALGORITMO", "PROGRAMACAO",
  "UNIVERSIDADE", "ESTAGIARIA"
];

const maxWrongGuesses = 10;

const HangmanFigure = ({ wrongGuesses }) => {
  const parts = [
    <line key="base" x1="60" y1="280" x2="140" y2="280" className="hangman-part" />,
    <line key="pole" x1="100" y1="280" x2="100" y2="100" className="hangman-part" />,
    <line key="beam" x1="100" y1="100" x2="200" y2="100" className="hangman-part" />,
    <line key="rope" x1="200" y1="100" x2="200" y2="140" className="hangman-part" />,
    <circle key="head" cx="200" cy="160" r="20" className="hangman-part" />,
    <line key="body" x1="200" y1="180" x2="200" y2="240" className="hangman-part" />,
    <line key="arm1" x1="200" y1="200" x2="170" y2="220" className="hangman-part" />,
    <line key="arm2" x1="200" y1="200" x2="230" y2="220" className="hangman-part" />,
    <line key="leg1" x1="200" y1="240" x2="170" y2="270" className="hangman-part" />,
    <line key="leg2" x1="200" y1="240" x2="230" y2="270" className="hangman-part" />,
  ];

  return (
    <svg height="300" width="300" viewBox="0 0 300 350" className="hangman-figure">
      {parts.slice(0, wrongGuesses)}
    </svg>
  );
};

const HangmanGame = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  const startNewGame = useCallback(() => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setWrongGuesses(0);
  }, []);

  useEffect(startNewGame, [startNewGame]);

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;
    setGuessedLetters(prev => [...prev, letter]);
    if (!selectedWord.includes(letter)) setWrongGuesses(prev => prev + 1);
  };

  const isWinner = selectedWord && [...selectedWord].every(l => guessedLetters.includes(l));
  const isLoser = wrongGuesses >= maxWrongGuesses;
  const isGameOver = isWinner || isLoser;

  return (
    <div className="hangman-game">
      <header className="hangman-header">
        <div>
          <h2>Jogo da Forca</h2>
          <p>Adivinhe a palavra antes que seja tarde!</p>
        </div>
        <button onClick={startNewGame} className="hangman-restart" aria-label="Reiniciar Jogo">
          <RotateCw size={24} />
        </button>
      </header>

      <div className="hangman-container">
        <HangmanFigure wrongGuesses={wrongGuesses} />

        {isGameOver && (
          <div className="hangman-overlay">
            <h3>{isWinner ? "Você Venceu!" : "Você Perdeu :/"}</h3>
            <p>A palavra era: <strong>{selectedWord}</strong></p>
            <button onClick={startNewGame} className="hangman-newgame">Jogar Novamente</button>
          </div>
        )}
      </div>

      <div className="word-display">
        {selectedWord.split('').map((letter, i) => (
          <span key={i} className="word-letter">{guessedLetters.includes(letter) ? letter : ''}</span>
        ))}
      </div>

      <div className="letter-buttons">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
          <button key={letter} onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || isGameOver}>
            {letter}
          </button>
        ))}
      </div>

      <p className="attempts">Tentativas restantes: {maxWrongGuesses - wrongGuesses}</p>
    </div>
  );
};

export default function App() {
  const [activeView, setActiveView] = useState('portfolio');
  const skills = [
    "Gerenciamento de Banco de Dados", "Power BI", "Power Automate", "Python", "C", "Java", 
    "JavaScript", "CSS", "HTML", "Trello", "Django", "SQL Server", "SQLite", "Microsoft Fabric"
  ];

  return (
    <div className="app">
      <main className="main-container">
        <nav className="nav-buttons">
          <button onClick={() => setActiveView('portfolio')} className={activeView === 'portfolio' ? 'active' : ''}>Portfólio</button>
          <button onClick={() => setActiveView('game')} className={activeView === 'game' ? 'active' : ''}>Jogo da Forca</button>
        </nav>

        {activeView === 'portfolio' ? (
          <section className="portfolio">
            <h1>Malu Bezerra</h1>
            <p>Estudante de Ciência da Computação e estagiária em Análise de Dados.</p>
            <div className="contacts">
              <a href="mailto:malufnb23@gmail.com"><Mail size={20}/> Email</a>
              <a href="tel:+5581992099860"><Phone size={20}/> Telefone</a>
              <a href="https://github.com/malu-fnb" target="_blank"><Github size={20}/> Github</a>
              <a href="https://www.linkedin.com/in/malu-de-faria-neves-bezerra-8a502126a/" target="_blank"><Linkedin size={20}/> LinkedIn</a>
            </div>

            <h2>Habilidades</h2>
            <div className="skills">
              {skills.map(skill => (
                <span key={skill} className="skill">{skill}</span>
              ))}
            </div>
          </section>
        ) : (
          <HangmanGame />
        )}
      </main>
    </div>
  );
}

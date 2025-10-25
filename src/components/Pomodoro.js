import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60); // Temps en secondes (défaut 25 min)
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(1); // Nombre de cycles dans le programme
  const [currentCycle, setCurrentCycle] = useState(1);
  const [tag, setTag] = useState('study'); // Tag sélectionné
  const [programs, setPrograms] = useState([]); // Programmes sauvegardés
  const [sessionNote, setSessionNote] = useState(null); // Note fin session
  const [feedback, setFeedback] = useState(''); // Feedback IA

  // Tags disponibles
  const tags = ['study', 'work', 'reading', 'language', 'creative'];

  // Charger programmes depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pomodoroPrograms');
    if (saved) setPrograms(JSON.parse(saved));
  }, []);

  // Sauvegarder programmes
  const saveProgram = (workTime, breakTime, numCycles, selectedTag) => {
    const newProgram = { id: Date.now(), work: workTime, break: breakTime, cycles: numCycles, tag: selectedTag };
    const updated = [...programs, newProgram];
    setPrograms(updated);
    localStorage.setItem('pomodoroPrograms', JSON.stringify(updated));
  };

  // Timer
  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      handleEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(isBreak ? 5 * 60 : 25 * 60);
    setCurrentCycle(1);
  };

  const handleEnd = () => {
    setIsActive(false);
    if (!isBreak && currentCycle < cycles) {
      // Pause après travail
      setTime(5 * 60); // Défaut pause 5 min
      setIsBreak(true);
      setCurrentCycle((prev) => prev + 1);
      navigator.vibrate?.([200]); // Vibration
      // Son ding (simulé ; ajoute audio tag pour vrai son)
      console.log('Ding ! Pause time.');
    } else if (isBreak && currentCycle <= cycles) {
      // Reprise travail
      setTime(25 * 60);
      setIsBreak(false);
    } else {
      // Fin programme
      setSessionNote(null);
      alert('Programme terminé ! Note ta session.');
      // Appel IA pour feedback (ex. avec OpenAI)
      getIAFeedback();
    }
  };

  const getIAFeedback = async () => {
    // Exemple appel OpenAI GPT-5 Nano (adapte avec ta clé)
    const prompt = `Utilisateur a fait un Pomodoro ${tag} de ${cycles} cycles, note ${sessionNote}/5. Réagis motivant et suggère un mini-défi mental.`;
    // Ici, code API call (voir ci-dessous)
    setFeedback('IA : Super effort ! Tu progresses. Essaie un calcul mental pour consolider.'); // Placeholder
  };

  const handleNote = (note) => {
    setSessionNote(note);
    getIAFeedback();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 bg-green-100 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Séance Pomodoro</h2>
      
      {/* Sélection temps et tag */}
      <div className="mb-4">
        <label className="block mb-2">Temps travail (min) : </label>
        <input type="number" value={Math.floor(time / 60)} onChange={(e) => setTime(e.target.value * 60)} className="border p-2 mr-2" min="1" max="60" />
        
        <label className="block mt-2 mb-2">Tag : </label>
        <select value={tag} onChange={(e) => setTag(e.target.value)} className="border p-2">
          {tags.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      
      {/* Créer programme */}
      <div className="mb-4">
        <label>Cycles : </label>
        <input type="number" value={cycles} onChange={(e) => setCycles(e.target.value)} className="border p-2 mr-2" min="1" max="10" />
        <button onClick={() => saveProgram(Math.floor(time / 60), 5, cycles, tag)} className="bg-green-600 text-white px-4 py-2 rounded">
          Sauvegarder Programme
        </button>
      </div>
      
      {/* Programmes sauvegardés */}
      <div className="mb-4">
        <h3>Programmes :</h3>
        {programs.map(p => (
          <div key={p.id} className="text-sm bg-green-200 p-2 rounded mb-1">
            {p.work}min travail + {p.break}min pause x{p.cycles} ({p.tag})
            <button onClick={() => { setTime(p.work * 60); setCycles(p.cycles); setTag(p.tag); setCurrentCycle(1); }} className="ml-2 text-blue-600">Lancer</button>
          </div>
        ))}
      </div>
      
      {/* Timer visuel */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold">{formatTime(time)}</div>
        <div className="text-lg">{isBreak ? 'Pause' : 'Travail'}</div>
        <div className="w-32 h-32 border-4 border-green-400 rounded-full mx-auto mt-2 flex items-center justify-center">
          {currentCycle}/{cycles}
        </div>
      </div>
      
      {/* Contrôles */}
      <div className="flex justify-center space-x-2 mb-4">
        {!isActive ? (
          <button onClick={handleStart} className="bg-green-600 text-white px-6 py-2 rounded">Start</button>
        ) : (
          <button onClick={handlePause} className="bg-yellow-600 text-white px-6 py-2 rounded">Pause</button>
        )}
        <button onClick={handleReset} className="bg-gray-600 text-white px-6 py-2 rounded">Reset</button>
      </div>
      
      {/* Note fin session */}
      {sessionNote === null && !isActive && currentCycle > cycles && (
        <div className="mb-4">
          <h3>Note ta session (1-5) :</h3>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => handleNote(n)} className="mx-1 px-2 py-1 bg-blue-200 rounded">{n} ⭐</button>
          ))}
        </div>
      )}
      
      {/* Feedback IA */}
      {feedback && <div className="bg-blue-100 p-3 rounded">{feedback}</div>}
    </div>
  );
};

export default Pomodoro;

import React, { useState, useEffect, useRef } from 'react';
import Pomodoro from './components/Pomodoro'; // Importe ton Pomodoro ici

function App() {
  const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard', 'mental', 'physical', 'pomodoro'
  const [isAIExpanded, setIsAIExpanded] = useState(false); // Toggle interaction AI
  const [aiMessage, setAiMessage] = useState('Salut! Prêt pour une session pomodoro ? Ça améliorera ton focus.'); // Message IA par défaut
  const [userMessage, setUserMessage] = useState(''); // Message utilisateur
  const inputRef = useRef(null); // Ref pour focus clavier

  useEffect(() => {
    if (isAIExpanded && inputRef.current) {
      inputRef.current.focus(); // Ouvre clavier au clic
    }
  }, [isAIExpanded]);

  const handleAIClick = () => {
    // Simule interaction IA (à remplacer par appel OpenAI)
    if (userMessage.trim()) {
      setAiMessage(`Réponse à "${userMessage}" : Super idée ! On avance.`);
      setUserMessage(''); // Reset input après envoi
    }
  };

  const toggleAI = () => {
    setIsAIExpanded(!isAIExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Bandeau AI haut (toujours avec "AI : [texte]" et "Me : [texte]" si expanded) */}
      <header className="bg-blue-600 text-white p-2 text-center font-semibold text-lg fixed top-0 w-full z-10">
        <div>AI : {aiMessage}</div>
        {isAIExpanded && (
          <div className="mt-2 p-2 bg-blue-500 rounded-b-lg">
            <div>Me : {userMessage || 'Écris ici...'}</div>
            <div className="flex space-x-2 mt-2">
              <input
                ref={inputRef}
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={handleAIClick}
                className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
                disabled={!userMessage.trim()}
              >
                Go
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Contenu principal (offset pour bandeau haut et barre bas) */}
      <main className="flex-1 pt-16 pb-16 overflow-y-auto flex items-center justify-center">
        {activeSection === 'dashboard' && (
          <div className="text-4xl font-bold text-gray-800 text-center p-8">
            Bienvenue sur Smarter
          </div>
        )}

        {activeSection === 'mental' && (
          <section className="bg-green-100 p-6 w-full">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Mental</h2>
            <div className="grid grid-cols-1 gap-4">
              <div
                className="bg-green-200 p-4 rounded-lg cursor-pointer hover:bg-green-300"
                onClick={() => setActiveSection('pomodoro')}
              >
                <h3 className="font-semibold">Séance Pomodoro</h3>
                <p>Booste ta concentration avec un timer personnalisé.</p>
              </div>
              <div
                className="bg-green-200 p-4 rounded-lg cursor-pointer hover:bg-green-300"
                onClick={() => alert('Quiz du jour en développement !')}
              >
                <h3 className="font-semibold">Quiz du jour</h3>
                <p>Teste tes connaissances en histoire !</p>
              </div>
              <div
                className="bg-green-200 p-4 rounded-lg cursor-pointer hover:bg-green-300"
                onClick={() => alert('Flashcards en développement !')}
              >
                <h3 className="font-semibold">Flashcards Mémoire</h3>
                <p>Revois 10 mots en espagnol.</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'physical' && (
          <section className="bg-orange-100 p-6 w-full">
            <h2 className="text-2xl font-semibold text-orange-800 mb-4">Physique</h2>
            <div className="grid grid-cols-1 gap-4">
              <div
                className="bg-orange-200 p-4 rounded-lg cursor-pointer hover:bg-orange-300"
                onClick={() => alert('Workout en développement !')}
              >
                <h3 className="font-semibold">Workout Muscu</h3>
                <p>10 push-ups, 15 squats.</p>
              </div>
              <div
                className="bg-orange-200 p-4 rounded-lg cursor-pointer hover:bg-orange-300"
                onClick={() => alert('Yoga en développement !')}
              >
                <h3 className="font-semibold">Étirements Yoga</h3>
                <p>5 min pour détendre ton dos.</p>
              </div>
              <div
                className="bg-orange-200 p-4 rounded-lg cursor-pointer hover:bg-orange-300"
                onClick={() => alert('Marche en développement !')}
              >
                <h3 className="font-semibold">Marche Rapide</h3>
                <p>15 min pour booster ton énergie.</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'pomodoro' && (
          <section className="bg-green-100 p-6 w-full">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Séance Pomodoro</h2>
            <Pomodoro />
            <button
              onClick={() => setActiveSection('mental')}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Retour
            </button>
          </section>
        )}
      </main>

      {/* Barre navigation bas (fixed) */}
      <footer className="bg-gray-200 p-2 fixed bottom-0 w-full flex justify-between items-center z-10">
        <button
          onClick={() => setActiveSection('mental')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 w-1/3 text-center"
        >
          Mental
        </button>
        <button
          onClick={toggleAI}
          className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-700"
        >
          AI
        </button>
        <button
          onClick={() => setActiveSection('physical')}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 w-1/3 text-center"
        >
          Physique
        </button>
      </footer>
    </div>
  );
}

export default App;

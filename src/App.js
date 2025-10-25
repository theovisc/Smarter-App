import React, { useState } from 'react';
import Pomodoro from './components/Pomodoro'; // Importe ton Pomodoro ici

function App() {
  const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard', 'mental', 'physical'
  const [isAIExpanded, setIsAIExpanded] = useState(false); // Toggle bandeau AI

  const handleIAClick = () => {
    // Simule interaction IA (à remplacer par appel OpenAI)
    alert("Demande à ton coach IA : 'Quel plan aujourd'hui ?'");
  };

  const toggleAI = () => {
    setIsAIExpanded(!isAIExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Bandeau AI haut (toujours visible, dépliable) */}
      <header className="bg-blue-600 text-white p-2 text-center font-bold text-lg fixed top-0 w-full z-10">
        Ton Coach IA
        {isAIExpanded && (
          <div className="mt-2 p-2 bg-blue-500 rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Demande un plan personnalisé..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={handleIAClick}
                className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
              >
                Go
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Contenu principal (offset pour bandeau haut et barre bas) */}
      <main className="flex-1 pt-12 pb-16 overflow-y-auto">
        {activeSection === 'dashboard' && (
          <div className="flex flex-col md:flex-row">
            <section className="md:w-1/2 bg-green-100 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Mental</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-green-200 p-4 rounded-lg">
                  <h3 className="font-semibold">Quiz du jour</h3>
                  <p>Teste tes connaissances en histoire !</p>
                </div>
                {/* Autres cartes Mental */}
              </div>
            </section>
            <section className="md:w-1/2 bg-orange-100 p-6">
              <h2 className="text-2xl font-semibold text-orange-800 mb-4">Physique</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-orange-200 p-4 rounded-lg">
                  <h3 className="font-semibold">Workout Muscu</h3>
                  <p>10 push-ups, 15 squats.</p>
                </div>
                {/* Autres cartes Physique */}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'mental' && (
          <section className="bg-green-100 p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Mental</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-green-200 p-4 rounded-lg">
                <h3 className="font-semibold">Quiz du jour</h3>
                <p>Teste tes connaissances en histoire !</p>
              </div>
              <div className="bg-green-200 p-4 rounded-lg">
                <h3 className="font-semibold">Flashcards Mémoire</h3>
                <p>Revois 10 mots en espagnol.</p>
              </div>
              {/* Intègre Pomodoro ici */}
              <Pomodoro />
            </div>
          </section>
        )}

        {activeSection === 'physical' && (
          <section className="bg-orange-100 p-6">
            <h2 className="text-2xl font-semibold text-orange-800 mb-4">Physique</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-orange-200 p-4 rounded-lg">
                <h3 className="font-semibold">Workout Muscu</h3>
                <p>10 push-ups, 15 squats.</p>
              </div>
              <div className="bg-orange-200 p-4 rounded-lg">
                <h3 className="font-semibold">Étirements Yoga</h3>
                <p>5 min pour détendre ton dos.</p>
              </div>
              <div className="bg-orange-200 p-4 rounded-lg">
                <h3 className="font-semibold">Marche Rapide</h3>
                <p>15 min pour booster ton énergie.</p>
              </div>
            </div>
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

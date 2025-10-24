```jsx
import React from 'react';
import './index.css';

function Dashboard() {
  const handleIAClick = () => {
    // Simule interaction IA (ex. : requête à xAI API)
    alert("Demande à ton coach IA : 'Quel plan aujourd'hui ?'");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 text-center font-bold text-xl">
        Smarter - Deviens une meilleure version de toi
        <p className="text-sm">Essai gratuit : 30 jours restants</p>
      </header>

      {/* Sections Cerveau et Physique */}
      <div className="flex flex-1 flex-col md:flex-row">
        <section className="md:w-1/2 bg-mentalLight p-6">
          <h2 className="text-2xl font-semibold text-mental mb-4">Mental</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-mental/20 p-4 rounded-lg">
              <h3 className="font-semibold">Quiz du jour</h3>
              <p>Teste tes connaissances en histoire !</p>
            </div>
            <div className="bg-mental/20 p-4 rounded-lg">
              <h3 className="font-semibold">Flashcards Mémoire</h3>
              <p>Revois 10 mots en espagnol.</p>
            </div>
            <div className="bg-mental/20 p-4 rounded-lg">
              <h3 className="font-semibold">Pomodoro</h3>
              <p>25 min de focus intense.</p>
            </div>
          </div>
        </section>
        <section className="md:w-1/2 bg-physicalLight p-6">
          <h2 className="text-2xl font-semibold text-physical mb-4">Physique</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-physical/20 p-4 rounded-lg">
              <h3 className="font-semibold">Workout Muscu</h3>
              <p>10 push-ups, 15 squats.</p>
            </div>
            <div className="bg-physical/20 p-4 rounded-lg">
              <h3 className="font-semibold">Étirements Yoga</h3>
              <p>5 min pour détendre ton dos.</p>
            </div>
            <div className="bg-physical/20 p-4 rounded-lg">
              <h3 className="font-semibold">Marche Rapide</h3>
              <p>15 min pour booster ton énergie.</p>
            </div>
          </div>
        </section>
      </div>

      {/* IA Centrale */}
      <footer className="bg-gray-200 p-4 fixed bottom-0 w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ton Coach IA</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Demande un plan personnalisé..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ia"
          />
          <button
            onClick={handleIAClick}
            className="bg-ia text-white py-2 px-4 rounded-lg hover:bg-ia/80"
          >
            Go
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;

import React from 'react';

const App: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600">StreamPulse Analytics Test</h1>
      <p className="mt-4 text-gray-700">If you can see this, the basic setup is working.</p>
      <div className="mt-6 p-4 bg-green-100 rounded-lg">
        <p className="text-green-800">✅ React is rendering</p>
        <p className="text-green-800">✅ Tailwind CSS is working</p>
        <p className="text-green-800">✅ Vite development server is running</p>
      </div>
    </div>
  );
};

export default App;

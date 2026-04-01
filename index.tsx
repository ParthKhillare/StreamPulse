
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Ensure root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found. Please ensure index.html has a div with id='root'");
}

// Create React 19 root
const root = ReactDOM.createRoot(rootElement);

// Render app with error boundary
try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: system-ui;">
      <h1 style="color: #dc2626;">Application Error</h1>
      <p>Failed to load StreamPulse Analytics. Please check the console for details.</p>
      <button onclick="location.reload()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Reload
      </button>
    </div>
  `;
}

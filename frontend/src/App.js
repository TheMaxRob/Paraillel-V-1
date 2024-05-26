import React, { useState } from 'react';
import './App.css';
import ChatGPT from './ChatGPT';
import Cale from './Cale';
import LessonPlanContextProvider from './LessonPlanContext';

function App() {
  // State to determine which component to render
  const [currentPage, setCurrentPage] = useState('chat');

  // Function to render the appropriate component based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'chat':
        return <ChatGPT />;
      case 'cale':
        return <Cale />;
      case 'TheSettings':
        return <TheSettings />;
      case 'home':
        return <Home setCurrentPage={handleNavigation} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'LoginSuccess':
        return <LoginSuccess onSubmit={handleSubmit} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <LessonPlanContextProvider>
      <div className="App">
      {showHome && <Home setCurrentPage={handleNavigation} />} 
      {renderPage()}
      {isLoggedIn && (
        <>
        </>
      )}
    </div>
    </LessonPlanContextProvider>
  );
}

export default App;
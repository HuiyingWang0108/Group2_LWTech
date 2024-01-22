// src/App.tsx

import React from 'react';
import ClassesList from './components/ClassesList';
import DegreesList from './components/DegreesList';

const App: React.FC = () => {
  return (
    <div>
      <h1>React TypeScript JSON App</h1>
      <ClassesList />
      <DegreesList />
    </div>
  );
};

export default App;

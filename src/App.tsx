import React from 'react';
import DegreeTable from './components/DegreeTable/DegreeTable';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Wrapper from './components/Wrapper';

const App: React.FC = () => {
  return (
    <Wrapper>
      <Header title="Computing Software Development and Computer Science Pathways" />
      <DegreeTable/>
      <Form/>
    </Wrapper>
  );
};

export default App;

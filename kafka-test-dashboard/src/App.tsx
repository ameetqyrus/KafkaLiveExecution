import React, { useState } from 'react';
import CreateProject from './components/CreateProject';
import CreateSuite from './components/CreateSuite';
import AddProducer from './components/AddProducer';
import SelectProducer from './components/SelectProducer';
import SelectAssertions from './components/SelectAssertions';
import RunTest from './components/RunTest';
import SeeReports from './components/SeeReports';

function App() {
  const [currentScreen, setCurrentScreen] = useState('createProject');

  const renderScreen = () => {
    switch(currentScreen) {
      case 'createProject': return <CreateProject onNext={() => setCurrentScreen('createSuite')} />;
      case 'createSuite': return <CreateSuite onNext={() => setCurrentScreen('addProducer')} />;
      case 'addProducer': return <AddProducer onNext={() => setCurrentScreen('selectProducer')} />;
      case 'selectProducer': return <SelectProducer onNext={() => setCurrentScreen('selectAssertions')} />;
      case 'selectAssertions': return <SelectAssertions onNext={() => setCurrentScreen('runTest')} />;
      case 'runTest': return <RunTest onNext={() => setCurrentScreen('seeReports')} />;
      case 'seeReports': return <SeeReports />;
      default: return <CreateProject onNext={() => setCurrentScreen('createSuite')} />;
    }
  }

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;
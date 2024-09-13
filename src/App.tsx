import React from 'react';
import UserTable from './components/UserTable/UserTable';
import './App.scss';

const App: React.FC = () => {

  return (
    <div className='app'>
      <UserTable />
    </div>
  );
};

export default App;

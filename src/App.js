import { createContext, useState } from 'react';
import './App.css';
import AppRouter from './AppRouter';

export const UserContext = createContext(null);

function App() {

  const [UserInfo, setUserInfo] = useState({
    tokenId: '',
    user: {}
  })

  return (
    <>
      <UserContext.Provider value={{
        UserInfo,
        setUserInfo
      }}>
        <AppRouter />
      </UserContext.Provider>
    </>
  );
}

export default App;

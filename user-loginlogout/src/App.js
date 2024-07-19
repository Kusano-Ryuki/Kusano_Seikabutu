import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import './App.css'; // 追加

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // セッションの取得
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session ? session.user : null);
    };
    getSession();

    // 認証状態の変更監視
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      {user ? (
        <>
          <Logout setUser={setUser} />
          <Profile user={user} />
        </>
      ) : (
        <>
          <Register />
          <Login setUser={setUser} />
        </>
      )}
    </div>
  );
};

export default App;

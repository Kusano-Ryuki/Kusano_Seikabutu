import React from 'react';
import supabase from '../supabaseClient';
import '../App.css'; // 追加

const Logout = ({ setUser }) => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    setUser(null);
  };

  return (
    <button className="button" onClick={handleLogout}>ログアウト</button>
  );
};

export default Logout;

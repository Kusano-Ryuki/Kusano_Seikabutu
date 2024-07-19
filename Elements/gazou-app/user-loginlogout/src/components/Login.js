import React, { useState } from 'react';
import supabase from '../supabaseClient';
import '../App.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      return;
    }

    setUser(data.user);
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <input type="email" placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default Login;

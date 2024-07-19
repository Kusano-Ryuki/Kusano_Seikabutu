import React, { useState } from 'react';
import supabase from '../supabaseClient';
import '../App.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          gender,
          address,
          dob,
        }
      }
    });

    if (error) {
      console.error(error);
      return;
    }

    alert('登録が完了しました');
  };

  const fetchAddress = async (postalCode) => {
    if (!postalCode) return;

    const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`);
    const data = await response.json();

    if (data.results) {
      const addressData = data.results[0];
      const fullAddress = `${addressData.address1} ${addressData.address2} ${addressData.address3}`;
      setAddress(fullAddress);
    } else {
      alert('住所が見つかりませんでした。');
    }
  };

  return (
    <form className="form" onSubmit={handleRegister}>
      <input type="text" placeholder="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <select value={gender} onChange={(e) => setGender(e.target.value)} required>
        <option value="">性別</option>
        <option value="male">男性</option>
        <option value="female">女性</option>
        <option value="other">その他</option>
      </select>
      <input
        type="text"
        placeholder="郵便番号"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        onBlur={() => fetchAddress(postalCode)}
        required
      />
      <input type="text" placeholder="住所" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <input type="date" placeholder="生年月日" value={dob} onChange={(e) => setDob(e.target.value)} required />
      <input type="email" placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">登録</button>
    </form>
  );
};

export default Register;

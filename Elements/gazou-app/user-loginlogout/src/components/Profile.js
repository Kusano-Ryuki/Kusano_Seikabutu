import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import '../App.css'; // 追加

const Profile = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setProfile(data);
      setUsername(data.username);
      setAddress(data.address);
    };

    fetchProfile();
  }, [user.id]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('profiles')
      .update({ username, address })
      .eq('id', user.id);

    if (error) {
      console.error(error);
      return;
    }

    alert('プロフィールが更新されました');
  };

  if (!profile) return <div>読み込み中...</div>;

  return (
    <div className="profile">
      <h2>プロフィール</h2>
      <p>名前: {profile.username}</p>
      <p>居住地: {profile.address}</p>
      <p>最終ログイン日: {new Date(profile.last_login).toLocaleString()}</p>
      <p>ログイン回数: {profile.login_count}</p>
      <form className="form" onSubmit={handleUpdateProfile}>
        <input type="text" placeholder="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="居住地" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default Profile;

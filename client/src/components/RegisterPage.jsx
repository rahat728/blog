import React, { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      alert('Registration successful!');
    } else {
      alert('Registration failed!');
    }
  }

  return (
    <form
      className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md space-y-4"
      onSubmit={register}
    >
      <h1 className="text-2xl font-bold text-center text-gray-800">Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterPage;

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const LoginForm = () => {

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD4p8qq3b9-YrZpjCJP-5f0RV2Pn7SG_dM2Q&s')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Sign in to your account</h2>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="name@college.edu"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            {/* Use Link instead of href */}
            <p className="text-blue-500 hover:underline cursor-pointer">
              Forgot password?
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Log in to your account
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
import React, { useState } from 'react';
import axios from 'axios';
import OtpPopup from './otpPopup';

const SignupForm = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [openOtpPopup, setOpenOtpPopup] = useState(false);
  const [userData, setUserData] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  };

  const openModal = async (e) => {
    e.preventDefault();

    try {
      const endpoint = activeTab === 'student' 
        ? 'http://localhost:5000/signup/students' 
        : 'http://localhost:5000/signup/alumni';

      await axios.post(endpoint, { email: userData.email });

      // Open OTP modal
      setOpenOtpPopup(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleOtpSubmit = async (otp) => {
    try {
      const verifyEndpoint = activeTab === 'student' 
        ? 'http://localhost:5000/signup/verify-student-otp' 
        : 'http://localhost:5000/signup/verify-alumni-otp';
      
      await axios.post(verifyEndpoint, { email: userData.email, otp });

      // Save user data to the database
      const saveEndpoint = activeTab === 'student' 
        ? 'http://localhost:5000/signup/students' 
        : 'http://localhost:5000/signup/alumni';
      
      await axios.post(saveEndpoint, userData);

      alert('Registration successful!');
      setOpenOtpPopup(false);
    } catch (error) {
      console.error('Error verifying OTP or saving data:', error);
      alert('OTP verification failed or data could not be saved.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD4p8qq3b9-YrZpjCJP-5f0RV2Pn7SG_dM2Q&s')",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mt-5 mb-5">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab === 'alumni' ? "Alumni Sign-Up" : "Current Student Sign-Up"}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setActiveTab('student')}
            className={`py-2 px-4 font-semibold ${activeTab === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-l-lg`}
          >
            Current Student
          </button>
          <button
            onClick={() => setActiveTab('alumni')}
            className={`py-2 px-4 font-semibold ${activeTab === 'alumni' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-r-lg`}
          >
            Alumni
          </button>
        </div>

        {/* Form */}
        <form onSubmit={openModal}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder={activeTab === 'alumni' ? "John Doe" : "Jane Doe"}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">
                {activeTab === 'alumni' ? "Personal Email" : "College Email"}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder={activeTab === 'alumni' ? "yourname@example.com" : "yourname@college.edu"}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="123-456-7890"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor={activeTab === 'alumni' ? "grad-year" : "enrollment-year"} className="block text-gray-700">
                {activeTab === 'alumni' ? "Graduation Year" : "Enrollment Year"}
              </label>
              <input
                type="number"
                id={activeTab === 'alumni' ? "grad-year" : "enrollment-year"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder={activeTab === 'alumni' ? "2020" : "2022"}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor={activeTab === 'alumni' ? "degree" : "graduation-year"} className="block text-gray-700">
                {activeTab === 'alumni' ? "Degree/Major" : "Expected Graduation Year"}
              </label>
              <input
                type="text"
                id={activeTab === 'alumni' ? "degree" : "graduation-year"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder={activeTab === 'alumni' ? "B.Sc Computer Science" : "2026"}
                onChange={handleInputChange}
                required
              />
            </div>
            {activeTab === 'alumni' && (
              <>
                <div>
                  <label htmlFor="occupation" className="block text-gray-700">Current Occupation</label>
                  <input
                    type="text"
                    id="occupation"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    placeholder="Software Engineer at XYZ Corp"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-gray-700">LinkedIn Profile (Optional)</label>
                  <input
                    type="url"
                    id="linkedin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    placeholder="https://www.linkedin.com/in/your-profile"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="document" className="block text-gray-700">Upload Verification Document (Degree Certificate)</label>
                  <input
                    type="file"
                    id="document"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}
            {activeTab === 'student' && (
              <div>
                <label htmlFor="student-id" className="block text-gray-700">Student ID</label>
                <input
                  type="text"
                  id="student-id"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="123456789"
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="********"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="********"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
          >
            Sign Up
          </button>
        </form>
      </div>
      {openOtpPopup && (
        <OtpPopup onClose={() => setOpenOtpPopup(false)} onSubmit={handleOtpSubmit} />
      )}
    </div>
  );
};

export default SignupForm;

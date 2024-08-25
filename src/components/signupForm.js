import React, { useState } from 'react';
import OtpPopup from './otpPopup';
import axios from 'axios';

const SignupForm = () => {
  
  const [activeTab, setActiveTab] = useState('student');
  const [openOtpPopup, setOpenOtpPopup] = useState(false);
  const [userData, setUserData] = useState({});

  const openModal = async (e) => {
    e.preventDefault();

    const form = e.target.closest('form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    setUserData(data);

    try {
      const endpoint = activeTab === 'student' ? '/signup/students' : '/signup/alumni';
      await axios.post(endpoint, { email: data.email });

      // Open OTP modal
      setOpenOtpPopup(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleOtpSubmit = async (otp) => {
    try {
      const endpoint = activeTab === 'student' ? '/signup/verify-student-otp' : '/signup/verify-alumni-otp';
      await axios.post(endpoint, { email: userData.email, otp });

      // Save user data to the database
      const saveEndpoint = activeTab === 'student' ? '/signup/students' : '/signup/alumni';
      await axios.post(saveEndpoint, userData);

      alert('Registration successful!');
      setOpenOtpPopup(false);
    } catch (error) {
      console.error('Error verifying OTP or saving data:', error);
      alert('OTP verification failed or data could not be saved.');
    }
  };

  return (
    <>

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
        {activeTab === 'alumni' ? (
          <form onSubmit={openModal}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">Personal Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="yourname@example.com"
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
                  required
                />
              </div>
              <div>
                <label htmlFor="grad-year" className="block text-gray-700">Graduation Year</label>
                <input
                  type="number"
                  id="grad-year"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="2020"
                  required
                />
              </div>
              <div>
                <label htmlFor="degree" className="block text-gray-700">Degree/Major</label>
                <input
                  type="text"
                  id="degree"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="B.Sc Computer Science"
                  required
                />
              </div>
              <div>
                <label htmlFor="occupation" className="block text-gray-700">Current Occupation</label>
                <input
                  type="text"
                  id="occupation"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="Software Engineer at XYZ Corp"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="linkedin" className="block text-gray-700">LinkedIn Profile (Optional)</label>
              <input
                type="url"
                id="linkedin"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="https://www.linkedin.com/in/your-profile"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="document" className="block text-gray-700">Upload Verification Document (Degree Certificate)</label>
              <input
                type="file"
                id="document"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="********"
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
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Sign Up as Alumni
            </button>
          </form>
        ) : (
          /* Current Student Form */
          <form onSubmit={openModal}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="college-email" className="block text-gray-700">College Email</label>
                <input
                  type="email"
                  id="college-email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="yourname@college.edu"
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
                  required
                />
              </div>
              <div>
                <label htmlFor="enrollment-year" className="block text-gray-700">Enrollment Year</label>
                <input
                  type="number"
                  id="enrollment-year"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="2022"
                  required
                />
              </div>
              <div>
                <label htmlFor="graduation-year" className="block text-gray-700">Expected Graduation Year</label>
                <input
                  type="number"
                  id="graduation-year"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="2026"
                  required
                />
              </div>
              <div>
                <label htmlFor="degree" className="block text-gray-700">Degree/Major</label>
                <input
                  type="text"
                  id="degree"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="B.Sc Computer Science"
                  required
                />
              </div>
              <div>
                <label htmlFor="student-id" className="block text-gray-700">Student ID</label>
                <input
                  type="text"
                  id="student-id"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="123456789"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="********"
                  required
              />
            </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Sign Up as Current Student
            </button>
          </form>
        )}
      </div>
    </div>
        <OtpPopup openOtpPopup={openOtpPopup} setOpenOtpPopup={setOpenOtpPopup} handleOtpSubmit={handleOtpSubmit}/>
    </>
  );
};

export default SignupForm;
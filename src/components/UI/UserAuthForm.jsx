import { useState } from 'react';

import { FcGoogle } from 'react-icons/fc';
import { MdPerson, MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { isValidEmail, isStrongPassword } from '../../utils/validation';
import { registerUserWithEmail, signInWithGooglePopup } from '../../utils/firebase';

import { useAuthState, useAuthDispatch } from '../../contexts/auth/useAuth';
import { setAuthLoading, setCurrentUser, setAuthError } from '../../contexts/auth/authActions';

import { EmailSignInModal } from './EmailSignInModal';

const UserAuthForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const { fullName, email, password } = formData;

  const { isAuthLoading, authError, currentUser } = useAuthState();
  const dispatch = useAuthDispatch();

  let passwordStrength = '';
  if (password.length > 0) {
    if (isStrongPassword(password)) {
      passwordStrength = 'Strong';
    } else if (password.length >= 8) {
      passwordStrength = 'Weak';
    } else {
      passwordStrength = 'Too short';
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async e => {
    e.preventDefault();
    dispatch(setAuthError(null));
    dispatch(setAuthLoading(true));

    if (!isValidEmail(email) || !isStrongPassword(password)) {
      dispatch(setAuthError('Please use a valid email and a strong password.'));
      dispatch(setAuthLoading(false));
      return;
    }

    try {
      const userCred = await registerUserWithEmail(email, password, fullName);
      dispatch(setCurrentUser(userCred.user));
      setFormData({ fullName: '', email: '', password: '' });
    } catch (err) {
      dispatch(setAuthError(err.message));
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  const handleGoogleSignIn = async () => {
    dispatch(setAuthError(null));
    dispatch(setAuthLoading(true));

    try {
      const userCred = await signInWithGooglePopup();
      dispatch(setCurrentUser(userCred.user));
    } catch (err) {
      dispatch(setAuthError(err.message));
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          name="fullName"
          placeholder="Enter your name"
          value={fullName}
          onChange={handleChange}
          className="w-full p-3 pr-10 border border-gray-300"
          style={{ borderRadius: '15px' }}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <MdPerson size={20} />
        </span>
      </div>
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleChange}
          className="w-full p-3 pr-10 border border-gray-300"
          style={{ borderRadius: '15px' }}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <MdEmail size={20} />
        </span>
      </div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter a password"
          value={password}
          onChange={handleChange}
          className="w-full p-3 pr-10 border border-gray-300"
          style={{ borderRadius: '15px' }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400"
          tabIndex={-1}
        >
          {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
        </button>
        {passwordStrength && (
          <p
            className={`text-sm mt-1 ${passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Weak' ? 'text-yellow-600' : 'text-red-600'}`}
          >
            Password strength: {passwordStrength}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-[60%] mx-auto bg-purple-700 text-white py-3 font-semibold"
        style={{ borderRadius: '15px' }}
        disabled={isAuthLoading}
      >
        {isAuthLoading ? 'Registering...' : 'Create Account'}
      </button>
      {authError && <p className="text-red-500 text-sm">{authError}</p>}
      {currentUser && <p className="text-green-500 text-sm">Welcome {currentUser.displayName}</p>}
      <div className="flex items-center my-4 w-[60%] mx-auto">
        <hr className="flex-grow border-t-2 border-gray-400" />
        <span className="mx-4 text-gray-700 font-bold">or</span>
        <hr className="flex-grow border-t-2 border-gray-400" />
      </div>

      <button
        className="w-[60%] mx-auto py-3 rounded-md mb-2 flex justify-center items-center gap-2 cursor-pointer"
        type="button"
        onClick={() => setShowEmailModal(true)}
      >
        <MdEmail size={22} />
        Continue with email
      </button>
      <button
        className="w-[60%] mx-auto py-3 rounded-md flex justify-center items-center gap-2 cursor-pointer"
        type="button"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>
      {showEmailModal && <EmailSignInModal onClose={() => setShowEmailModal(false)} />}
    </form>
  );
};

export default UserAuthForm;

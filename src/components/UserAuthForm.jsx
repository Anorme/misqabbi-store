import { useState, useContext } from 'react';
import { MdPerson, MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import AuthContext from '../contexts/AuthContext';
import { isValidEmail, isStrongPassword } from '../utils/validation';
import { EmailSignInModal } from './UI/EmailSignInModal';

const UserAuthForm = () => {
  const { register, signInWithGoogle } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const { fullName, email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);

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
    setError('');
    setSuccess('');

    if (!isValidEmail(email) || !isStrongPassword(password)) {
      setError('Please use a valid email and a strong password.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, fullName);
      setSuccess('Account created successfully!');
      setFormData({ fullName: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await signInWithGoogle();
      setSuccess('Signed in with Google successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Create Account'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
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
        className="w-[60%] mx-auto py-3 rounded-md flex justify-center items-center gap-2"
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

import { useState } from 'react';
import { MdPerson, MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import signupImg from '../assets/signup.png';
import { useAuth } from '../context/AuthContext';
import UserAuthForm from '../components/UI/UserAuthForm';
import { isValidEmail, isStrongPassword } from '../utils/validation';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // local loading for UI feedback
  const [error, setError] = useState(''); // local error for UI feedback
  const [success, setSuccess] = useState('');

  const { register, loading: authLoading, error: authError, signInWithGoogle } = useAuth();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isValidEmail(formData.email) || !isStrongPassword(formData.password)) {
      setError('Please use a valid email and a strong password.');
      return;
    }

    setLoading(true);
    try {
      await register(formData.email, formData.password, { fullName: formData.fullName });
      setSuccess('Account created successfully!');
      resetFormFields();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setSuccess('Signed in with Google successfully!');
      resetFormFields();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetFormFields = () => {
    setFormData({ fullName: '', email: '', password: '' });
  };

  const isFormValid =
    !!formData.fullName && isValidEmail(formData.email) && isStrongPassword(formData.password);

  // Password strength feedback
  let passwordStrength = '';
  if (formData.password.length > 0) {
    if (isStrongPassword(formData.password)) {
      passwordStrength = 'Strong';
    } else if (formData.password.length >= 8) {
      passwordStrength = 'Weak';
    } else {
      passwordStrength = 'Too short';
    }
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-purple-300 p-0 m-0">
      <div
        className="flex bg-white rounded-2xl overflow-hidden shadow-lg mt-12 mb-12"
        style={{ height: '714px', width: '1000px' }}
      >
        <div className="w-[45%] hidden md:flex items-stretch">
          <img
            src={signupImg}
            alt="Visual"
            className="object-cover w-full h-full"
            style={{ height: '714px' }}
          />
        </div>
        <div className="w-full md:w-[55%] p-10 flex flex-col justify-center pt-8 pb-8">
          <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
            CREATE YOUR ACCOUNT
          </h2>
          <UserAuthForm
            fullName={formData.fullName}
            email={formData.email}
            password={formData.password}
            onChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            loading={loading || authLoading}
            error={error || authError}
            success={success}
            handleRegister={handleRegister}
            isFormValid={isFormValid}
            passwordStrength={passwordStrength}
            handleGoogleSignIn={handleGoogleSignIn}
          />

          <p className="text-center mt-4">
            Have an account?{' '}
            <Link to="/login" className="text-purple-700 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

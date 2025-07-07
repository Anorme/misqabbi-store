import { useState, useContext } from 'react';
import { MdPerson, MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import signupImg from '../assets/signup.png';
import AuthContext from '../context/AuthContext'; // ✅ Default import

const Register = () => {
  const { register, signInWithGoogle } = useContext(AuthContext); // ✅ Access register and Google sign-in

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isValidEmail = email => /\S+@\S+\.\S+/.test(email);
  const isStrongPassword = password =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

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
      await register(email, password); // ✅ Call context method
      setSuccess('Account created successfully!');
      setFullName('');
      setEmail('');
      setPassword('');
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
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
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
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                placeholder="Enter a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
          </form>

          <div className="flex items-center my-4 w-[60%] mx-auto">
            <hr className="flex-grow border-t-2 border-gray-400" />
            <span className="mx-4 text-gray-700 font-bold">or</span>
            <hr className="flex-grow border-t-2 border-gray-400" />
          </div>

          <button className="w-[60%] mx-auto py-3 rounded-md mb-2 flex justify-center items-center gap-2">
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

          <p className="text-center mt-4">
            Have an account?{' '}
            <a href="/login" className="text-purple-700 font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { MdPerson, MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import PropTypes from 'prop-types';

const UserAuthForm = ({
  fullName,
  onChange,
  email,
  password,
  showPassword,
  setShowPassword,
  loading,
  error,
  success,
  handleRegister,
  isFormValid,
  passwordStrength,
  handleGoogleSignIn,
}) => (
  <form onSubmit={handleRegister} className="space-y-4">
    <div className="relative">
      <input
        type="text"
        placeholder="Enter your name"
        value={fullName}
        name="fullName"
        onChange={onChange}
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
        name="email"
        onChange={onChange}
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
        name="password"
        onChange={onChange}
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
    {passwordStrength && (
      <p
        className={`text-sm mt-1 ${passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Weak' ? 'text-yellow-600' : 'text-red-600'}`}
      >
        Password strength: {passwordStrength}
      </p>
    )}
    <button
      type="submit"
      className="w-[60%] mx-auto bg-purple-700 text-white py-3 font-semibold"
      style={{ borderRadius: '15px' }}
      disabled={loading || !isFormValid}
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
      className="w-[60%] mx-auto py-3 rounded-md mb-2 flex justify-center items-center gap-2"
      type="button"
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
  </form>
);

UserAuthForm.propTypes = {
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
  handleRegister: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  passwordStrength: PropTypes.string,
  handleGoogleSignIn: PropTypes.func,
};

export default UserAuthForm;

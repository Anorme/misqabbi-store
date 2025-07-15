import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { completeSignInWithEmailLink } from '../utils/firebase';
import { createUserDocument } from '../utils/firebase';

export const FinishSignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const completeAuthFlow = async () => {
      const user = await completeSignInWithEmailLink();

      if (user) {
        await createUserDocument(user);
        navigate('/shop');
      } else {
        navigate('/register');
      }
    };

    completeAuthFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-msq-purple font-lato">
      <p className="text-white text-lg">Completing your sign-in...</p>
    </div>
  );
};

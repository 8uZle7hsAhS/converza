import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from 'sonner';

const OtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const [generatedOtp, setGeneratedOtp] = useState<number>();
  const [countDown, setCountDown] = useState<any>(30);
  const [allowResendButton, setAllowResendButton] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>('');

  // generates otp at once.
  useEffect(() => {
    if (!data) {
      navigate('/signup');
      return;
    }

    generateAndSetOtp();
  }, []);

  // coundown
  useEffect(() => {
    if (countDown <= 0) {
      setAllowResendButton((prev) => !prev);
      return;
    }

    const timer = setInterval(() => {
      setCountDown((prev: number) => (prev - 1).toString().padStart(2, '0'));
    }, 1000);

    return () => clearInterval(timer);
  }, [countDown]);

  const resendOtp = () => {
    setCountDown(30);
    setAllowResendButton((prev) => !prev);

    generateAndSetOtp();

    toast.success('A new OTP has been sent', {
      className: 'bg-red-400',
      description: 'Check your email for new OTP',
      duration: 2000,
    });
  };

  const generateAndSetOtp = async () => {
    const otp = await generateOtp();
    setGeneratedOtp(otp);

    console.log(otp);
  };

  // actually, backend logic na to eh:
  const generateRandomOTP = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 9000000);
    const digitCounter = randomNumber.toString().length;

    return { random: randomNumber, counter: digitCounter };
  };

  // api calling
  const generateOtp = async (): Promise<number> => {
    // const response = await axios.post('localhost://6000/api/generate-otp', {
    //   data: buratski,
    // });

    const data = generateRandomOTP();

    return data.random;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const otp = formData.get('otp') as string;

    if (!otp || isNaN(Number(otp))) {
      toast.error(' Invalid input.', {
        className: 'bg-red-400',
        description: 'Try to input numeric value',
        duration: 2000,
      });
      setOtpValue('');
      return;
    }

    if (Number(otp) !== generatedOtp) {
      toast.error(' Invalid OTP.', {
        className: 'bg-red-400',
        description: '',
        duration: 2000,
      });
      setOtpValue('');
      return;
    }

    console.log('OTP IS CORRECT');
    navigate('/login');
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <p>We've sent a 6 digits code to your email</p>
          <input
            className="border border-black w-fit"
            placeholder="Enter your OTP"
            id="inputOtp"
            name="otp"
            type="text"
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
          />
          <Button
            disabled={!otpValue}
            type="submit"
            className="w-fit bg-green-300"
          >
            Send Otp{' '}
          </Button>
        </div>
      </form>
      <p className="mt-7">Didn't receive the pin? </p>
      <div className="flex items-center space-x-4 mt-4">
        <Button
          onClick={() => resendOtp()}
          disabled={!allowResendButton}
          className="bg-pink-500"
        >
          Resend
        </Button>
        <p> You can request a new code in 00:{countDown}</p>
      </div>
    </div>
  );
};

export default OtpPage;

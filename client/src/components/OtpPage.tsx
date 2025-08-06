import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpPage = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();
  const [generatedOtp, setGeneratedOtp] = useState<number>();

  useEffect(() => {
    const getOtpAsync = async () => {
      const otp = await generateOtp();
      setGeneratedOtp(otp);
    };

    // getOtpAsync();

    console.log(typeof data);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const otp = formData.get('otp') as string;

    if (!otp || isNaN(Number(otp))) {
      console.log(' INVALID INPUT, PLEASE ENTER A NUMERIC VALUE');
      return;
    }

    if (Number(otp) !== generatedOtp) {
      console.log(' INVALID OTP, PLEASE TRY AGAIN');
      return;
    }

    console.log('OTP IS CORRECT');
    navigate('/login');
  };

  const resendOtp = () => {
    // backend send otp
  };

  const generateOtp = async (): Promise<number> => {
    const response = await axios.post('localhost://6000/api/generate-otp', {
      data: data,
    });

    return 20;
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
          />
          <button className="text-start mt-3 border border-black w-fit p-2">
            <p>Submit</p>
          </button>
        </div>
      </form>
      <p className="mt-7">Didn't receive the pin? </p>
      <div className="flex items-center space-x-4 mt-4">
        <button className="border border-black w-fit p-2 ">Resend</button>
        <p> You can request a new code in 00:30</p>
      </div>
    </div>
  );
};

export default OtpPage;

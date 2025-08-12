import { useState } from 'react';
import * as z from 'zod';
import { axiosInstance } from '../lib/axios';

const LoginPage = () => {
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });

  const [formErrors, setFormError] = useState<{
    email: any;
    password: any;
  } | null>();

  const formSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid Email'),
    password: z.string().min(1, 'Password must required'),
  });

  const resetForm = () => {
    setLoginData({
      email: '',
      password: '',
    });
  };

  const handleLogin = async (data: any) => {
    try {
      const res = await axiosInstance.post('/auth/login', {
        data: data,
      });

      if (!res) {
        console.log('THERE ARE SOMETHIGN ERROR IN YOUR BACKEND');
        console.log(res);
      }

      console.log(res);
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const parseResult = formSchema.safeParse(data);

    if (parseResult.success) {
      setFormError({ email: '', password: '' });
      handleLogin(data);
    } else {
      const resultError = parseResult.error.format();
      console.log('PARSE ERROR, FORM ERROR', resultError);

      setFormError({
        email: resultError.email?._errors[0] || '',
        password: resultError.password?._errors[0] || '',
      });
    }
  };

  return (
    <div className="">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <h2>Email</h2>
          <input
            value={loginData?.email}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="w-50 border border-black"
          />
          {formErrors?.email && (
            <p className="text-red-500 text-sm">{formErrors?.email}</p>
          )}

          <h2>Password</h2>
          <input
            value={loginData?.password}
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            type="password"
            name="password"
            placeholder="Enter your Password"
            className="w-50 border border-black"
          />

          {formErrors?.password && (
            <p className="text-red-500">{formErrors.password}</p>
          )}

          <button
            type="submit"
            className="flex justify-center  mt-6 items-center w-fit h-10 bg-green-300 p-4"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

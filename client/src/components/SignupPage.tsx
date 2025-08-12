import React, { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

const SignupPage = () => {
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useState<{
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formsError, setFormsError] = useState<{
    [key: string]: string;
  }>({});

  const messageForm = (): JSX.Element => {
    const formSchema = z
      .object({
        fullName: z.string().min(1, 'Please enter your full name'),
        email: z.string().email('Invalid Email'),
        password: z
          .string()
          .min(8, 'Password must contains more than 8 characters')
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
            'Password must include uppercase, lowercase, number, and special character',
          ),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
      })
      .refine((data) => data.password == data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match, try again',
      });

    const resetForm = () => {
      setSignupInfo({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
      };

      const result = formSchema.safeParse(data);

      if (result.success) {
        resetForm();
        setFormsError({});

        toast.success('Successfully', {
          className: 'bg-red-400',
          description: 'Your account have been created',
          duration: 2000,
        });

        navigate('/otp', {
          state: data,
        });
      } else {
        const formErrors = result.error.format();
        setFormsError({
          fullName: formErrors.fullName?._errors[0] || '',
          email: formErrors.email?._errors[0] || '',
          password: formErrors.password?._errors[0] || '',
          confirmPassword: formErrors.confirmPassword?._errors[0] || '',
        });

        console.log('MY CURRENT ERRORS: ', formsError);
      }
    };

    return (
      <div className="flex flex-col mt-10">
        <h1>Sign Up:</h1>

        {/* INFORMATIONS:  */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <h2>Full Name: </h2>

            <input
              name="fullName"
              value={signupInfo.fullName}
              onChange={(e) =>
                setSignupInfo((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              placeholder="Juan Dela Cruz"
              className="w-50 border border-black"
              type="text"
            />
            {formsError.fullName && (
              <p className="text-red-500 text-sm ">{formsError?.fullName}</p>
            )}

            <h2>Email: </h2>
            <input
              name="email"
              value={signupInfo?.email}
              onChange={(e) =>
                setSignupInfo((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Juan Dela Cruz"
              className="w-50 border border-black"
              type="email"
            />

            {formsError.email && (
              <p className="text-red-500 text-sm ">{formsError?.email}</p>
            )}

            <h2>Password: </h2>
            <input
              name="password"
              value={signupInfo?.password}
              onChange={(e) =>
                setSignupInfo((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="Juan Dela Cruz"
              className="w-50 border border-black"
              type="password"
            />
            {formsError.password && (
              <p className="text-red-500 text-sm ">{formsError?.password}</p>
            )}

            <h2>Confirm Password</h2>
            <input
              disabled={!signupInfo.password}
              name="confirmPassword"
              value={signupInfo?.confirmPassword}
              onChange={(e) =>
                setSignupInfo((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder="Juan Dela Cruz"
              className="w-50 border border-black"
              type="password"
            />

            {formsError.confirmPassword && (
              <p className="text-red-500 text-sm ">
                {formsError?.confirmPassword}
              </p>
            )}
          </div>

          <button
            // disabled={isFormEmpty}
            type="submit"
            className=" h-10 md:h-13 lg:h-10 bg-zinc-900 border border-cyan-500 text-cyan-500 rounded-sm active:scale-95 active:bg-cyan-500 active:text-zinc-900 "
          >
            Signup
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h1>SIGN UP PAGE</h1>
      {messageForm()}
    </div>
  );
};

export default SignupPage;

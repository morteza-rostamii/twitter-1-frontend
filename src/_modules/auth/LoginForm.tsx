import Logo from "@/icons/Logo"
import { Button, Input } from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuthStore from "@/_data/stores/auth.store";
import { REGISTER_EMAIL } from "@/_data/const";

const LoginForm = ({back}:any) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      code: "",
    }
  });

  const {authUser, loginAct, isLoading} = useAuthStore();

  const handSubmit = async (data:any) => {
    console.log(data);
    const email = JSON.parse(localStorage.getItem(REGISTER_EMAIL) || '');
    if (!data.code || !email) return;

    await loginAct({
      email: email,
      otp: data.code,
    });
  }

  return (
    <form
    className="
    flex flex-col gap-6
    max-w-80 mx-auto pb-2 #text-center
    "

    onSubmit={handleSubmit((d:any) => handSubmit(d) )}
    >
      <div
      className="
      !w-10 self-center
      "
      >
      <Logo/>
      </div>

      <p
      className="
      text-2xl font-bold text-center
      "
      >
        Welcome to twitter.
      </p>

      <div
      className="
      flex flex-col gap-3
      "
      >
        <Button
        leftIcon={<FcGoogle size={20}/>}
        borderRadius={'9999px'}
        variant={'outline'}
        colorScheme="twitter"
        isDisabled={isLoading}
        >
          Enter with google
        </Button>
        <Button
        leftIcon={<FaGithub size={20}/>}
        borderRadius={'9999px'}
        variant={'outline'}
        colorScheme="twitter"
        isDisabled={isLoading}
        >
          Enter with Github
        </Button>
      </div>
      
      <div
      className="
      flex items-center gap-2
      "
      >
        <span className="flex-1 h-1 bg-gray-300 rounded-[9999px]"></span>
        <span>OR</span>
        <span className="flex-1 h-1 bg-gray-300 rounded-[9999px]"></span>
      </div>

      <div
      className="
      flex flex-col gap-4
      "
      >

        <div>
          <label 
          className="
          text-left mb-2 inline-block text-gray-500
          "
          htmlFor="">
            Please enter the code we sent you.
          </label>
          <Input
          isDisabled={isLoading}
          id="code"
          colorScheme="twitter"
          placeholder="Enter the otp code"
          {...register('code', {
            required: "code is required",
            validate: {
              minLength: (v:any) => v.length >= 6,
              //matchPattern: (v:any) => /^[a-zA-Z0-9_]+$/.test(v),
            },
          })} 
          />
          <p className="text-left mt-1">
          {errors.code?.type === "required" && (
            <small className='block text-red-500 '>Otp is required</small>
          )}
          {errors.code?.type === "minLength" && (
            <small className='block text-red-500 '>The code should have at least 6 characters</small>
          )}
          </p>
        </div>

        <Button
        className=""
        borderRadius={'9999px'}
        bg={'#333'}
        colorScheme="blackAlpha"

        type="submit"
        isLoading={isLoading}
        >
          Login
        </Button>

        <p className="text-center">
          go back to 
          <button 
          type="button" 
          className="text-sky-500 underline"
          onClick={back}
          >Sign up</button>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
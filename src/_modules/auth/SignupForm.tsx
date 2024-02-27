import Logo from "@/icons/Logo"
import { Button, Input } from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import useAuthStore from "@/_data/stores/auth.store";
import { REGISTER_EMAIL } from "@/_data/const";

const SignupForm = ({next}:any) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
    }
  });

  const {registerAct, isLoading} = useAuthStore();

  const handSubmit = async (data:any) => {
    console.log(data);
    if (
      !data.username ||
      !data.email
    ) return;

    localStorage.setItem(REGISTER_EMAIL, JSON.stringify(data.email));
    await registerAct({
      username: data.username,
      email: data.email,
    });

    next();
  }

  return (
    <form
    className="
    flex flex-col gap-6
    max-w-80 mx-auto pb-2 text-center
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
      text-2xl font-bold
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
        isDisabled={isLoading}
        leftIcon={<FcGoogle size={20}/>}
        borderRadius={'9999px'}
        variant={'outline'}
        colorScheme="twitter"
        >
          Enter with google
        </Button>
        <Button
        isDisabled={isLoading}
        leftIcon={<FaGithub size={20}/>}
        borderRadius={'9999px'}
        variant={'outline'}
        colorScheme="twitter"
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
          <Input
          isDisabled={isLoading}
          id="username"
          colorScheme="twitter"
          type="text"
          //name="username"
          placeholder="Enter your username"

          {...register('username', {
            required: true,
            validate: {
              minLength: (v:any) => v.length >= 5,
              matchPattern: (v:any) => /^[a-zA-Z0-9_]+$/.test(v),
            },
          })}
          />
          <p
          className="text-left mt-1"
          >
            {errors.username?.type === "required" && (
            <small className='block text-red-500 max-w-[200px]'>Username is required</small>
            )}
            {errors.username?.type === "minLength" && (
              <small className='block text-red-500 max-w-[200px]'>The username should have at least 5 characters</small>
            )}

            {errors.username?.type === "matchPattern" && (
              <small className='block text-red-500 max-w-[200px]'>Username must contain only letters, numbers and _</small>
            )}
          </p>
        </div>

        <div>
          <Input
          isDisabled={isLoading}
          id="email"
          colorScheme="twitter"
          placeholder="Enter your email"
          type="text"
          //name="email"
          {...register('email', {
            required: "Email is required",
            validate: {
              maxLength: (v) =>
                v.length <= 50 || "The email should have at most 50 characters",
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "Email address must be a valid address",
            },
          })}
          />
          <p className="text-left mt-1">
          {errors.email?.message && (
            <small className='block text-red-500 max-w-[200px]'>{errors.email.message + ''}</small>
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
          Signup
        </Button>

        <p>
          if you are registered go to 
          <button 
          type="button" 
          className="text-sky-500 underline"
          onClick={next}
          >
            Login
          </button>
        </p>
      </div>
    </form>
  )
}

export default SignupForm
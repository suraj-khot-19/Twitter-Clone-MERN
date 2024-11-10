import React, { useState } from 'react'
import X from '../../assets/X'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Signup() {
  //state
  const [data, setData] = useState({ username: '', email: '', password: '', fullname: '' });
  const [modalActive, setModalActive] = useState(false);

  //form change
  const handelOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  //query client
  const queryClient = useQueryClient();

  //api call with mutation
  const { mutate, isError, isPending, error } = useMutation({
    //mutation function
    mutationFn: async (data) => {
      //destructure data
      const { email, username, password, fullname } = data;

      //?main logic

      const url = '/api/v2/auth/signup'; //prefix came from vite config
      try {
        const res = await fetch(
          url,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password, fullname }),
          }
        );

        //data
        const jsondata = await res.json();

        //if error
        if (!res.ok) {
          throw new Error(jsondata.msg || "failed to create an account!")
        }
        //else
        return jsondata;
      } catch (error) {
        throw error.message
      }
    },

    //if success
    onSuccess: () => {
      //send toast
      toast.success("Account created successfully!");

      //client
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },


    // !  this provide this much functionality
    // onError:
    // onMutate:
    // onSettled:
  });

  //open modal fun
  const openModal = () => {
    document.getElementById('my_modal_3').showModal();
    //change background by statw
    setModalActive(true);
  }

  //close modal fun
  const closeModal = () => {
    document.getElementById('my_modal_3').close()
    //change background by statw
    setModalActive(false);
  }

  //form submit
  const handelSubmit = async (e) => {
    e.preventDefault();
    //calling mutate function with data
    mutate(data);
  }

  return (
    <div className='max-w-screen-xl mx-auto flex h-screen px-10 md:flex-row flex-col' style={modalActive ? { backgroundColor: 'rgba(23,23,23,0.5)', filter: 'blur(5px)', } : {}}>
      {/* icon */}
      <div className='md:flex-1 h-1/5 md:h-[35%] lg:h-full lg:flex items-center justify-center'>
        <X className="fill-white w-[10rem] md:w-2/3" />
      </div>

      {/* form */}
      <div className='md:flex-1 h-4/5 md:h-[65%] lg:h-full flex flex-col justify-center items-center md:items-start'>
        <span className='text-3xl md:text-7xl font-bold'>Happening now</span>
        <span className='text-xl md:text-3xl font-medium mt-10'>Join today.</span>

        <button className="btn btn-outline rounded-full w-full md:w-[60%] mt-8 bg-white text-black"><FcGoogle className='h-6 w-6' />Sign up with Google</button>
        <button className="btn btn-outline rounded-full w-full md:w-[60%] mt-2 bg-white text-black"><FaApple className='h-6 w-6' />Sign up with Apple</button>

        {/* or div */}
        <div className='flex w-full md:w-[60%] justify-center py-2'>
          <span>or</span>
        </div>

        <button className="btn btn-active btn-primary rounded-full w-full md:w-[60%] text-white font-bold py-3" onClick={openModal}>Create Account</button>
        <span className='text-xs w-full md:w-[60%] pt-1'>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</span>
        <span className='text-xl font-normal mt-4'>Already have an account?</span>
        <button className="btn btn-outline btn-primary rounded-full w-full md:w-[60%] mt-2">Sign in</button>

      </div>

      {/* formx modal */}
      <div>
        <button className="btn hidden" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box border border-slate-400 rounded-lg">
            <h3 className="font-bold text-lg"> <X className="fill-white w-8 mx-auto" /></h3>
            <span className='text-3xl font-bold ps-3'>Create your account</span>
            <div className='mt-5'>
              <form method="dialog" onSubmit={handelSubmit}>
                <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2" onClick={closeModal} >✕</button>

                <div className='flex flex-col items-center mx-4 px-1'>
                  {/* username */}
                  <div className='my-2 w-full'>
                    <input type="text" placeholder="Username" className="input input-bordered  w-full " name='username' value={data.username} onChange={handelOnChange} />
                  </div>

                  {/* fullname */}
                  <div className='my-2 w-full'>
                    <input type="text" placeholder="Full Name" className="input input-bordered w-full " name='fullname' value={data.fullname} onChange={handelOnChange} />
                  </div>

                  {/* email */}
                  <div className='my-2 w-full'>
                    <input type="email" placeholder="Email" className="input input-bordered w-full " name='email' value={data.email} onChange={handelOnChange} />
                  </div>

                  {/* password */}
                  <div className='my-2 w-full'>
                    <input type="password" placeholder="Password" className="input input-bordered w-full " name='password' value={data.password} autoComplete='true' onChange={handelOnChange} />
                  </div>

                  {isError && <span className='my-3 text-red-400'>{error}</span>}

                  {/* btn */}
                  <button type='submit' className="btn btn-outline btn-primary rounded-full w-full md:w-[60%] mt-2">{isPending ? 'Loadding...' : 'Create'}</button>

                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>

    </div>
  )
}

export default Signup
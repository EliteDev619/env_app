import React from 'react';
import { useOktaAuth } from "@okta/okta-react";

const Home = () => {

  const { oktaAuth, authState } = useOktaAuth();

  const loggingIn = async () => await oktaAuth.signInWithRedirect({ originalUri: "/resource" });
  const loggingOut = async () => {
    await oktaAuth.signOut();
  }

  return (
    <>
      <div className="bg-home bg-no-repeat bg-cover bg-center bg-fixed h-full w-full absolute">
        <nav className="p-5">
          <div className="container flex flex-center justify-between mx-auto">
            <a href="/" className="flex items-center">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <div>
              <a href='/resource' className='text-white text-end mr-10 cursor-pointer'>Homepage</a>
              {
                authState?.isAuthenticated ? (
                  <button className='text-white text-end mr-10 cursor-pointer' onClick={loggingOut}>Logout</button>
                ) : (
                  <button className='text-white text-end mr-10 cursor-pointer' onClick={loggingIn}>Login</button>
                )
              }
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Home;
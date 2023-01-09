import React from "react";
import { Link } from "react-router-dom";
import { FaBox } from 'react-icons/fa';
import { FaDumpster } from 'react-icons/fa';
import { FaKaaba } from 'react-icons/fa';
import { FaServer } from 'react-icons/fa';
import { FaQuestionCircle } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

import Tooltip from "../tooltip";
import { useOktaAuth } from "@okta/okta-react";


const sidebarLink = [
  {
    title: 'Resource',
    link: '/resource',
    icon: <FaBox />,
  },
  {
    title: 'Environment',
    link: '/environment',
    icon: <FaDumpster />,
  },
  {
    title: 'Report',
    link: '/report',
    icon: <FaKaaba />,
  },
  {
    title: 'Job',
    link: '/job',
    icon: <FaServer />,
  },
  {
    title: 'Help',
    link: '/help',
    icon: <FaQuestionCircle />,
  }
]

export default function Sidebar({ active }) {

  const { oktaAuth, authState } = useOktaAuth();

  const loggingOut = async () => {
    await oktaAuth.signOut();
  }

  return (
    <div className="md:w-[190px] w-[48px] fixed bottom-0 top-0 left-0 overflow-y-auto" aria-label="Sidebar">
      <div className="overflow-y-auto p-2 md:py-4 md:px-3 bg-gray-50 rounded-tr-lg rounded-br-lg dark:bg-gray-800 h-full">
        <Link to={'/'}>
          <div className="flex justify-center items-center mt-3 mb-4">
            <img src="https://flowbite.com/docs/images/logo.svg" className="md:mr-3 h-6" alt="Flowbite Logo" />
            <span className="hidden md:block self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </div>
        </Link>
        <hr className="mb-6"></hr>
        <ul className="space-y-2">
          {sidebarLink.map((item, index) => (
            <li className={(active == item.title ? 'dark:bg-gray-700 ' : '') + 'rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'} key={index}>
              <Link to={item.link}>
                <Tooltip tooltipText={item.title}>
                  <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
                    {item.icon}
                    <span className="ml-3 hidden md:block">{item.title}</span>
                  </div>
                </Tooltip>
              </Link>
            </li>
          ))}

          <hr className="pb-3"></hr>
          {
            authState?.isAuthenticated ? (
              <li onClick={() => loggingOut()} className="rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                <Tooltip tooltipText='Logout'>
                  <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white ">
                    <BiLogOut />
                    <span className="ml-3 hidden md:block">Logout</span>
                  </div>
                </Tooltip>
              </li>
            ) : (
              null
            )
          }
        </ul>
      </div>
    </div>
  );
}
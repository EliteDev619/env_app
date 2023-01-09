import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux'
import Modal from './modal'

const BUTTON_CLASS = "mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm float-right";
const TH_CLASS = "px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase";
const TB_CLASS = "px-6 py-4 text-sm text-gray-800 whitespace-nowrap";
export default function Job() {
  const envData = [
    {
      name: 'Apple MacBook Pro 17',
      color: 'Red',
      category: 'Laptop',
      price: '$2999',
      status: 'active'
    },
    {
      name: 'Microsoft Surface Pro',
      color: 'Green',
      category: 'Laptop PC',
      price: '$1999',
      status: 'active'
    },
    {
      name: 'Magic Mouse 2',
      color: 'Green',
      category: 'Accessories	',
      price: '$99	',
      status: 'in-active'
    },
    {
      name: 'Apple Watch',
      color: 'Blue',
      category: 'Watches',
      price: '$199',
      status: 'active'
    }
  ]
  const currentUser = useSelector(state => state.usersList)

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(-1);
  const [jobs, setJobs] = useState([]);
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (!init) {
      axios.get('https://639ff1677aaf11ceb8a3be9c.mockapi.io/api/v1/job', { user_id: currentUser.id })
        .then(res => {
          setJobs(res.data);
          setInit(true);
        })
    } else {
      setTimeout(() => {
        setInit(false);
      }, 30000);
    }
  }, [init]);
  const ShowDetail = (key) => {
    setId(key);
    setShowModal(true);
    console.log(key, 'open modal');
  }
  const stopJob = (id) => {
    alert('stoped job');
  }
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <button type="button" className={BUTTON_CLASS} onClick={() => setInit(false)} >Refresh</button>
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-auto border rounded-lg">

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className={TH_CLASS}>Id</th>
                    <th scope="col" className={TH_CLASS}>Name</th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">Job Status</th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">Details</th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">Stop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {
                    jobs.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{item.job_id}</td>
                        <td className={TB_CLASS}>{item.job_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 text-right whitespace-nowrap">
                          {(item.status == 'active' ? <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Active</span> : <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-800">In Active</span>)}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap cursor-pointer">
                          <a className="text-blue-500 hover:text-blue-700" onClick={() => ShowDetail(item.job_id)} >Detail</a>
                          {item.status == 'active' ?
                            <a className="text-blue-500 hover:text-blue-700" onClick={() => stopJob(item.job_id)} >Stop Job</a>
                            : <></>}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <Modal setShowModal={setShowModal} id={id} />
      ) : null}
    </>
  );
}
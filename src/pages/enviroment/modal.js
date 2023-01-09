import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

const dataType = {
  "EnvironmentId": '',
  "EnvironmentName": "",
  "CreatedBy": "",
  "DefaultLocation": '',
  "HostName": "",
  "UserName": "",
  "Password": "",
  "Server": "",
  "Datastrore": "",
  "Network": "",
  "ResourcePool": "",
  "CreationTime": ""
}

export default function Modal({ setShowModal, id = -1, userID, saveData }) {
  const [envmData, setEnvmData] = useState(dataType);
  const [isUpdate, setUpdate] = useState(false);
  const [focus, setFocus] = useState('EnvironmentId');
  useEffect(() => {
    if (id !== -1) {
      axios.get(`https://639feb7024d74f9fe829db07.mockapi.io/api/v1/environment/${id}`)
        .then(res => {
          if (res.data.status === "Success") {
            setEnvmData(res.data.environments[0]);
          }
        });
      setUpdate(true);
    }
  }, [id]);
  const inputChanged = event => {
    const { name, value } = event.target;
    var tmp = { ...envmData };
    tmp[name] = value;
    setEnvmData(tmp)
    setFocus(name);
  }
  const InputEnv = ({ name = '', value = '', inputChanged, disabled, ...props }) => {
    const ref = useRef(null);
    const INPUT_CLASS = "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
    useEffect(() => {
      if (ref.current.name === focus) {
        ref.current.focus();
      }
    }, []);
    return (
      <div className="form-group">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {name}
        </label>
        {disabled ? (
          <input type="text" ref={ref} className={INPUT_CLASS} onChange={inputChanged} value={value ? value : ''} disabled name={name} {...props} />
        ) : (
          <input type="text" ref={ref} className={INPUT_CLASS} onChange={inputChanged} value={value ? value : ''} name={name} {...props} />
        )}
      </div>
    )
  }
  const addEvnData = () => {
    envmData.UserId = userID;
    if (isUpdate) {
      axios.put(`https://639feb7024d74f9fe829db07.mockapi.io/api/v1/environment/${envmData.EnvironmentId}`, envmData)
        .then(response => {
          if (response.data.status === "success") {
            saveData(envmData, isUpdate);
            setShowModal(false);
          }
        });
    } else {
      axios.post('https://639feb7024d74f9fe829db07.mockapi.io/api/v1/environment', envmData)
        .then(response => {
          if (response.data.status === "success") {
            saveData(envmData, isUpdate);
            setShowModal(false);
          }
        });
    }
  }
  return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5">
                <div className="sm:flex sm:items-start">
                  <div className="block px-6 pb-0">
                    <h1 className="text-center">{(isUpdate ? 'Update' : 'Create')} Environment</h1>
                    <hr className="mt-2 mb-4"></hr>
                    <form>
                      <div className="grid grid-cols-2 gap-4">
                        {/* {envmData !== null ? <RenderInput envmData={envmData} setEnvmData={setEnvmData} /> : null} */}
                        <InputEnv name="EnvironmentId" value={envmData.EnvironmentId} disabled={isUpdate ? 1 : 0} inputChanged={inputChanged} />
                        <InputEnv name="EnvironmentName" value={envmData.EnvironmentName} disabled={isUpdate ? 1 : 0} inputChanged={inputChanged} />
                        <InputEnv name="CreatedBy" value={envmData.CreatedBy} inputChanged={inputChanged} />
                        <InputEnv name="DefaultLocation" value={envmData.DefaultLocation} inputChanged={inputChanged} />
                        <InputEnv name="HostName" value={envmData.HostName} inputChanged={inputChanged} />
                        <InputEnv name="UserName" value={envmData.UserName} inputChanged={inputChanged} />
                        <InputEnv name="Password" value={envmData.Password} inputChanged={inputChanged} />
                        <InputEnv name="Server" value={envmData.Server} inputChanged={inputChanged} />
                        <InputEnv name="Datastrore" value={envmData.Datastrore} inputChanged={inputChanged} />
                        <InputEnv name="Network" value={envmData.Network} inputChanged={inputChanged} />
                        <InputEnv name="ResourcePool" value={envmData.ResourcePool} inputChanged={inputChanged} />
                        <InputEnv name="CreationTime" value={envmData.CreationTime} inputChanged={inputChanged} />
                      </div>
                      <div className="bg-gray-50 pr-0 px-4 py-3 sm:flex sm:flex-row-reverse sm:pl-6">
                        <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => addEvnData()}>Save</button>
                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



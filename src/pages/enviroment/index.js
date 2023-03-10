import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import Modal from './modal'
const TD_CLASS = 'px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ';
const ACTION_CLASS = "px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase";
const DATA_CLASS = "px-6 py-4 text-sm text-gray-800 whitespace-nowrap";
export default function Environment() {

	const currentUser = useSelector(state => state.usersList)

	const [showModal, setShowModal] = useState(false);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [envList, setEnvList] = useState(null);
	const [id, setId] = useState({});
	const [indexToDelete, setIndexToDelete] = useState(-1);
	const [showConfirmAdded, setShowConfirmAdded] = useState(false);
	const [showErrorAddingEnv, setShowErrorAddingEnv] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	if (envList === null) {
		axios.get('https://639feb7024d74f9fe829db07.mockapi.io/api/v1/environment/?user_id=' + currentUser.id)
			.then(response => {
				if (response.data.status === "Success") {
					setEnvList(response.data.environments)
				}
			});
	}

	const deleteData = (key) => {
		const tmp = envList.filter(val => (val.EnvironmentId === key));
		const selectedTmp = envList.filter(val => (val.EnvironmentId !== key));
		// axios.delete('https://639feb7024d74f9fe829db07.mockapi.io/api/v1/environment', {user_id: currentUser.id})
		// axios.delete('https://639feb7024d74f9fe829db07.mockapi.io/api/v1/environment?user_id='+currentUser.id)
		axios.delete('https://639feb7024d74f9fe829db07.mockapi.io/api/v1/environment?environment_name=' + tmp[0].EnvironmentName)
			.then(response => {
				console.log(response)
				if (response.data.status === "deleted") {
				}
			});
		setIndexToDelete(-1);
		setShowConfirmDelete(false)
		setEnvList(selectedTmp);
	}

	const editData = (key) => {
		setId(key);
		setShowModal(true);
	}

	const saveData = (data, type) => {
		if (type) {
			const selectedTmp = envList.filter(val => (val.EnvironmentId !== data.EnvironmentId));
			selectedTmp.push(data);
			setEnvList(selectedTmp);
		} else {
			const list = [...envList];
			list.push(data);
			setEnvList(list);
		}
	}

	const clickModal = () => {
		setId(-1)
		setShowModal(true);
	}

	const closeSuccessOrErrorAddingEnvModal = (modal) => {
		if(modal==='success'){
			setShowConfirmAdded(false);
		} else {
			setErrorMessage('');
			setShowErrorAddingEnv(false);
		}
	}

	return (
		<>
			<div className="text-end">
				<button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 items-center inline-flex" onClick={() => clickModal()}><span><FaPlus className='pr-1' /></span> ADD </button>
			</div>
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="p-1.5 w-full inline-block align-middle">
						<div className="overflow-auto border rounded-lg">
							<table className="divide-y w-full divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th scope="col" className={TD_CLASS} >No       					</th>

										<th scope="col" className={TD_CLASS} >Name     					</th>
										<th scope="col" className={TD_CLASS} >CreatedBy       	</th>
										<th scope="col" className={TD_CLASS} >HostName       		</th>
										<th scope="col" className={TD_CLASS} >UserName       		</th>
										{/* <th scope="col" className={TD_CLASS} >Password       		</th> */}
										<th scope="col" className={TD_CLASS} >Server       			</th>
										<th scope="col" className={TD_CLASS} >Datastrore       	</th>
										<th scope="col" className={TD_CLASS} >Network       		</th>
										<th scope="col" className={TD_CLASS} >ResourcePool      </th>
										<th scope="col" className={TD_CLASS} >CreationTime      </th>
										<th scope="col" className={ACTION_CLASS} > Edit 				</th>
										<th scope="col" className={ACTION_CLASS} > Delete 				</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{
										(envList !== null) ?
											envList.map((item, index) => (
												<tr key={index}>
													<td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
														{index + 1}
													</td>
													<td className={DATA_CLASS}>{item.EnvironmentName}</td>
													<td className={DATA_CLASS}>{item.CreatedBy}</td>
													<td className={DATA_CLASS}>{item.HostName}</td>
													<td className={DATA_CLASS}>{item.UserName}</td>
													{/* <td className={DATA_CLASS}>{item.Password}</td> */}
													<td className={DATA_CLASS}>{item.Server}</td>
													<td className={DATA_CLASS}>{item.Datastrore}</td>
													<td className={DATA_CLASS}>{item.Network}</td>
													<td className={DATA_CLASS}>{item.ResourcePool}</td>
													<td className={DATA_CLASS}>{item.CreationTime}</td>
													<td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap cursor-pointer">
														<a className="text-green-500 hover:text-green-700"
															onClick={() => editData(item.EnvironmentId)}>
															Edit
														</a>
													</td>
													<td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap cursor-pointer">
														<a className="text-red-500 hover:text-red-700"
															onClick={() => {
																setIndexToDelete(item.EnvironmentId);
																setShowConfirmDelete(true)
															}} >
															Delete
														</a>
													</td>
												</tr>
											)) : null
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			{showModal ? (
				<Modal setErrorMessage={setErrorMessage} setShowConfirmAdded={setShowConfirmAdded} setShowErrorAddingEnv={setShowErrorAddingEnv} setShowModal={setShowModal} id={id} userID={currentUser.id} saveData={saveData} />
			) : null}

			{
				showConfirmDelete && (
					<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
					<div className="fixed inset-0 z-10 overflow-y-auto">
					  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						  <div className="px-4 pt-5">
							<div className="sm:flex sm:items-center">
							  <div className="px-6 pb-0">
								<h1 className="text-center">Are you sure want to delete environment?</h1>
								<hr className="mt-2 mb-4"></hr>
								<form>
								  <div className=" pr-0 px-4 py-3 sm:flex sm:flex-row-reverse sm:pl-6">
									<button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => deleteData(indexToDelete)} >Delete</button>
									<button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => ( setShowConfirmDelete(false), setIndexToDelete(-1) )}>Cancel</button>
								  </div>
								</form>
							  </div>
							</div>
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				)
			}
			{
				showConfirmAdded && (
					<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
					<div className="fixed inset-0 z-10 overflow-y-auto">
					  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						  <div className="px-4 pt-5">
							<div className="sm:flex sm:items-center">
							  <div className="px-6 pb-0">
								<h1 className="text-center">Env Added SuccessFully</h1>
								<hr className="mt-2 mb-4"></hr>
								<form>
								  <div className=" pr-0 px-4 py-3 sm:flex sm:flex-row-reverse sm:pl-6">
									<button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => closeSuccessOrErrorAddingEnvModal('error')} >Ok</button>
								  </div>
								</form>
							  </div>
							</div>
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				)
			}
			{
				showErrorAddingEnv && (
					<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
					<div className="fixed inset-0 z-10 overflow-y-auto">
					  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						  <div className="px-4 pt-5">
							<div className="sm:flex sm:items-center">
							  <div className="px-6 pb-0">
								<h1 className="text-center">Error Adding enviornment: {errorMessage}</h1>
								<hr className="mt-2 mb-4"></hr>
								<form>
								  <div className=" pr-0 px-4 py-3 sm:flex sm:flex-row-reverse sm:pl-6">
									<button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => closeSuccessOrErrorAddingEnvModal('error')} >Ok</button>
								  </div>
								</form>
							  </div>
							</div>
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				)
			}

			
		</>
	);
}
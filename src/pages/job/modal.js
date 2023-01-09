import React, { useEffect, useState } from "react";
import axios from 'axios';
// const JOB_STATUS = ['NA','Completed','InProgress'];
const Modal = ({ setShowModal, id }) => {
	const [job, setJob] = useState({});
	useEffect(() => {
		axios.get(`https://639ff1677aaf11ceb8a3be9c.mockapi.io/api/v1/job/${id}`)
			.then(res => {
				setJob(res.data)
			})
	}, [id]);
	const TH_CLASS = "px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase";
	// const TB_CLASS = "px-6 py-4 text-sm text-gray-800 whitespace-nowrap";
	const INPUT_CLASS = "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
	const BUTTON_CLASS = "mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm";
	return (
		<>
			{job.job_id ? (
				<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full">
								<div className="bg-white px-4 pt-5">
									<div>
										<div className="block px-6 pb-0">
											<h1 className="text-center">Job Detail</h1>
											<hr className="mt-2 mb-4"></hr>
											<form>
												<div className="grid grid-cols-1 gap-4">
													<div className="form-group">
														<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name
															<span className="text-red-600">*</span>
														</label>
														<input type="text" className={INPUT_CLASS} name="name" placeholder="name" value={job.job_name} disabled required />
													</div>
													<table className="min-w-full divide-y divide-gray-200">
														<thead className="bg-gray-50">
															<tr>
																<th scope="col" className={TH_CLASS}>Resource</th>
																<th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">Step</th>
																<th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">Status</th>
																<th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">comments</th>
															</tr>
														</thead>
														<tbody className="divide-y divide-gray-200">

															{Object.keys(job.resource_status).map((resource, i) => (
																<>
																	{Object.keys(job.resource_status[resource]).map((sbject, j) => (
																		<>
																			{Object.keys(job.resource_status[resource][sbject]).map((step, k) => (
																				<>
																					{Object.keys(job.resource_status[resource][sbject][step]).map((name, l) => (
																						<tr>
																							<td className="px-6 py-3 text-xs font-bold text-left text-gray-500">{`${i}${resource}`}</td>
																							<td className="px-6 py-3 text-xs font-bold text-right">{`${sbject}->${step}->${name}`}</td>
																							<td className="px-6 py-3 text-xs font-bold text-right">{job.resource_status[resource][sbject][step][name]['status']}</td>
																							<td className="px-6 py-3 text-xs font-bold text-right">{job.resource_status[resource][sbject][step][name]['comment']}</td>
																						</tr>
																					))}
																				</>
																			))}
																		</>
																	))}
																</>
															))}
														</tbody>
													</table>
												</div>
												<div className="bg-gray-50 pr-0 px-4 py-3 sm:flex sm:flex-row-reverse sm:pl-6">
													{/* <button type="button" className={BUTTON_CLASS}  onClick={handleJobSave}>Save</button> */}
													<button type="button" className={BUTTON_CLASS} onClick={() => setShowModal(false)}>Close</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (<></>)}

		</>
	);
}
export default Modal;

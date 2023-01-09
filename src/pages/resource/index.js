import React, { useEffect, useState } from "react";
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux'

const resType = {
	"type": "",
	"flavour": "",
	"template": ""
}
const TB_CLASS = "px-6 py-4 text-sm text-gray-800 whitespace-nowrap";

export default function Resource() {
	const currentUser = useSelector(state => state.usersList)

	const [resData, setResData] = useState(null);
	const [envType, setEnvType] = useState('');
	const [page, setPage] = useState('content');
	const [envList, setEnvList] = useState([]);
	const [resList, setResList] = useState([resType]);
	useEffect(() => {
		if (!envList.length) {
			axios.get('https://639feb7024d74f9fe829db07.mockapi.io/api/v1/environment/?user_id=' + currentUser.id)
				.then(response => {
					if (response.data.status === "Success") {
						setEnvList(response.data.environments)
					}
				});
		}
		if (resData === null) {
			axios.get('https://639feb7024d74f9fe829db07.mockapi.io/api/v1/fields')
				.then(response => setResData(response.data.resources));
		}
	}, []);
	useEffect(() => {
		// console.log('')
		if (page === 'xxx') {
			setPage('content')
		}
	}, [resList, page]);
	const RenderField = (props) => {
		const [type, setType] = useState(props.res.type);
		const [flavour, setFlavour] = useState(props.res.flavour);
		const [template, setTemplate] = useState(props.res.template);
		const [resField, setResField] = useState([]);
		const onChangeType = (param) => {
			setType(param);
			if (resData) {
				const field = resData.filter(val => val.type === param)
				if (param !== '') {
					setResField(field[0].fields);
				} else {
					setResField(null);
				}
			}
		}
		useEffect(() => {
			let tmp = resList;
			tmp[props.index] = {
				"type": type,
				"flavour": flavour,
				"template": template
			}
			setResList(tmp);
			onChangeType(type)
		}, [type, flavour, template]);
		const fields = resField;
		const handleChange = (item, val) => {
			for (var key in item) {
				if (key === 'template_type') {
					setTemplate(val)
				}
				if (key === 'flavour') {
					setFlavour(val);
				}
			}
		}
		return (
			<>
				<div className="form-group mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
						Resource Type
						<span className="text-red-600">*</span>
					</label>
					<select className="w-full p-1.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-blue-600" name="color" onChange={(e) => onChangeType(e.target.value)} value={type} required>
						<option value=''>Select Type</option>
						{
							resData !== null ?
								(
									resData.map((item, index) => (
										<option value={item.type} key={index}>{item.type}</option>
									))
								) : null
						}
					</select>
				</div>
				{fields !== null ?
					(
						fields.map((item, index) => (
							< div className="form-group mb-6" key={index} >
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
									{Object.keys(item)[0]}
								</label>
								<select onChange={(e) => handleChange(item, e.target.value)} className="w-full p-1.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-blue-600" name="color" value={item.flavour ? flavour : template}>
									<option value={''} >{'Select one'}</option>
									{item.flavour === 'dropdown' ? (
										item.values.map((val, index) => (
											<option value={val} key={index}>{val}</option>
										))
									) : null}
									{item.template_type === 'dropdown' ? (
										item.values.map((val, index) => (
											<option value={val} key={index}>{val}</option>
										))
									) : null}
								</select>
							</div>
						))
					) : null
				}
			</>
		)
	}

	const Content = (props) => {
		const [list, setList] = useState([]);
		const handleAdd = () => {
			let tmp = resList;
			tmp.push(resType);
			setList(tmp);
			props.setResList(tmp);
			setResList(tmp);
			setPage('xxx');
		}
		useEffect(() => {
			console.log(props.resList)

			setList(props.resList);
		}, []);
		return (
			<>
				<div className="text-end">
					<button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 items-center inline-flex" onClick={handleAdd} ><span><FaPlus className='pr-1' /></span> ADD </button>
				</div>
				<form>
					<div className="grid md:grid-cols-2 gap-4">
						<div className="form-group md:mb-6">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
								Environment
								<span className="text-red-600">*</span>
							</label>
							<select className="w-full p-1.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-blue-600" name="color" onChange={(e) => setEnvType(e.target.value)} value={envType} required>
								<option value='env1'>Select Env</option>
								{envList.map((item, key) => (
									<option value={item.EnvironmentName} key={key}>{item.EnvironmentName}</option>
								))}
							</select>
						</div>
					</div>
					{list.map((res, index) => (
						<div className="grid grid-cols-3 gap-4">
							<RenderField index={index} res={res} key={index} setResList={setResList} />
						</div>
					))}
					<div className="pr-0 py-3 mt-5 sm:flex sm:flex-row-reverse sm:pl-6">
						<button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setPage('summary')}>Submit</button>
					</div>
				</form>
			</>
		)
	}

	const Summary = () => {
		return (
			<>
				<div className="bg-white pt-5">
					<div className="sm:items-start">
						<div className="block px-2 pb-0">
							<h1 className="text-center">Summary</h1>
							<hr className="mt-2 mb-4"></hr>
							<form>
								<div className="form-group flex grid md:grid-cols-3 gap-2 md:gap-4 items-center mb-6">
									<label className="block text-gray-700 text-sm font-bold md:mb-2" htmlFor="name">
										Environment Type:
									</label>
									<input type="text" className="form-control block col-span-2 w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded"
										name="name" value={envType} disabled />
								</div>
								{resList.map(res => (
									<>
										<hr />
										<div className="grid grid-cols-2 gap-4 py-[50px]">
											<div className="form-group flex grid md:grid-cols-3 gap-2 md:gap-4  items-center mb-6">
												<label className="block text-gray-700 text-sm font-bold md:mb-2" htmlFor="name">
													Resource Type:
												</label>
												<input type="text" className="form-control block col-span-2 w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded" name="type" value={res.type} disabled />
											</div>
											<div className="form-group flex grid md:grid-cols-3 gap-2 md:gap-4 items-center mb-6">
												<label className="block text-gray-700 text-sm font-bold md:mb-2" htmlFor="name">
													Flavour:
												</label>
												<input type="text" className="form-control block col-span-2 w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded"
													name="name" value={res.flavour} disabled />
											</div>
											<div className="form-group flex grid md:grid-cols-3 gap-2 md:gap-4  items-center mb-6">
												<label className="block text-gray-700 text-sm font-bold md:mb-2" htmlFor="name">
													Template Type:
												</label>
												<input type="text" className="form-control block col-span-2 w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded" name="type" value={res.template} disabled />
											</div>
										</div>
										<hr />
									</>
								))}
								<div className="bg-gray-50 pr-0 py-3 sm:flex sm:flex-row-reverse sm:pl-6">
									<button type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setPage('track')}>Submit</button>
									<button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setPage('content')}>Back</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</>
		)
	}

	const Track = () => {
		return (
			<>
				<div className="bg-white pt-5">
					<div className="sm:items-start">
						<div className="block pb-0">
							<h1 className="text-center">Track</h1>
							<hr className="mt-2 mb-4"></hr>
							<form>
								<div className="bg-gray-600 text-center p-10 rounded">Track Page</div>
								<div className="bg-gray-50 pr-0 py-3 sm:flex sm:flex-row-reverse sm:pl-6">
									<button type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>
									<button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setPage('summary')}>Back</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</>
		)
	}

	const renderSwitch = (param) => {
		switch (param) {
			case 'content': return <Content resList={resList} setResList={setResList} />;
			case 'summary': return <Summary />;
			case 'track': return <Track />;
		}
	}

	return (
		<>
			<div className="block">
				{renderSwitch(page)}
			</div>
		</>
	);
}
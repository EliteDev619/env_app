import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Report() {
	const [resData, setResData] = useState([]);
	const [pceDetails, setPceDetails] = useState([]);
	const [driverDetails, setDriverDetails] = useState([]);
	const [venDetails, setVenDetails] = useState([]);

	if(!resData.length) {
		axios.get('https://639ff1677aaf11ceb8a3be9c.mockapi.io/api/v1/report')
			.then(res => {
				setResData(res.data);
			})
			.catch(err => {
				console.log(err);
			})
	}

	useEffect(() => {
		if(resData.length) {
			let data = resData[0].PCE_Details;
			let pceData = [];
			data.map((item, index) => {
				return item?.PDetail?.map((res, index) => {
					return pceData.push(res);
				})
			})
			setPceDetails(pceData);

			setDriverDetails(resData[0].Driver_Details);

			setVenDetails(resData[0].VEN_Details);
		}
	}, [resData])
	
	const envData = [
		{
			name: 'Apple MacBook Pro 17',
			color: 'Red',
			category: 'Laptop',
			price: '$2999'
		},
		{
			name: 'Microsoft Surface Pro',
			color: 'Green',
			category: 'Laptop PC',
			price: '$1999'
		},
		{
			name: 'Magic Mouse 2',
			color: 'Green',
			category: 'Accessories	',
			price: '$99	'
		},
		{
			name: 'Apple Watch',
			color: 'Blue',
			category: 'Watches',
			price: '$199'
		}
	]
	return (
		<>
			<div className="grid gap-x-6 gap-y-6 md:grid-cols-3 grid-cols-1">
				<div className="text-center"> 
				<div className="text-gray-700 text-m font-bold m-2">
					PCE
				</div>
				<div className="text-center text-m font-bold text-white p-5 bg-gray-600 rounded">
					{resData.length && resData[0].PCE}
				</div>
				</div>
				<div className="text-center">
				<div className="text-gray-700 text-m font-bold m-2">
					Driver
				</div>
				<div className="text-center text-m font-bold text-white p-5 bg-gray-600 rounded">
					{resData.length && resData[0].Driver}
				</div>
				</div>
				<div className="text-center">
				<div className="text-gray-700 text-m font-bold m-2">
					VEN
				</div>
				<div className="text-center text-m font-bold text-white p-5 bg-gray-600 rounded">
					{resData.length && resData[0].VEN}
				</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="mt-10 w-full inline-block align-middle">
						<div className="overflow-auto border rounded-lg">
							<label className="block text-gray-700 text-sm font-bold m-2" htmlFor="color">
								PCE Details
							</label>
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
												scope="col"
												className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
											>
											ID
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Resource Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Cluster Detail
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Resource SubType
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											VMName
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											IPAddress
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											OS
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											OSVersion
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Host Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Network
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Storage
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Power Status
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{
										 pceDetails?.map((res, index) => (
											<tr key={index}>
												<td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
													{index + 1}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.ResourceName}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.ClusterDetail}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.ResourceSubType}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.VMName}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.IPAddress}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.OS}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.OSVersion}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.HostName}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.Network}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.Storage}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.PowerStatus}
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
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="mt-10 w-full inline-block align-middle">
						<div className="overflow-auto border rounded-lg">
							<label className="block text-gray-700 text-sm font-bold m-2" htmlFor="color">
								Driver Details
							</label>
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
												scope="col"
												className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
											>
											ID
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Host Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											IPAddress
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Network
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											OS
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											OSVersion
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Power Status
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Storage
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											VMName
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{
										 driverDetails?.map((res, index) => (
											<tr key={index}>
												<td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
													{index + 1}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.HostName}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.IPAddress}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.Network}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.OS}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.OSVersion}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.PowerStatus}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.Storage}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.VMName}
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
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="mt-10 w-full inline-block align-middle">
						<div className="overflow-auto border rounded-lg">
							<label className="block text-gray-700 text-sm font-bold m-2" htmlFor="color">
								VEN Details
							</label>
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
												scope="col"
												className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
											>
											ID
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Host Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											IPAddress
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Network
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											OS
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											OSVersion
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Power Status
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Storage
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											VMName
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{
										 venDetails?.map((res, index) => (
											<tr key={index}>
												<td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
													{index + 1}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.HostName}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.IPAddress}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.Network}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.OS}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.OSVersion}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.PowerStatus}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.Storage}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{res.VMName}
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
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="mt-10 w-full inline-block align-middle">
						<div className="overflow-auto border rounded-lg">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											ID
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Color
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Category
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
										>
											Price
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
										>
											Details
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{
										envData.map((item, index) => (
											<tr key={index}>
												<td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
													{index + 1}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{item.name}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{item.color}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{item.category}
												</td>
												<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
													{item.price}
												</td>
												<td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap cursor-pointer">
													<a
														className="text-green-500 hover:text-green-700"
													>
														Detail
													</a>
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
		</>
	);
}
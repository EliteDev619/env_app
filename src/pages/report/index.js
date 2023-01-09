import React from "react";

export default function Report() {
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
				<div className="text-center p-5 bg-gray-600 rounded">01</div>
				<div className="text-center p-5 bg-gray-600 rounded">02</div>
				<div className="text-center p-5 bg-gray-600 rounded">03</div>
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
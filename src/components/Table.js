function Table(props) {

    const {
        data
    } = props;

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {data[0].map((dataRow, loopIndex) => (
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            key={ loopIndex }
                                        >
                                            { dataRow.label }
                                        </th>
                                    ))}
                                </tr>
                                {/* <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                                </th> */}
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((dataRow, loopIndex) => (
                                    <tr key={ loopIndex }>
                                        {dataRow.map((dataColumn, columnLoopIndex) => (
                                            <td 
                                                className="px-6 py-4 whitespace-nowrap"
                                                key={ columnLoopIndex }
                                            >
                                                { dataColumn.value }
                                            </td>
                                        ))}
                                        {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </a>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
      </div>
    );
}

export default Table;
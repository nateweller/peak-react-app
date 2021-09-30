import LoadingIcon from "./LoadingIcon";

function Table(props) {

    const {
        data,
        isLoading
    } = props;

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            { Boolean(data?.length) ? 
                                <thead className="bg-gray-50">
                                    <tr>
                                        {Boolean(data[0]) ? data[0].map((dataRow, loopIndex) => (
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                key={ loopIndex }
                                            >
                                                { dataRow.label }
                                            </th>
                                        )) : null }
                                        <th className="p-3 flex justify-end align-items-center">
                                            { isLoading ? <LoadingIcon isSmall={true} /> : null }
                                        </th>
                                    </tr>
                                </thead>
                                : null
                            }
                            <tbody className="bg-white divide-y divide-gray-200">
                                { (data === undefined && isLoading) ?
                                    <tr>
                                        <td>
                                            <LoadingIcon isLarge={true} />
                                        </td>
                                    </tr>
                                  : null
                                }
                                {Boolean(data?.length) && data.map((dataRow, loopIndex) => (
                                    <tr key={ loopIndex }>
                                        {dataRow.map((dataColumn, columnLoopIndex) => (
                                            <td 
                                                className="px-6 py-4 whitespace-nowrap"
                                                key={ columnLoopIndex }
                                                colSpan={ columnLoopIndex === dataRow.length - 1 ? 2 : 1 }
                                            >
                                                { dataColumn.value }
                                            </td>
                                        ))}
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
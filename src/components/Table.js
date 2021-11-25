import LoadingIcon from "./LoadingIcon";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { EmojiSadIcon } from "@heroicons/react/outline";

function Table(props) {

    const {
        data,
        emptyContent,
        isLoading,
        className = ""
    } = props;

    const renderTableHead = () => {
        if (! data || ! data[0] || ! data[0].columns || ! data[0].columns.length) {
            return null;
        }

        return (
            <thead className="bg-gray-50">
                <tr>
                    {(data[0] && data[0].columns) ? data[0].columns.map((dataColumn, loopIndex) => (
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            key={ loopIndex }
                        >
                            { dataColumn.label }
                        </th>
                    )) : null }
                    <th className="p-3 flex justify-end align-items-center">
                        { isLoading ? <LoadingIcon isSmall={true} /> : null }
                    </th>
                </tr>
            </thead>
        );
    };

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 bg-white">
                            
                            { renderTableHead() }

                            <tbody className="bg-white divide-y divide-gray-200">
                                { (data === undefined && isLoading !== false) ?
                                    <tr>
                                        <td>
                                            <LoadingIcon isLarge={true} />
                                        </td>
                                    </tr>
                                  : null
                                }

                                {( data === undefined && isLoading === false) && (
                                    <tr>
                                        <td className="text-center py-24">
                                            <EmojiSadIcon className="inline-block w-8 h-8 text-indigo-500 mb-2" />
                                            <p className="text-xs text-gray-500">
                                                Data could not be loaded.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                                
                                { (data && ! data.length) && (
                                    <tr>
                                        <td>
                                            { emptyContent }
                                        </td>
                                    </tr>
                                ) }

                                {Boolean(data?.length) && data.map((dataRow, loopIndex) => (
                                    <tr key={ loopIndex } onClick={dataRow.onClick} className="group hover:bg-gray-50 cursor-pointer">
                                        {dataRow.columns.map((dataColumn, columnLoopIndex) => (
                                            <td 
                                                className="px-6 py-4 whitespace-nowrap"
                                                key={ columnLoopIndex }
                                                colSpan={ columnLoopIndex === dataRow.columns.length - 1 && typeof dataRow.onClick !== 'function' ? 2 : 1 }                                            
                                            >
                                                { dataColumn.value }
                                            </td>
                                        ))}

                                        { typeof dataRow.onClick === 'function' && (
                                            <td>
                                                <ArrowRightIcon className="w-4 text-gray-300 opacity-0 group-hover:opacity-100" />
                                            </td>
                                        ) }
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
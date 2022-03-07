import LoadingIcon from "./LoadingIcon";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { EmojiSadIcon } from "@heroicons/react/outline";

export function Table({
    children,
    className = "",
    ...rest
}) {
    return (
        <div 
            className={`flex flex-col ${ className }`} 
            { ...rest }
        >
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 bg-white">
                            { children }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function TableHead({
    children,
    ...rest
}) {

    return (
        <thead className="bg-gray-50" { ...rest }>
            <tr>
                { children }
            </tr>
        </thead>
    );
}

export function TableHeading({
    children,
    className = "",
    ...rest
}) {
    return (
        <th 
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
            { ...rest }
        >
            { children }
        </th>
    );
}

export function TableBody({
    children,
    ...rest
}) {
    return (
        <tbody 
            className="bg-white divide-y divide-gray-200" 
            { ...rest }
        >
            { children }
        </tbody>
    );
}

export function TableRow({
    children,
    ...rest
}) {
    return (
        <tr { ...rest }>
            { children }
        </tr>
    );
}

export function TableCell({
    children,
    className = "",
    ...rest
}) {
    return (
        <td className={ className } { ...rest }>
            { children }
        </td>
    );
}

export function TableErrorRow({
    errorMessage = "An error occurred.",
}) {
    return (
        <TableRow>
            <TableCell className="text-center py-24">
                <EmojiSadIcon className="inline-block w-8 h-8 text-indigo-500 mb-2" />
                <p className="text-xs text-gray-500">
                    { errorMessage }
                </p>
            </TableCell>
        </TableRow>
    );
}

export function DataTable(props) {

    const {
        data,
        emptyContent,
        isLoading,
        error,
        className = ""
    } = props;

    const renderTableHead = () => {
        if (! data || ! data[0] || ! data[0].columns || ! data[0].columns.length) {
            return null;
        }

        return (
            <TableHead>
                {(data[0] && data[0].columns) ? data[0].columns.map((dataColumn, loopIndex) => (
                    <TableHeading 
                        key={ loopIndex }
                    >
                        { dataColumn.label }
                    </TableHeading>
                )) : null }
                <TableHeading className="p-3 flex justify-end align-items-center">
                    { isLoading ? <LoadingIcon isSmall={true} /> : null }
                </TableHeading>
            </TableHead>
        );
    };

    return (
        <Table className={ className }>
            
            { renderTableHead() }

            <TableBody>
                { (data === undefined && isLoading !== false) ?
                    <TableRow>
                        <TableCell>
                            <LoadingIcon isLarge={true} />
                        </TableCell>
                    </TableRow>
                    : null
                }

                {( error && data === undefined && isLoading === false) && (
                    <TableErrorRow errorMessage="Data could not be loaded." />
                )}
                
                { (data && ! data.length) && (
                    <TableRow>
                        <TableCell>
                            { emptyContent }
                        </TableCell>
                    </TableRow>
                ) }

                {Boolean(data?.length) && data.map((dataRow, loopIndex) => (
                    <TableRow key={ loopIndex } onClick={dataRow.onClick} className="group hover:bg-gray-50 cursor-pointer">
                        {dataRow.columns.map((dataColumn, columnLoopIndex) => (
                            <TableCell
                                className="px-6 py-4 whitespace-nowrap"
                                key={ columnLoopIndex }
                                colSpan={ columnLoopIndex === dataRow.columns.length - 1 && typeof dataRow.onClick !== 'function' ? 2 : 1 }                                            
                            >
                                { dataColumn.value }
                            </TableCell>
                        ))}

                        { typeof dataRow.onClick === 'function' && (
                            <TableCell>
                                <ArrowRightIcon className="w-4 text-gray-300 opacity-0 group-hover:opacity-100" />
                            </TableCell>
                        ) }
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    );
}
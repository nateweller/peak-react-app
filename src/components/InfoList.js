import LoadingIcon from "./LoadingIcon";

function InfoList(props) {

    const { heading, info } = props;

    const renderHeading = () => {
        if (! heading) return null;

        return (
            <div className="px-4 py-5 sm:px-6">
                { heading }
            </div>
        );
    };

    const renderInfo = () => {
        if (info === undefined) {
            return <LoadingIcon isLarge={ true } />
        }

        if (! info || ! info.length) {
            return (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    No data.
                </div>
            );
        }

        return (
            <dl>
                { info.map((info, loopIndex) => (
                    <div 
                        className={ `${ loopIndex % 2 ? 'bg-gray-50' : 'bg-white' } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`} 
                        key={ loopIndex }    
                    >
                        <dt className="text-sm font-medium text-gray-500">
                            { info.label }
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            { info.value }
                        </dd>
                    </div>
                )) }
            </dl>
        );
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            { renderHeading() }
            <div className="border-t border-gray-200">
                { renderInfo() }
            </div>
        </div>
    );
}

export default InfoList;
import { BiLoaderAlt } from 'react-icons/bi';

function LoadingIcon(props) {

    const { 
        isFullScreen, 
        isLarge,
        isSmall
    } = props;

    const icon = 
        <div className="inline-block animate-spin">
            <BiLoaderAlt className={ `${isSmall ? 'h-4 w-4' : 'h-8 w-8'} text-indigo-100` } />
        </div>;

    if (isFullScreen) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                { icon }
            </div>
        );
    }

    if (isLarge) {
        return (
            <div className="text-center py-24">
                { icon }
            </div>
        );
    }

    return icon;
}

export default LoadingIcon;
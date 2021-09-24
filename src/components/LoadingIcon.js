import { BiLoaderAlt } from 'react-icons/bi';

function LoadingIcon({ isFullScreen, isLarge }) {
    const icon = 
        <div className="inline-block animate-spin">
            <BiLoaderAlt className="h-8 w-8 text-indigo-100" />
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
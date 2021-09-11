function LoadingIcon({ isFullScreen }) {
    const icon = (
        <div className="loading-icon">
            <div />
            <div />
            <div />
            <div />
        </div>
    );

    const iconWithWrapper = (
        <div className="loading-icon-wrapper">
            { icon }
        </div>
    );

    return isFullScreen ? iconWithWrapper : icon;
}

export default LoadingIcon;
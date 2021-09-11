// wrapper for console.log() with conditional logging based on env config
export const developmentLog = (message, level) => {
    if (process.env.REACT_APP_ENV !== 'production') {
        console.log(message);
    }
};
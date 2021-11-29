// wrapper for console.log() with conditional logging based on env config
export const developmentLog = (message, level) => {
    if (process.env.REACT_APP_ENV !== 'production') {
        console.dir(message);
    }
};

export const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (! result) return null;

    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ]; 
};

// http://www.w3.org/TR/AERT#color-contrast
export const getContrastTextColor = (rgb) => {
    const [red, green, blue] = rgb || [255, 255, 255];

    const brightness = 
        Math.round(((parseInt(red) * 299) +
        (parseInt(green) * 587) +
        (parseInt(blue) * 114)) / 1000);
    return (brightness > 125) ? '#000000' : '#FFFFFF';
};
import { Fragment } from 'react';
import { ErrorMessage, Field, useField } from 'formik';

function ColorPicker(props) {

    const { 
        name = 'color', 
        label = 'Color', 
        colors = [] 
    } = props;

    // eslint-disable-next-line
    const [field, meta, helpers] = useField(name);
    const { value } = meta;
    const { setValue } = helpers;

    const ColorOptions = ({ field, form, ...props }) => {
        if (! colors || ! colors.length) {
            return null;
        }

        return colors.map(color => (
            <Fragment key={ color.id }>
                <div 
                    key={ color.id }
                    className={ `w-12 h-12 rounded-full mr-3 border border-black border-opacity-20 ${color.id === value ? 'ring-2 ring-offset-2 ring-gray-700' : ''}` }
                    style={{ 
                        backgroundColor: color.color,
                        // boxShadow: color.id === value ? `rgb(255, 255, 255) 0px 0px 0px 2px, ${color.color} 0px 0px 0px 4px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px` : undefined
                    }} 
                    onClick={ () => setValue(color.id) }
                />
                <ErrorMessage name={name} component="div" className="mt-2 text-sm text-red-600" id={`${name}-error`} />
            </Fragment>
        ));
    }

    if (! colors) return null;

    return (
        <>
            <label htmlFor={ name } className="block text-sm font-medium text-gray-700">
                { label }
            </label>
            <div className="mt-4 flex flex-wrap">
                <Field 
                    name={ name } 
                    id={ name } 
                    type="number" 
                    component={ ColorOptions } 
                />
            </div>
        </>
    );
}

export default ColorPicker;
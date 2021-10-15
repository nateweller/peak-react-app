import { useState } from 'react';
import { Field, useField } from 'formik';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MenuAlt4Icon, XIcon} from '@heroicons/react/solid';
// import { useDataStoreItem } from './../hooks';
import Button from './Button';
import Input from './Input';

const GradeOptions = (props) => {
    const { 
        value, 
        setValue, 
        newGradeName, 
        setNewGradeName 
    } = props;

    return (
        <>
            <DragDropContext onDragEnd={(provided) => {
                if (! provided.destination) return;

                const newValue = [...value];
                const movedValue = value[provided.source.index];
                newValue.splice(provided.source.index, 1);
                newValue.splice(provided.destination.index, 0, movedValue);
                setValue(newValue);
            }}>
                <Droppable droppableId="grades_droppable">
                    {(provided) => (
                        <div 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            { Boolean(value && value.length) && value.map((grade, loopIndex) => (
                                <Draggable key={loopIndex} draggableId={`foo-${loopIndex}`} index={loopIndex}>
                                    {(provided) => (
                                        <div 
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            
                                            className="flex items-center shadow-sm w-full sm:text-sm border border-gray-300 bg-white rounded-md px-3 py-2 mb-2"
                                        >
                                            <div className="flex-1">
                                                { grade.name }
                                            </div>
                                            <div title="Move" {...provided.dragHandleProps}>
                                                <MenuAlt4Icon className="w-4 h-4 mr-2 cursor-move" />
                                            </div>
                                            <div title="Delete" onClick={() => {
                                                setValue([
                                                    ...value.slice(0, loopIndex),
                                                    ...value.slice(loopIndex + 1)
                                                ]);
                                            }}>
                                                <XIcon className="w-4 h-4 cursor-pointer" />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            )) }
                            { provided.placeholder }
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="flex space-x-3 border-t border-gray-200 mt-4 pt-4">
                <div className="flex-auto">
                    <Input
                        name="new_grade_name"
                        placeholder="Add new grade..."
                        type="text" 
                        use="input"
                        value={ newGradeName }
                        onChange={ e => {
                            setNewGradeName(e.target.value);
                        } }
                        onKeyPress={ (e) => {
                            if (e.charCode === 13) {
                                e.preventDefault();
                                if (value) {
                                    setValue([ ...value, { name: newGradeName } ]);
                                } else {
                                    setValue([{ name: newGradeName }]);
                                }
                                setNewGradeName('');
                            }
                        }}
                    />
                </div>
                <div>
                    <Button 
                        onClick={ () => {
                            if (value) {
                                setValue([ ...value, { name: newGradeName } ]);
                            } else {
                                setValue([{ name: newGradeName }]);
                            }
                            setNewGradeName('');
                        } }
                    >
                        Add Grade
                    </Button>
                </div>
            </div>
        </>
    );
};

function GradesInput() {

    // eslint-disable-next-line
    const [field, meta, helpers] = useField('grades');
    const { value } = meta;
    const { setValue } = helpers;
    
    const [newGradeName, setNewGradeName] = useState('');

    return (
        <>
            <label htmlFor="grades" className="block text-sm font-medium text-gray-700">
                Grades
            </label>
            <div className="mt-4">
                <Field 
                    name="grades"
                    id="grades"
                    type="number" 
                    component={ GradeOptions }
                    value={ value }
                    setValue={ setValue }
                    newGradeName={ newGradeName } 
                    setNewGradeName={ setNewGradeName }
                />
            </div>
        </>
    );
}

export default GradesInput;
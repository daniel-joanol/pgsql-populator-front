import { React } from 'react';
import PropTypes from 'prop-types';
import { GenericField } from '../models/genericField';
import VARCHAR_TYPE from '../models/varcharType.enum.js'
import TYPE from '../models/type.enum.js';
import '../styles/field.css'

const FieldComponent = ({ field, i, update }) => {

    const types = Object.keys(TYPE);
    const varcharTypes = Object.keys(VARCHAR_TYPE);

    return (

        
            <div className='row justify-content-md-center'>
                <div className='col-3'>
                    <label>Name</label>
                    <input key={i} type='text' size='10' name='field_name' autoComplete='off'
                        required={true} onChange={(e) => update(e, i)}></input>
                </div>

                <div className='col-2'>
                    <label>Type</label>
                    <select key={i} name='field_type' onChange={(e) => update(e, i)}>
                        {types.map((t, j) => {
                            return <option key={j}>
                                {t}
                            </option>
                        })}
                    </select>
                </div>

                <div className='col-4'>
                    {
                        field.type === 'ENUM' &&
                        <div>
                            <label>Items</label>
                            <input key={i} type='text' size='28' name='items' autoComplete='off'
                                placeholder='"item1","item2", "etc"' required={true} onChange={(e) => update(e, i)}></input>
                        </div>
                    }

                    {
                        (field.type === 'TEXT' || field.type === 'VARCHAR') &&
                        <div>
                            <label>Varchar type</label>
                            <select key={i} name='varchar_type' onChange={(e) => update(e, i)}>
                                {varcharTypes.map((t, j) => {
                                    return <option key={j} >
                                        {t}
                                    </option>
                                })}
                            </select>
                        </div>
                    }

                    {
                        (field.type === 'TIME' || field.type === 'DATE' || field.type === 'TIMESTAMP') &&
                        <div>
                            <label>Start date</label>
                            <input key={i} name='start_date' type='text' size='10' placeholder='2022-10-01T10:00:00' 
                                autoComplete='off' required={true} onChange={(e) => update(e, i)}></input>
                        </div>
                    }
                </div>

                <div className='col-3'>
                    {
                        (field.type === TYPE.TEXT || field.type === TYPE.VARCHAR) &&
                        <div>
                            <label>Length</label>
                            <input key={i} type='number' name='length' min='0' max='100' placeholder='0 to 100' required={false}
                                size='5' onChange={(e) => update(e, i)}></input>
                        </div>
                    }

                    {
                        (field.type === TYPE.TIME || field.type === TYPE.DATE || field.type === TYPE.TIMESTAMP) &&
                        <div>
                            <label>End date</label>
                            <input key={i} name='end_date' type='text' size='10' placeholder='2022-10-31T10:00:00' required={true}
                                autoComplete='off' onChange={(e) => update(e, i)}></input>
                        </div>
                    }
                </div>
            </div>

    );
}

FieldComponent.propTypes = {
    field: PropTypes.instanceOf(GenericField).isRequired,
    i: PropTypes.number.isRequired,
    update: PropTypes.func.isRequired
};

export default FieldComponent;
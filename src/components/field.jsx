import { React } from 'react';
import PropTypes from 'prop-types';
import { GenericField } from '../models/genericField';
import VARCHAR_TYPE from '../models/varcharType.enum.js'
import TYPE from '../models/type.enum.js';

const FieldComponent = ({ field, i, update }) => {

    const types = Object.keys(TYPE);
    const varcharTypes = Object.keys(VARCHAR_TYPE);
    const varcharType = varcharTypes[0];

    return (

        <tr>
            <td>
                <label>Name</label>
                <input key={i} type='text' name='field_name' required={true} onChange={(e) => update(e, i)}></input>
            </td>
            <td>
                <label>Type</label>
                <select key={i} name='field_type' onChange={(e) => update(e, i)}>
                    {types.map((t, j) => {
                        return <option key={j}>
                            {t}
                        </option>
                    })}
                </select>
            </td>
            <td>
                {
                    field.type === 'ENUM' &&
                    <div>
                        <label>Items</label>
                        <input key={i} type='text' size='80' name='items' placeholder='Use "," between items' required={true}
                            onChange={(e) => update(e, i)}></input>
                    </div>
                }

                {
                    (field.type === 'TEXT' || field.type === 'VARCHAR') &&
                    <div>
                        <label>Varchar type</label>
                        <select key={i} name='varchar_type' value={varcharType} onChange={(e) => update(e, i)}>
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
                        <input key={i} name='start_date' type='text' size='20' placeholder='Example 2022-10-01T10:00:00' required={true}
                            onChange={(e) => update(e, i)}></input>
                    </div>
                }

            </td>
            <td>
                {
                    (field.type === TYPE.TEXT || field.type === TYPE.VARCHAR) &&
                    <div>
                        <label>Length</label>
                        <input key={i} type='number' name='length' min='1' max='100' placeholder='1 to 100' required={true}
                            size='5' onChange={(e) => update(e, i)}></input>
                    </div>
                }

                {
                    (field.type === TYPE.TIME || field.type === TYPE.DATE || field.type === TYPE.TIMESTAMP) &&
                    <div>
                        <label>End date</label>
                        <input key={i} name='end_date' type='text' size='20' placeholder='Example 2022-10-31T10:00:00' required={true}
                            onChange={(e) => update(e, i)}></input>
                    </div>
                }
            </td>
        </tr>
    );
}

FieldComponent.propTypes = {
    field: PropTypes.instanceOf(GenericField).isRequired,
    i: PropTypes.number.isRequired,
    update: PropTypes.func.isRequired
};

export default FieldComponent;
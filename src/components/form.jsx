import { React, useState, useEffect } from 'react';
import '../styles/form.css';
import { GenericField } from '../models/genericField';
import VARCHAR_TYPE from '../models/varcharType.enum.js'
import TYPE from '../models/type.enum.js';

const Form = () => {

    const [tableName, setTableName] = useState('');
    const [values, setValues] = useState([new GenericField(null, TYPE.CHAR, null, null, null, null, null)]);
    const [fieldN, setFieldN] = useState(1);
    const types = Object.keys(TYPE);
    const varcharTypes = Object.keys(VARCHAR_TYPE);
    const varcharType = varcharTypes[0];

    const updateFieldN = (e) => {
        setFieldN(e.target.value);
        let newValues = [values[0]];

        for (let i = 1; i < e.target.value; i++) {
            if (i < values.length) {
                newValues.push(values[i]);
            } else {
                newValues.push(new GenericField(null, TYPE.CHAR, null, null, null, null, null));
            }
        }
        
        setValues(newValues);
    }

    const updateValues = (e, i) => {
        let newValue = values[i];

        switch (e.target.name) {
            case 'field_name':
                newValue.name = e.target.value;
                break;
            
            case 'field_type':
                newValue.type = e.target.value;
                break;

            case 'items':
                newValue.items = e.target.value;
                break;

            case 'varchar_type':
                newValue.varcharType = e.target.value;
                break;

            case 'length':
                newValue.length = e.target.value;
                break;
            
            case 'start_date':
                newValue.startDate = e.target.value;
                break;

            case 'end_date':
                newValue.endDate = e.target.value;
                break;
            
            default:
                break;
        }

        values[i] = newValue;
        setValues(values);
    }

    return (
        <div className='mainBox'>

            <form name='sqlOptions' method='post'
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(tableName);
                    console.log(values);
                }}>

                <label>Table name</label>
                <input type='text' name='table_name' required={true} onChange={(e) => setTableName(e.target.value)}></input>

                <table className='table table-striped'>
                    <tbody>
                        {
                            values.map((v, i) => {
                                return <tr>
                                    <td>
                                        <label>Name</label>
                                        <input key={i} type='text' name='field_name' required={true} onChange={(e) => updateValues(e, i)}></input>
                                    </td>
                                    <td>
                                        <label>Type</label>
                                        <select key={i} name='field_type' onChange={(e) => updateValues(e, i)}>
                                            {types.map((t, j) => {
                                                return <option key={j}>
                                                    {t}
                                                </option>
                                            })}
                                        </select>
                                    </td>
                                    <td>
                                        {
                                            values[i].type === 'ENUM' &&
                                            <div>
                                                <label>Items</label>
                                                <input key={i} type='text' size='100' name='items' placeholder='Use "," between items' required={true}
                                                    onChange={(e) => updateValues(e, i)}></input>
                                            </div>
                                        }

                                        {
                                            (values[i].type === 'TEXT' || values[i].type === 'VARCHAR') &&
                                            <div>
                                                <label>Varchar type</label>
                                                <select key={i} name='varchar_type' value={varcharType} onChange={(e) => updateValues(e, i)}>
                                                    {varcharTypes.map((t, j) => {
                                                        return <option key={j} >
                                                            {t}
                                                        </option>
                                                    })}
                                                </select>
                                            </div>
                                        }

                                        {
                                            (values[i].type === 'TIME' || values[i].type === 'DATE' || values[i].type === 'TIMESTAMP') &&
                                            <div>
                                                <label>Start date</label>
                                                <input key={i} name='start_date' type='text' size='20' placeHolder='Example 2022-10-01T10:00:00' required={true}
                                                    onChange={(e) => updateValues(e, i)}></input>
                                            </div>
                                        }

                                    </td>
                                    <td>
                                        {
                                            (values[i].type === TYPE.TEXT || values[i].type === TYPE.VARCHAR) &&
                                            <div>
                                                <label>Length</label>
                                                <input key={i} type='number' name='length' min='1' max='100' placeholder='1 to 100' required={true}
                                                    size='5' onChange={(e) => updateValues(e, i)}></input>
                                            </div>
                                        }

                                        {
                                            (values[i].type === TYPE.TIME || values[i].type === TYPE.DATE || values[i].type === TYPE.TIMESTAMP) &&
                                            <div>
                                                <label>End date</label>
                                                <input key={i} name='end_date' type='text' size='20' placeHolder='Example 2022-10-31T10:00:00' required={true}
                                                    onChange={(e) => updateValues(e, i)}></input>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

                <label>Number of fields</label>
                <input type='number' min='1' placeholder='1' value={fieldN} onChange={(e) => updateFieldN(e)}></input>
                <button type='send'>Generate query</button>
            </form>
        </div>

    );
}

export default Form;
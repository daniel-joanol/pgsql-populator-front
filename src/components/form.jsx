import { React, useState } from 'react';
import '../styles/form.css';
import { GenericField } from '../models/genericField';
import FieldComponent from './field';
import TYPE from '../models/type.enum.js';

const Form = () => {

    const [tableName, setTableName] = useState('');
    const [values, setValues] = useState([new GenericField(null, TYPE.CHAR, null, null, null, null, null)]);
    const [fieldN, setFieldN] = useState(1);
    const [records, setRecords] = useState(1);
    const [control, setControl] = useState(false);

    const updateFieldN = (n) => {
        let count = fieldN +n;
        setFieldN(count);
        let newValues = [values[0]];

        for (let i = 1; i < count; i++) {
            if (i < values.length) {
                newValues.push(values[i]);
            } else {
                newValues.push(new GenericField(null, TYPE.CHAR, null, null, null, null, null));
            }
        }

        setValues(newValues);
    }

    const updateValues = (e, i) => {
        let newValues = values;

        switch (e.target.name) {

            case 'field_name':
                newValues[i].name = e.target.value;
                break;

            case 'field_type':
                newValues[i].type = e.target.value;
                break;

            case 'items':
                newValues[i].items = e.target.value;
                break;

            case 'varchar_type':
                newValues[i].varcharType = e.target.value;
                break;

            case 'length':
                newValues[i].length = e.target.value;
                break;

            case 'start_date':
                newValues[i].startDate = e.target.value;
                break;

            case 'end_date':
                newValues[i].endDate = e.target.value;
                break;

            default:
                break;
        }

        setControl(!control);
        setValues(newValues);
    }

    return (
        <div className='mainBox'>

            <form name='sqlOptions' method='post'
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(tableName);
                    console.log(values);
                }}>

                <div id='table_name'>
                    <label>Table name</label>
                    <input type='text' name='table_name' required={true} onChange={(e) => setTableName(e.target.value)}></input>
                </div>

                <table className='table table-striped'>
                    <tbody>
                        {
                            values.map((v, i) => {
                                return <FieldComponent key={i} field={v} i={i} update={updateValues} />
                            })
                        }
                    </tbody>
                </table>

                <div className='container text-center'>
                    <div className='row'>
                        <div className='col-2 text-left'>
                            <label>Records</label>
                            <input size='1' type='number' min='1' placeholder='1' value={records} onChange={(e) => setRecords(e.target.value)}></input>
                        </div>

                        <div className='col-8'>
                            <button type='send' className='btn btn-dark'>Generate query</button>
                        </div>

                        <div className='col-2 row'>
                            <div className='button' id='minus' onClick={ () => updateFieldN(-1)}/>
                            <div className='button' id='plus' onClick={ () => updateFieldN(+1)}/>
                        </div>
                    </div>
                </div>

            </form>

            <div className='fixed-bottom'>
                <p><a href="https://www.flaticon.com/free-icons/plus" target='_blank' rel='noreferrer'>Plus icons created by Anggara - Flaticon</a></p>
                <p><a href="https://www.flaticon.com/free-icons/minus" target='_blank' rel='noreferrer'> Minus icons created by inkubators - Flaticon</a></p>
            </div>
        </div>

    );
}

export default Form;
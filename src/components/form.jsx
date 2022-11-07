import { React, useState } from 'react';
import '../styles/form.css';
import { GenericField } from '../models/genericField';
import FieldComponent from './field';
import TYPE from '../models/type.enum.js';
import minus from '../images/minus-button.png'
import plus from '../images/add-button.png'

const Form = () => {

    const [tableName, setTableName] = useState('');
    const [values, setValues] = useState([new GenericField(null, TYPE.CHAR, null, null, null, null, null)]);
    const [fieldN, setFieldN] = useState(1);
    const [records, setRecords] = useState(1);
    const [control, setControl] = useState(false);

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

                <div class='container text-center'>
                    <div class='row'>
                        <div class='col'>
                            <label>Records</label>
                            <input size='1' type='number' min='1' placeholder='1' value={records} onChange={(e) => setRecords(e.target.value)}></input>
                        </div>

                        <div class='col'>
                            <button type='send' class='btn btn-dark'>Generate query</button>
                        </div>

                        <div class='col'>
                            <img source={minus} alt='' />
                            <img source={plus} alt='' />
                        </div>
                    </div>
                </div>

            </form>

            <label>Number of fields</label>
                            <input size='1' type='number' min='1' placeholder='1' value={fieldN} onChange={(e) => updateFieldN(e)}></input> 

            <div>
                <a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by Anggara - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/minus" title="minus icons">Minus icons created by inkubators - Flaticon</a>
            </div>
        </div>

    );
}

export default Form;
import { React, useState } from 'react';
import '../styles/form.css';
import { GenericField } from '../models/genericField';
import FieldComponent from './field';
import TYPE from '../models/type.enum.js';
import { getBody } from '../utils/getBody';

const Form = () => {

    const [tableName, setTableName] = useState('');
    const [values, setValues] = useState([new GenericField(null, TYPE.CHAR, null, null, null, null, null)]);
    const [fieldN, setFieldN] = useState(1);
    const [records, setRecords] = useState(1);
    const [control, setControl] = useState(false);
    const [query, setQuery] = useState('');

    const updateFieldN = (n) => {
        let count = fieldN + n;
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

    const postQuery = async () => {

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: getBody(values)
        };

        const response = await fetch('http://localhost:8080/api/v1/populator/?recordsNumber=' + records +
                '&tableName=' + tableName, requestOptions)
            .then(response => response.text())
            //.then(data => data.split('\n'))
            .then(data => setQuery(data));

        console.log(query);
    }

    return (
        <div className='mainBox'>

            <form name='sqlOptions' method='post'
                onSubmit={(e) => {
                    e.preventDefault();
                    postQuery(values);
                }}>

                <div id='table_name'>
                    <label>Table name</label>
                    <input type='text' name='table_name' required={true} 
                        autoComplete='off' onChange={(e) => setTableName(e.target.value)}></input>
                </div>

                <div className='container text-center' id='box'>
                    {
                        values.map((v, i) => {
                            return <FieldComponent key={i} field={v} i={i} update={updateValues} />
                        })
                    }
                </div>

                <div className='container text-center'>
                    <div className='row'>
                        <div className='col-2 text-left'>
                            <label>Records</label>
                            <input size='1' type='number' min='1' max='100' placeholder='1' value={records} 
                                    onChange={(e) => setRecords(e.target.value)}></input>
                        </div>

                        <div className='col-8'>
                            <button type='send' className='btn btn-dark'>Generate query</button>
                        </div>

                        <div className='col-2 row'>
                            {
                                fieldN > 1 && <div className='button' id='minus' onClick={() => updateFieldN(-1)} />
                            }

                            <div className='button' id='plus' onClick={() => updateFieldN(+1)} />
                        </div>
                    </div>
                </div>

            </form>

            {
                query !== '' &&
                <div id='query'>
                    {query}
                </div>
            }

        </div>

    );
}

export default Form;
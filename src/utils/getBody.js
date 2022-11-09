export const getBody = (values) => {

    let genericTypes = ['CHAR', 'SMALL_INT', 'INTEGER', 'BIG_INT', 'MONEY', 'BOOLEAN', 'UUID'];
    let textTypes = ['VARCHAR', 'TEXT'];
    let enumType = ['ENUM'];
    let dateTypes = ['DATE', 'TIME', 'TIMESTAMP'];

    let body = '['

    for (let i = 0; i < values.length; i++) {
        let object = '{ "name": "' + values[i].name + '",' +
            '"type":"' + values[i].type + '"';

        if (genericTypes.includes(values[i].type)) {
            object += '},';
        }

        if (textTypes.includes(values[i].type)) {
            object += ',';
            if (values[i].length !== '0' && values[i].length !== null) {
                object += '"length":"' + values[i].length + '",';
            }

            if (values[i].varcharType === null){
                object += '"varcharType":"FIRST_NAME"},';
            } else {
                object += '"varcharType":"' + values[i].varcharType + '"},';
            }
        }

        if (enumType.includes(values[i].type)) {
            let enum_items = '[';
            for (let j = 0; j < values[i].items.length; j++) {
                enum_items += '"' + values[i].items[j] + '"';
                if (j !== values[i].items.length - 1) {
                    enum_items += ',';
                }
            }
            enum_items += ']';
            object += ',"items":' + enum_items + '},'
        }

        if (dateTypes.includes(values[i].type)) {
            object += ',"startDate":"' + values[i].startDate + '",';
            object += '"endDate":"' + values[i].endDate + '"},';
        }

        body += object;
    }

    body = body.substring(0, body.length - 1) + ']';
    return body;
}
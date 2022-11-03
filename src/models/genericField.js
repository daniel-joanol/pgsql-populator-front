export class GenericField {
    name = '';
    type = '';
    length = null;
    varcharType = '';
    items = [''];
    startDate = '';
    endDate = '';

    constructor(name, type, length, varcharType, items, startDate, endDate) {
        this.name = name;
        this.type = type;
        this.length = length;
        this.varcharType = varcharType;
        this.items = items;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
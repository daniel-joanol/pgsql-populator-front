export class TextType {
    name = '';
    type = '';
    length = null;
    varcharType = '';

    constructor(name, type, length, varcharType) {
        this.name = name;
        this.type = type;
        this.length = length;
        this.varcharType = varcharType;
    }
}
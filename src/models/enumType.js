export default class EnumType {
    name = '';
    type = '';
    items = [];

    constructor(name, type, items) {
        this.name = name;
        this.type = type;
        this.items = items;
    }
}
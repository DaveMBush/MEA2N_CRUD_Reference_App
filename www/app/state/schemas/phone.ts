import {Schema} from "normalizr";

const phone = new Schema('phones',{
    idAttribute: '_id'
});

export default phone;
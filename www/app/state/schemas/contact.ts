import {Schema, arrayOf} from 'normalizr';
import phone from './phone';


const contact = new Schema('contacts',{
    idAttribute: '_id'
});

contact.define({phones: arrayOf(phone)});

export default contact;
import {Phone} from "./Phone";

export interface Contact {
    _id: string;
    name: string;
    sex: string;
    dob: Date;
    phones?: Array<Phone>
}
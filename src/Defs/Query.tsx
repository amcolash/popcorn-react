import * as Order from './Order';
import { Type } from './Type';

export class Query {
    public keyword : string;
    public page : number;
    public sort : Order.OrderSort;
    public type : Type;
    public genre : string;
    public order : string;
    public random : boolean;
}
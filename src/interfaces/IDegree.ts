import IQuarter from "./IQuarter";

interface IDegree {
    degreeId: number;
    degreeName: string;
    quarters: IQuarter[];
}
export default IDegree;
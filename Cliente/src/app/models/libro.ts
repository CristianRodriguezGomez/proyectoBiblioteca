
export class Libro {
    id: number;
    titulo: string;
    autor: string;
    disponibles:number;
    editorial: string;
    area: string;

    constructor() {
        this.id = 0;
        this.titulo='';
        this.autor='';
        this.disponibles=0;
        this.editorial='';
        this.area=''

    }
}
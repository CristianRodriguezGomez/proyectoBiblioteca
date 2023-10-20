export class Prestamo {
    id: number;
    id_libro: number;
    id_estudiante: number;
    cantidadLibros: number;
    fechaPrestamo: string;
    horaPrestamo: string;
    observacion: string;
    horaDevolucion:string;
    comentarios: string
    constructor() {
        this.id = 0;
        this.id_libro= 0;
        this.id_estudiante= 0;
        this.cantidadLibros=1;
        this.fechaPrestamo='';
        this.horaPrestamo='';
        this.observacion='',
        this.horaDevolucion='';
        this.comentarios=''

    }
}
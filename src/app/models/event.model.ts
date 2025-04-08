export interface Event {
    id?: number;
    nom: string;
    description: string;
    date: Date;
    lieu: string;
    prix: number;
    placesDisponibles: number;
    organisateurId: number;
}
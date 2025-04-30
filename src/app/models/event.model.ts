export interface Event {
    id?: number;
    nom: string;
    description: string;
    date: Date | string;
    lieu: string;
    prix: number;
    placesDisponibles: number;
    organisateurId: number;
    imageUrl?: string;
}
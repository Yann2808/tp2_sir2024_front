export enum TicketStatut {
    EN_ATTENTE = 'EN_ATTENTE',
    PAYE = 'PAYE',
    UTILISE = 'UTILISE',
    ANNULE = 'ANNULE'
}

export interface Ticket {
    id?: number;
    dateAchat: string;
    prix: number;
    nbreTicket: number;
    statut: TicketStatut;
    qrCode: string;
    evenementId: number;
    acheteurId: number;
}
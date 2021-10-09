export interface IHaveId {
    id: string;
}

export interface Received extends IHaveId {
    id: string;

    userId: string;
    amountReceived: number;
    babat: string;
    client: Client;
    parvandeh: Parvandeh;
    dateReceived: Date | string;
    bank: string;
    cheque: Cheque;
}
export interface Client extends IHaveId {
    id: string;
    userId: string;
    name: string;
    nationalCode: string;

}

export interface Parvandeh extends IHaveId {
    id: string;
    title: string;
    shomareh: string;
    baygani: string;
    userId: string;
}

export interface Cheque extends IHaveId {
    id: string;
    userId: string;
    shomareh: string;
    chequeDate: Date | string;
    chequeBank: string;
    saderKonandeh: string;
}

export interface ReceivedListVm {
        id: string;
        userId: string;
        amountReceived: number;
        babat: string;
        client: MiniClient;
        parvandeh: MiniParvandeh;
        dateReceived: Date | string;
        bank: string;
    }

    export interface MiniClient {
        id: string;
        name: string;
        nationalCode: string;
    }

    export interface MiniParvandeh {
        id: string;
        title: string;
    }


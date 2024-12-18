export interface iCar {
    id: string;
    name: string;
    userId: string;
    photoUrl?: string;
    weight?: number;
}

export interface iHeatResult {
    carId: string;
    place: number;
    points: number;
}

export interface iHeat {
    roundOrder: number;
    name: string;
    cars: iCar[];
    results: iHeatResult[]
}

export interface iRound {
    id: string;
    order: number;
    name: string;
    heats: iHeat[];
    cars: iCar[];
}

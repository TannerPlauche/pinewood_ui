import { useEffect, useState } from "react";
import { iCar, iHeat, iRound } from "../../types";
import Round from "../round/Round";

const Styles = {
    bracket: {
        maxHeight: '100vh'
    },
    round: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
    }
}

export default function Bracket() {

    useEffect(() => {
        if (cars?.length) {
            const heats = buildHeats(cars);
            console.log('heats: ', heats);
            const round = buildRound(heats);
            setRoundsData([round]);
        }
    }, []);

    const cars = [
        {
            id: '1231',
            name: 'car 1',
            userId: '123',
        },
        {
            id: '1232',
            name: 'car 2',
            userId: '123',
        },
        {
            id: '1233',
            name: 'car 3',
            userId: '123',
        },
        {
            id: '1234',
            name: 'car 4',
            userId: '123',
        },
        {
            id: '1235',
            name: 'car 5',
            userId: '123',
        },
        {
            id: '1236',
            name: 'car 6',
            userId: '123',
        },
        {
            id: '1237',
            name: 'car 7',
            userId: '123',
        },
        {
            id: '1238',
            name: 'car 8',
            userId: '123',
        },
        {
            id: '1239',
            name: 'car 9',
            userId: '123',
        },
        // {
        //     id: '12310',
        //     name: 'car 10',
        //     userId: '123',
        // },
        // {
        //     id: '12311',
        //     name: 'car 11',
        //     userId: '123',
        // },
        // {
        //     id: '12312',
        //     name: 'car 12',
        //     userId: '123',
        // },
    ]

    const rounds: iRound[] = [
        {
            id: '123',
            order: 1,
            name: 'Round One',
            cars: [],
            heats: [
                {
                    roundOrder: 1,
                    name: 'Heat 1',
                    cars: [
                        {
                            id: '1231',
                            name: 'car 1',
                            userId: '123',
                        },
                        {
                            id: '1232',
                            name: 'car 2',
                            userId: '123',
                        },
                        {
                            id: '1233',
                            name: 'car 3',
                            userId: '123',
                        },
                        {
                            id: '1234',
                            name: 'car 4',
                            userId: '123',
                        },
                    ],
                    results: [],
                },
                {
                    roundOrder: 2,
                    name: 'Heat 2',
                    cars: [
                        {
                            id: '1235',
                            name: 'car 5',
                            userId: '123',
                        },
                        {
                            id: '1236',
                            name: 'car 6',
                            userId: '123',
                        },
                        {
                            id: '1237',
                            name: 'car 7',
                            userId: '123',
                        },
                        {
                            id: '1238',
                            name: 'car 8',
                            userId: '123',
                        },
                    ],
                    results: [],
                },
                {
                    roundOrder: 3,
                    name: 'Heat 3',
                    cars: [
                        {
                            id: '1239',
                            name: 'car 9',
                            userId: '123',
                        },
                        {
                            id: '12310',
                            name: 'car 10',
                            userId: '123',
                        },
                        {
                            id: '12311',
                            name: 'car 11',
                            userId: '123',
                        },
                        {
                            id: '12311',
                            name: 'car 12',
                            userId: '123',
                        },
                    ],
                    results: [],
                }
            ]
        },

    ];

    const buildRound = (heats: any[], roundOrder?: number) => {
        const cars: any = heats.reduce((allCars, { cars }) => [...allCars, ...cars], []);
        const round = getBaseRound(Math.random().toString(), roundOrder || 1, `Round-1`, heats, cars);
        return round;
    }

    const buildHeats = (cars: iCar[], roundOrder: number): iHeat[] => {
        cars = cars.reverse();
        const groups = [];
        while (cars.length > 0) {
            console.log('cars count', cars.length);
            if (cars.length <= carsInHeat) {
                const heatSize = cars.length < carsInHeat ? cars.length : carsInHeat;
                const heat = cars.splice(0, heatSize);
                groups.push(heat);
            } else {
                const tempCars = [...cars];
                tempCars.splice(0, 4);
                const tempLength = tempCars.length;
                if (tempLength % carsInHeat === 1 || tempLength % carsInHeat === 2) {
                    const heat = cars.splice(0, 3);
                    groups.push(heat);
                } else {
                    const heatSize = cars.length < carsInHeat ? cars.length : carsInHeat;
                    const heat = cars.splice(0, heatSize);
                    groups.push(heat);
                }
            }
        }

        if (cars.length) {
            const heatSize = cars.length < carsInHeat ? cars.length : carsInHeat;
            const heat = cars.splice(0, heatSize);
            groups.push(heat);
        }

        const heats = groups
            .reverse()
            .map((group, index) => {
                const heat = getBaseHeat(roundOrder || 1, `Heat-${index + 1}`, group);
                return heat;
            })
        return heats;
    }

    const getBaseRound = (id: string, order: number, name: string, heats: iHeat[], cars: iCar[]): iRound => ({
        id,
        order,
        name,
        heats,
        cars
    });

    const getBaseHeat = (roundOrder: number, name: string, cars: iCar[]): iHeat => ({
        roundOrder,
        name,
        cars,
        results: [],
    });

    const carsInHeat = 4;
    const [roundsData, setRoundsData] = useState<iRound[]>([])

    const handleCompletedHeat = (heat: iHeat) => {
        console.log('got heat in bracket', heat);
        const roundOrder = heat.roundOrder;
        const nextRoundOrder = roundOrder + 1;

        let winningPlaces = [1, 2];
        if (heat.cars.length === 2) {
            winningPlaces = [1];
        }

        const winners = heat.results.filter(result => winningPlaces.includes(result.place));
        const winnerCarIds = winners.map(result => result.carId);
        const winnerCars: iCar[] = heat.cars.filter(car => winnerCarIds.includes(car.id));

        if (!roundsData.find(round => round.order === nextRoundOrder)) {
            addRound(nextRoundOrder, winnerCars);
        } else {
            console.log('Add cars to round')
            let nextRoundIndex = roundsData.findIndex((round) => round.order === nextRoundOrder);
            const nextRound = roundsData[nextRoundIndex];
            if (nextRound) {
                const carList = [...nextRound?.cars, ...winnerCars];
                const nextHeats = buildHeats(carList, nextRound.order);
                const updatedNextRound = buildRound(nextHeats, nextRound.order);
                roundsData[nextRoundIndex] = updatedNextRound;
                setRoundsData([...roundsData]);
            }
        }

        // TODO: GET LOSER CARS AND START LOSERS BRACKET

    }

    const addRound = (nextRoundOrder: number, cars: iCar[]) => {
        const newHeat = getBaseHeat(nextRoundOrder, 'Heat 1', cars);
        const heats = [newHeat];
        const newRound = getBaseRound(Math.random().toString(), nextRoundOrder, `Round ${nextRoundOrder}`, heats, cars);
        roundsData.push(newRound);
        setRoundsData([...roundsData]);
    };

    return (
        <div style={Styles.round}>
            {roundsData.map((round) =>
                <div>
                    <Round key={round.id} round={round} handleCompletedHeat={handleCompletedHeat} />
                </div>
            )
            }

        </div>
    );

}
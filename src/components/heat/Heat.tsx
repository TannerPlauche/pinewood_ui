import { SyntheticEvent, useEffect, useState } from "react"
import { iCar, iHeat, iHeatResult } from "../../types"

interface iheatProps {
    heat: iHeat;
    handleCompletedHeat: Function;
}

const Styles = {
    heatCar: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        border: '1px solid black',
        margin: '10px 10px 10px 0',
        width: 'fit-content'
    },
    carStyle: (index: number) => ({
        backgroundColor: index % 2 === 0 ? 'beige' : 'lightGray',
        padding: '10px',
        display: 'flex',
        paddingLeft: '10px',
        justifyContent: 'space-between',
        width: '140px'
    }),
    placeButton: () => ({
        height: '1.2rem',
        width: '1,2rem',
        margin: '0 3',
    }),

}

export default function Heat({ heat, handleCompletedHeat }: iheatProps) {
    const [disabledplaces, setDisabledplaces] = useState<number[]>([]);
    const [heatData, setHeatData] = useState<iHeat>(heat);
    const [complete, setComplete] = useState(false);
    const getPointsFromPlace = (place: number) => heat.cars.length + 1 - place;

    // set disabled rankings input
    useEffect(() => {
        const selectedPlaces = heatData.results
            .map(result => result.place)
            .filter(place => !!place);
        console.log('selectedPlaces: ', selectedPlaces);
        setDisabledplaces(selectedPlaces);
    }, [heatData]);

    useEffect(() => {
        completeHeat();
    }, [heatData]);

    const selectValue = (carId: string, event: SyntheticEvent) => {
        const place = parseInt((event.target as any).value)
        const car = heat.cars.find(car => car.id === carId) as iCar;
        const points = getPointsFromPlace(place);
        const result: iHeatResult = { ...car, carId: car?.id, points, place }

        const existingResultIndex = heatData.results.findIndex(result => result.carId === carId);
        if (existingResultIndex > -1) {
            heatData.results[existingResultIndex] = result
        } else {
            heatData.results.push(result);
        }

        setHeatData({ ...heatData });
    }

    const completeHeat = () => {
        const resultsSelected = heat.cars.length === heat.results.length;
        const allPlacesSelected = [...new Set(heat.results.map(result => result.place))].length === heat.cars.length;
        if (resultsSelected && allPlacesSelected) {
            console.log('HEAT COMPLETED');
            handleCompletedHeat(heat);
            setComplete(true);
        }
    }

    return (
        <div style={Styles.heatCar}>
            {heat.cars.map((car, index) => (
                <div key={car.id + '' + index} className="heat-car" style={Styles.carStyle(index)} >
                    <span className="car-name">{car.name}</span>
                    <div className="result-selection">
                        {heat.cars.length > 1 && <select
                            disabled={complete}
                            onChange={(value) => selectValue(car.id, value)}>
                            <option value="">Select</option>
                            {heat.cars.map((car, index) => {
                                return (
                                    <option key={'option-' + index + '-' + car.id} disabled={disabledplaces.includes(index + 1)} value={index + 1}>{index + 1}</option>
                                )
                            }
                            )}
                        </select>}
                        {
                            heat.cars.length === 1 && <h3>WINNER</h3>
                        }
                    </div>
                </div>
            ))
            }
        </div >
    )

}
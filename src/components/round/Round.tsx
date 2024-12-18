import { iHeat, iRound } from "../../types";
import Heat from "../heat/Heat";

interface iRoundProps {
    round: iRound;
    handleCompletedHeat: Function;
}

const Styles = {
    heat: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // height: '100%',
    }
}

export default function Round({ round, handleCompletedHeat }: iRoundProps) {

    const handleHeatCompletion = (heat: iHeat) => {
        console.log('got heat', heat);
        handleCompletedHeat(heat);
    }

    return (
        <>
            {round.heats.map((heat, index) => (
                <div style={Styles.heat}>
                    <Heat
                        key={heat.name + '-' + index}
                        heat={heat}
                        handleCompletedHeat={handleHeatCompletion} />
                </div>
            ))}
        </>
    )

}
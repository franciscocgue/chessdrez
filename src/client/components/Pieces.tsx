import React, { useContext } from "react";
import styles from './Pieces.module.css';
import GameContext from "../store/game-context";

import { ImRadioUnchecked } from 'react-icons/im';
import { ImRadioChecked2 } from 'react-icons/im';

interface Props {
    familyPrefix: string,
}

const Pieces = ({ familyPrefix }: Props) => {

    const gameCtx = useContext(GameContext);

    return <div className={styles.container}>
        <button
            onClick={e => { gameCtx.onFamilyChange(familyPrefix) }}
        >
            {gameCtx.familyPrefix === familyPrefix ? <ImRadioChecked2 /> : <ImRadioUnchecked />}
        </button>
        <div
            onClick={e => { gameCtx.onFamilyChange(familyPrefix) }}
            className={styles.pieces}
        >
            <img height={45} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}peonwhite.png`} />
            <img height={50} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}caballowhite.png`} />
            <img height={56} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}torrewhite.png`} />
            <img height={65} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}alfilwhite.png`} />
            <img height={72} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}reinawhite.png`} />
            <img height={79} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}reywhite.png`} />
            <img height={79} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}reyblack.png`} />
            <img height={72} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}reinablack.png`} />
            <img height={65} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}alfilblack.png`} />
            <img height={56} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}torreblack.png`} />
            <img height={50} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}caballoblack.png`} />
            <img height={45} src={`https://chessdrez.s3.eu-central-1.amazonaws.com/pieces/${familyPrefix}peonblack.png`} />
        </div>
    </div>
}

export default Pieces;
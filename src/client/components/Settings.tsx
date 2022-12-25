import React, { useState, useContext } from 'react';
import styles from './Settings.module.css';
import Pieces from './Pieces';

import GameContext from '../store/game-context';

import { GoDeviceMobile } from 'react-icons/go';
import { MdComputer } from 'react-icons/md';
import { MdOutlineExpandLess } from 'react-icons/md';
import { MdOutlineExpandMore } from 'react-icons/md';
import { IoMdOptions } from 'react-icons/io';
import { MdHelpOutline } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaChess } from 'react-icons/fa';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { ImCheckboxChecked } from 'react-icons/im';

const Settings = () => {

    const gameCtx = useContext(GameContext);

    return (
        <div className={styles.container}>
            <div className={styles['info-config']}>
                <div>
                    <div className={styles['help']}>
                        <div className={styles['icon']}><MdHelpOutline /></div>
                        <div className={styles['help-instructions']}>
                            <p><span><GoDeviceMobile /> <AiOutlineArrowRight /></span> Tap once to select piece, tap again to move!</p>
                            <p><span><MdComputer /> <AiOutlineArrowRight /></span> Either tap, or click and drag!</p>
                        </div>
                    </div>
                    <div className={styles.config}>
                        <div className={styles['icon']}><IoMdOptions /></div>
                        <div className={styles['config-options']}>
                            <div>
                                <button
                                    className={styles.checkbox}
                                    onClick={e => { gameCtx.onToggleShadow() }}
                                >
                                    {gameCtx.shadowEnabled ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                                </button>
                                <span className={styles.pointer} onClick={e => { gameCtx.onToggleShadow() }}>Display legal moves</span>
                            </div>
                            <div>
                                <button
                                    className={styles.checkbox}
                                    onClick={e => { gameCtx.onToggleLastMove() }}
                                >
                                    {gameCtx.showLastMove ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                                </button>
                                <span className={styles.pointer} onClick={e => { gameCtx.onToggleLastMove() }}>Display last move</span>
                            </div>
                            {/* <label className={styles['label-help']} title='Highlight possible moves' ><input id='shadowToggle' name='shadowToggle' type={'checkbox'} onChange={() => gameCtx.onToggleShadow()} /> Show legal moves</label> */}
                            {/* <label className={styles['label-help']} title='Highlight possible moves' ><input id='shadowToggle' name='shadowToggle' type={'checkbox'} onChange={() => gameCtx.onToggleLastMove()} /> Show last move</label> */}
                        </div>
                    </div>
                    <div className={styles['container-families']}>
                        <div className={styles['icon']}><FaChess /></div>
                        <div>
                            <Pieces familyPrefix='f1_' />
                            <Pieces familyPrefix='f2_' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Settings;
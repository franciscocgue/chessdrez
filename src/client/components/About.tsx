import React from 'react';
import styles from './About.module.css';
import { BsGithub } from 'react-icons/bs';
import { FaChessBoard } from 'react-icons/fa';
import { FaRobot } from 'react-icons/fa';
import { MdMobileFriendly } from 'react-icons/md';
import { AiFillSetting } from 'react-icons/ai';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import Dialogue from './ui/Dialogue';
import peonIcon from '../assets/peon.png';
import logo from '../assets/chess_logo.png';

const About = () => {

    return (
        <div className={styles.container}>
            <div className={styles.dialogues}>
                <Dialogue icon={logo} iconSide='left' key={1}><div>
                    <p style={{ margin: '0' }}>Hey there!</p>
                    <p style={{ margin: '5px 0 0 0' }}>Welcome to <i>Chessdrez</i></p>
                </div></Dialogue>

                <Dialogue icon={peonIcon} iconSide='right' key={2}><p style={{ margin: '0' }}>Welcome to... what?</p></Dialogue>

                <Dialogue icon={logo} iconSide='left' key={3}><div>
                    <p style={{ margin: '0' }}><i>Chessdrez</i> is a hobby project to test and learn new things: everything is handmade</p>
                </div></Dialogue>

                <Dialogue icon={peonIcon} iconSide='right' key={4}><p style={{ margin: '0' }}>Handmade as in Vanilla JS?</p></Dialogue>

                <Dialogue icon={logo} iconSide='left' key={5}><div>
                    <p style={{ margin: '0' }}>Well, not <i>that</i> handmade. It is built on top of <a target={'_blank'} href='https://es.reactjs.org/'>React</a> and <a target={'_blank'} href='https://nodejs.org/en/'>Node</a> (<a target={'_blank'} href='https://expressjs.com/'>Express</a>).</p>
                </div></Dialogue>

                <Dialogue icon={peonIcon} iconSide='right' key={6}><p style={{ margin: '0' }}>I see. But you still use helpers like <a target={'_blank'} href='https://create-react-app.dev/'>CRA</a> or other libraries, right?</p></Dialogue>

                <Dialogue icon={logo} iconSide='left' key={7}><div>
                    <p style={{ margin: '0' }}>Nope, that is the point. Instead of CRA, the project is configured with <a href='https://webpack.js.org/' target={'_blank'}>webpack</a>. Instead of using existing libraries for the Chess engine / logic, it is coded from null. Same for the Chess display.</p>
                </div></Dialogue>

                <Dialogue icon={peonIcon} iconSide='right' key={8}><p style={{ margin: '0' }}>Hmm interesting, so instead of aiming at having a great game, you are using this as a <i>playground</i> to test and learn stuff.</p></Dialogue>

                <Dialogue icon={logo} iconSide='left' key={9}><div>
                    <p style={{ margin: '0' }}>Exactly! And new features are still being added, last one being "AI game" so we can play against the machine.</p>
                </div></Dialogue>

                <Dialogue icon={peonIcon} iconSide='right' key={10}><p style={{ margin: '0' }}>Cool! What about the hosting?</p></Dialogue>

                <Dialogue icon={logo} iconSide='left' key={11}><div>
                    <p style={{ margin: '0' }}>The application is hosted in AWS, using <a href='https://aws.amazon.com/ec2/' target={'_blank'}>EC2</a>. Just for <i>fun</i> there is also a Load Balancer. And images come from an <a href='https://aws.amazon.com/s3/' target={'_blank'}>S3</a> bucket.</p>
                </div></Dialogue>

                <Dialogue icon={peonIcon} iconSide='right' key={12}><p style={{ margin: '0' }}>One last question, what is already available?</p></Dialogue>

                <Dialogue icon={logo} iconSide='left' key={13}><div>
                    <p style={{ margin: '0' }}>Hmm let me list the main points:</p>
                    <ul style={{ listStyleType: 'none' }}>
                        <li style={{ marginBottom: '0.4rem' }}>
                            <span style={{color:'green'}}><FaChessBoard /></span> Mode "Device as Board" <p style={{ margin: '0 0 0 2rem' }}>➟ simply use your computer, tablet or phone as a chess board!</p>
                        </li>
                        <li style={{ marginBottom: '0.4rem' }}>
                            <span style={{color:'green'}}><FaRobot /></span> Mode "Beat the Machine"<p style={{ margin: '0 0 0 2rem' }}>➟ play against our AI (nothing fancy, just derived from game theory for zero-sum games)</p>
                        </li>
                        <li style={{ marginBottom: '0.4rem' }}>
                            <span style={{color:'green'}}><MdMobileFriendly /></span> Responsive design<p style={{ margin: '0 0 0 2rem' }}>➟ the <i>intention</i> is that the application shows smoothly on any device</p>
                        </li>
                        <li style={{ marginBottom: '0.4rem' }}>
                            <span style={{color:'green'}}><AiFillSetting /></span> Settings<p style={{ margin: '0 0 0 2rem' }}>➟ customize how you want the board and pieces to look!</p>
                        </li>
                    </ul>
                </div></Dialogue>

                <Dialogue icon={peonIcon} iconSide='right' key={14}><p style={{ margin: '0' }}>Ok, ok, <i>this</i> is the last question: how do I access the code?</p></Dialogue>


                <Dialogue icon={logo} iconSide='left' key={15}><div>
                    <p style={{ margin: '0' }}>Right, you can check the code in the Github repo: <a target='_blank' href='https://github.com/franciscocgue/chessdrez'><BsGithub /> Chessdrez</a></p>
                </div></Dialogue>
            </div>

            <button onClick={e => {window.scrollTo({ top: 0, behavior: 'smooth' });}} className={styles['btn-scroll']}><BsFillArrowUpSquareFill/></button>

            {/* <p>December 2022</p>
            <p>1. Section "Features" added</p>
            <p>2. Check to king highlighted in red</p>
            <p>3. AI decides best move with MINIMAX algorithm (missing: actual move; option to enable / disable; alpha-bety prune for better algorithm speed)</p>
            <p>4. Can select "family" of pieces on board</p> */}
        </div>
    )
}

export default About; 
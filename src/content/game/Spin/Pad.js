import react, { useEffect, useState } from 'react'
import { Box, styled, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import './pad.css'
import $ from 'jquery'
let bankValue = 1000;
let currentBet = 0;
let wager = 5;
let lastWager = 0;
let bet = [];
let numbersBet = [];
let previousNumbers = [];

let numRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
let wheelnumbersAC = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32];
let wheelDeg = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',];
let wheel;
let ballTrack;

function Pad({prizeNumber}) {
    const [score, setScore] = useState('');
    useEffect(() => {
        let wheel = document.getElementsByClassName('wheel')[0];
        let ballTrack = document.getElementsByClassName('ballTrack')[0];
        spin(prizeNumber);
        function spinWheel(winningSpin) {
            let arr = ['-2880deg', '-3019deg', '-3182deg', '-2900deg', '-3201deg', '-3057deg', '-3143deg',
                '-2940deg', '-3087deg', '-2980deg', '-3067deg', '-3105deg', '-2921deg', '-3125deg',
                '-3000deg', '-3221deg', '-3038deg', '-3162deg', '-2960deg', '-3210deg', '-3009deg',
                '-3192deg', '-2969deg', '-3077deg', '-3048deg', '-3172deg', '-2890deg', '-3134deg',
                '-2930deg', '-2950deg', '-3096deg', '-2990deg', '-3230deg', '-3028deg', '-3153deg',
                '-2909deg', '-3115deg']
            let warr = ['2880deg', '3019deg', '3182deg', '2900deg', '3201deg', '3057deg', '3143deg',
                '2940deg', '3087deg', '2980deg', '3067deg', '3105deg', '2921deg', '3125deg',
                '3000deg', '3221deg', '3038deg', '3162deg', '2960deg', '3210deg', '3009deg',
                '3192deg', '2969deg', '3077deg', '3048deg', '3172deg', '2890deg', '3134deg',
                '2930deg', '2950deg', '3096deg', '2990deg', '3230deg', '3028deg', '3153deg',
                '2909deg', '3115deg']
            for (let i = 0; i < wheelnumbersAC.length; i++) {
                // if (wheelnumbersAC[i] == winningSpin) {
                //     var degree = wheelDeg[winningSpin] ;
                //     console.log(wheelDeg[winningSpin], winningSpin, wheelnumbersAC[i], i);
                if (wheelnumbersAC[i] == winningSpin) {
                    var degree = arr[winningSpin];
                    var tdegree = warr[winningSpin];
                }
            }
            let str = '@keyframes wheelRotate {from {transform: rotate(0deg);}to {transform: rotate(3590deg);}}'
            ballTrack.style.cssText = 'transform: rotateZ(' + degree + '); transition: transform 17s ease-out;';
            document.getElementsByClassName('wheel')[0].style.cssText = 'transform: rotateZ(' + tdegree + '); transition: transform 15s ease-out;';
            setTimeout(function(){
                if(prizeNumber != -1)
                setScore(prizeNumber.toString());
            }, 18000);
        }
        function spin(winningSpin) {
            spinWheel(winningSpin);
        }
    })
    return (
        <>
            <div id="container">
                <h1>Score: {score}</h1>
                <div className="wheel">
                    <div className="outerRim"></div>
                    <div id="sect1" className="sect">
                        <span className="single">0</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect2" className="sect">
                        <span className="double">32</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect3" className="sect">
                        <span className="double">15</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect4" className="sect">
                        <span className="double">19</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect5" className="sect">
                        <span className="single">4</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect6" className="sect">
                        <span className="double">21</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect7" className="sect">
                        <span className="single">2</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect8" className="sect">
                        <span className="double">25</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect9" className="sect">
                        <span className="double">17</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect10" className="sect">
                        <span className="double">34</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect11" className="sect">
                        <span className="single">6</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect12" className="sect">
                        <span className="double">27</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect13" className="sect">
                        <span className="double">13</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect14" className="sect">
                        <span className="double">36</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect15" className="sect">
                        <span className="double">11</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect16" className="sect">
                        <span className="double">30</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect17" className="sect">
                        <span className="single">8</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect18" className="sect">
                        <span className="double">23</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect19" className="sect">
                        <span className="double">10</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect20" className="sect">
                        <span className="single">5</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect21" className="sect">
                        <span className="double">24</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect22" className="sect">
                        <span className="double">16</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect23" className="sect">
                        <span className="double">33</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect24" className="sect">
                        <span className="single">1</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect25" className="sect">
                        <span className="double">20</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect26" className="sect">
                        <span className="double">14</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect27" className="sect">
                        <span className="double">31</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect28" className="sect">
                        <span className="single">9</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect29" className="sect">
                        <span className="double">22</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect30" className="sect">
                        <span className="double">18</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect31" className="sect">
                        <span className="double">29</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect32" className="sect">
                        <span className="single">7</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect33" className="sect">
                        <span className="double">28</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect34" className="sect">
                        <span className="double">12</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect35" className="sect">
                        <span className="double">35</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect36" className="sect">
                        <span className="single">3</span>
                        <div className="block"></div>
                    </div>
                    <div id="sect37" className="sect">
                        <span className="double">26</span>
                        <div className="block"></div>
                    </div>
                    <div className="pocketsRim"></div>
                    <div className="ballTrack">
                        <div className="ball"></div>
                    </div>
                    <div className="pockets"></div>
                    <div className="cone"></div>
                    <div className="turret"></div>
                    <div className="turretHandle">
                        <div className="thendOne"></div>
                        <div className="thendTwo"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pad;

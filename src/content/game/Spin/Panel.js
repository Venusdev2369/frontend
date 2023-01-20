
import react, { useEffect, useState } from 'react';
import './panel.css';
import $ from 'jquery'
var active = true,
    selectors = {
        roulette: '.roulette',
        num: '.num',
        sector: '.sector',
        table_btns: '.controlls .btn'
    },
    classes = {
        red: 'red',
        black: 'black',
        green: 'green',
        hover: 'hover',
        toggle: 'sel'
    },
    numbers = {
        red: [],
        black: [],
        green: []
    },
    sectors = {
        '1': [], // 1st row
        '2': [], // 2nd row
        '3': [], // 3rd row
        '4': [], // 1st 12
        '5': [], // 2nd 12
        '6': [], // 3rd 12
        '7': [], // 1 to 18
        '8': [], // EVEN
        '9': [], // RED
        '10': [], // BLACK
        '11': [], // ODD
        '12': [], // 19 to 36
    },
    sector_index = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26],
    table_nums = {},
    table_sectors = {};
var chips = new Array(48);
var squares = new Array(48);
var hovering = 0;
function Panel() {
    useEffect(() => {
        $(selectors.table_btns).hover(
            function (e) {
                hovering = 1;
                e.stopImmediatePropagation();
                if (active) {
                    var $this = $(this),
                        cells = getButtonCells($this);
                    for (var i = 0, len = cells.length; i < len; i++) {
                        cells[i].addClass(classes.hover);
                    }
                    var sector = $this.data('sector');
                    if (sector) {
                        table_sectors[sector].addClass(classes.hover);
                    }
                }
            },
            function (e) {
                e.stopImmediatePropagation();
                hovering = 0;
                var $this = $(this),
                    cells = getButtonCells($this);
                for (var i = 0, len = cells.length; i < len; i++) {
                    cells[i].removeClass(classes.hover);
                }
                var sector = $this.data('sector');
                if (sector) {
                    table_sectors[sector].removeClass(classes.hover);
                }
            }
        ).mousedown(function (e) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            var numbers = [];
            var $this = $(this),
                cells = getButtonCells($this);
            for (var i = 0, len = cells.length; i < len; i++) {
                cells[i].toggleClass(classes.toggle);
            }
            var sector = $this.data('sector');
            if (sector) {
                table_sectors[sector].toggleClass(classes.toggle);
            }
            e.preventDefault();
            if (typeof $(this).data('sector') != 'undefined') {
                numbers = $(this).data('sector')
                for (var ind = 0; ind < 12; ind++) {

                    $('#sect' + (sector_index.indexOf(Number(ind * 3 + (4 - Number(numbers)))) + 1) + ' .block').toggleClass('gpan');
                }
                if (e.button == 2) ChangeBet(36 + $(this).data('sector'), -1);
                else ChangeBet(36 + $(this).data('sector'), +1);
            }
            else {
                numbers = $(this).data('num');
                if (typeof numbers.length === 'undefined') numbers = [numbers];
                else numbers = numbers.split(',');
                numbers.map((el) => {
                    $('#sect' + (sector_index.indexOf(Number(el)) + 1) + ' .block').toggleClass('gpan');
                })
                numbers = $(this).data('num');
                if (e.button == 2) ChangeBet(numbers, -1);
                else ChangeBet(numbers, +1);
            }
        });
        $(selectors.num).each(function () {
            var $this = $(this),
                color,
                num = Number($this.text());
            // add to instances array
            table_nums[num] = $this;
            // add to colors array
            for (color in numbers) {
                if ($this.hasClass(classes[color])) {
                    numbers[color].push(num);
                    $this.data('color', color);
                }
            }
        })

        $(selectors.sector).each(function () {
            var $this = $(this),
                color;
            if ($this.hasClass(classes.red)) {
                color = 'red';
            } else if ($this.hasClass(classes.black)) {
                color = 'black';
            } else {
                color = 'sector';
            }
            $this.data('color', color);
            table_sectors[$this.data('sector')] = $this;
        });
        for (var color in numbers) {
            numbers[color].sort(function (a, b) { return a - b; });
        }
        for (var i = 1; i <= 36; i++) {
            sectors[i] = []
        }
        for (i = 1; i <= 36; i++) {
            // 1st row, 2nd row, 3rd row
            switch (i % 3) {
                case 0:
                    sectors['1'].push(i);
                    break;
                case 1:

                    sectors['3'].push(i);
                    break;
                case 2:
                    sectors['2'].push(i);
                    break;
            }

            // 1st 12, 2nd 12, 3rd 12
            if (i <= 12) {
                sectors['4'].push(i);
            } else if (i <= 24) {
                sectors['5'].push(i);
            } else {
                sectors['6'].push(i);
            }

            // 1 to 18, 19 to 36
            if (i <= 18) {
                sectors['7'].push(i);
            } else {
                sectors['12'].push(i);
            }

            // ODD, EVEN
            if (i % 2) {
                sectors['11'].push(i);
            } else {
                sectors['8'].push(i);
            }

            if (numbers.red.indexOf(i) != -1) {
                sectors['9'].push(i);
            } else if (numbers.black.indexOf(i) != -1) {
                sectors['10'].push(i);
            }
        }
    })
    
    const getButtonCells = (btn) => {
        var cells = btn.data('cells');
        if (!cells || !cells.length) {
            cells = [];
            switch (btn.data('type')) {
                case 'sector':
                    var nums = sectors[btn.data('sector')];
                    for (var i = 0, len = nums.length; i < len; i++) {
                        cells.push(table_nums[nums[i]]);
                    }
                    return cells;
                    break;
                case 'num':
                default:
                    nums = String(btn.data('num')).split(',');
                    for (i = 0, len = nums.length; i < len; i++) {
                        cells.push(table_nums[nums[i]]);
                    }
                    btn.data('cells', cells)
                    return btn.data('cells');
                    break;
            }
        }
        return cells;
    };
    function rInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    document.getScroll = function () {
        if (window.pageYOffset != undefined) {
            return [pageXOffset, pageYOffset];
        } else {
            var sx, sy, d = document,
                r = d.documentElement,
                b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            return [sx, sy];
        }
    }
    function ChangeBet(id, amount) {
        var divs = document.getElementsByTagName("div");
        var darr = [];
        darr = document.getScroll();
        for (var i = 0; i < divs.length; i++) {
            var attr = divs[i].getAttribute("data-num");
            if (attr == null) {
                attr = divs[i].getAttribute("data-sector");
                if (attr == null) continue;
                var index = 36 + parseInt(attr);

                var rekt = divs[i].getBoundingClientRect();
                squares[index] = new Array(2);
                squares[index][1] = rekt.top + darr[1];
                squares[index][0] = rekt.left + darr[0];
            } else {
                rekt = divs[i].getBoundingClientRect();
                squares[attr] = new Array(2);
                squares[attr][1] = rekt.top + darr[1];
                squares[attr][0] = rekt.left + darr[0];
            }

        }
        if (amount > 0) {
            var img = document.createElement('img');
            img.src = "/static/images/coin/chip1.png";
            img.style.zIndex = "0";
            img.style.position = "absolute";

            var rX = rInt(-8, 8);
            var rY = rInt(-8, 8);
            var mv;
            var dx = 0;
            if (typeof id == "number" && id > 0 && $("div[data-num='" + id + "'").parent().parent().attr('class'))
                dx = $("div[data-num='" + id + "'").parent().parent().attr('class').match(/\d+/)[0];
            dx = (typeof Number(dx) == 'number') ? Number(dx) / 2 : 0;

            if ($("div[data-num='" + id + "'").hasClass("cm"))
                mv = 'm';
            else if ($("div[data-num='" + id + "'").hasClass("cv"))
                mv = 'v';

            rX = 0;
            rY = 0;
            if (typeof id == "number") {
                if (chips[id] == null) {
                    rX = 12;
                    rY = 18;
                }
                else {
                    rX = 12;
                    rY = 18 - chips[id].length;
                }

            }
            else {

                if (chips[id] == null && id.split(',').length == 2 && mv == 'v') {
                    rX = -8;
                    rY = 11;
                }
                else if (id.split(',').length == 2 && mv == 'v') {
                    rX = -8;
                    rY = 11 - chips[id].length;
                }
                else if (chips[id] == null && id.split(',').length == 2 && mv == 'm') {
                    rX = 2;
                    rY = 0;
                }
                else if (id.split(',').length == 2 && mv == 'm') {
                    rX = 2;
                    rY = -chips[id].length;
                }
                if (chips[id] == null && id.split(',').length == 3 && mv == "v") {
                    rX = -8;
                    rY = 0;
                }
                else if (id.split(',').length == 3 && mv == "v") {
                    rX = -8;
                    rY = -chips[id].length;
                }
                else if (chips[id] == null && id.split(',').length == 3 && mv == "m") {
                    rX = 2;
                    rY = 0;
                }
                else if (id.split(',').length == 3 && mv == "m") {
                    rX = 2;
                    rY = -chips[id].length;
                }
                if (chips[id] == null && id.split(',').length == 4) {
                    rX = -8;
                    rY = 0;
                }
                else if (id.split(',').length == 4) {
                    rX = -8;
                    rY = -chips[id].length;
                }
                if (chips[id] == null && id.split(',').length == 6) {
                    rX = -8;
                    rY = 0;
                }
                else if (id.split(',').length == 6) {
                    console.log("d")
                    rX = -8;
                    rY = -chips[id].length;
                }
            }
            img.style.left = (squares[id][0] + (rX)) + "px";
            img.style.top = (squares[id][1] + rY) + "px";
            img.style.width = "20px";
            img.style.pointerEvents = "none";
            img.style.zIndex = 9999;

            document.body.appendChild(img);

            if (chips[id] == null) chips[id] = new Array(0);
            chips[id].push(img);
        } if (amount < 0 && chips[id] != null && chips[id].length > 0) document.body.removeChild(chips[id].pop());

    }

    sectors = [
        "3rd column",
        "2nd column",
        "1st column",
        "1st 12",
        "2nd 12",
        "3rd 12",
        "1 to 18",
        "Even",
        "Red",
        "Black",
        "Odd",
        "19 to 36"
    ];
    document.oncontextmenu = function () { return false; };
    return (
        <div className="roulette">
            <table>
                <tr className="nums">
                    <td className="num green zero" rowSpan="3"><span>0</span></td>
                    <td className="num red"><span>3</span></td>
                    <td className="num black"><span>6</span></td>
                    <td className="num red"><span>9</span></td>
                    <td className="num red"><span>12</span></td>
                    <td className="num black"><span>15</span></td>
                    <td className="num red"><span>18</span></td>
                    <td className="num red"><span>21</span></td>
                    <td className="num black"><span>24</span></td>
                    <td className="num red"><span>27</span></td>
                    <td className="num red"><span>30</span></td>
                    <td className="num black"><span>33</span></td>
                    <td className="num red"><span>36</span></td>
                    <td className="sector" data-sector="1"><span className="vt">2 : 1</span></td>
                </tr>
                <tr className="nums">
                    <td className="hidden"></td>
                    <td className="num black"><span>2</span></td>
                    <td className="num red"><span>5</span></td>
                    <td className="num black"><span>8</span></td>
                    <td className="num black"><span>11</span></td>
                    <td className="num red"><span>14</span></td>
                    <td className="num black"><span>17</span></td>
                    <td className="num black"><span>20</span></td>
                    <td className="num red"><span>23</span></td>
                    <td className="num black"><span>26</span></td>
                    <td className="num black"><span>29</span></td>
                    <td className="num red"><span>32</span></td>
                    <td className="num black"><span>35</span></td>
                    <td className="sector" data-sector="2"><span className="vt">2 : 1</span></td>
                </tr>
                <tr className="nums">
                    <td className="hidden"></td>
                    <td className="num red"><span>1</span></td>
                    <td className="num black"><span>4</span></td>
                    <td className="num red"><span>7</span></td>
                    <td className="num black"><span>10</span></td>
                    <td className="num black"><span>13</span></td>
                    <td className="num red"><span>16</span></td>
                    <td className="num red"><span>19</span></td>
                    <td className="num black"><span>22</span></td>
                    <td className="num red"><span>25</span></td>
                    <td className="num black"><span>28</span></td>
                    <td className="num black"><span>31</span></td>
                    <td className="num red"><span>34</span></td>
                    <td className="sector" data-sector="3"><span className="vt">2 : 1</span></td>
                </tr>
                <tr>
                    <td className="empty"></td>
                    <td colSpan="4" className="sector" data-sector="4">1st 12</td>
                    <td colSpan="4" className="sector" data-sector="5">2nd 12</td>
                    <td colSpan="4" className="sector" data-sector="6">3rd 12</td>
                    <td className="empty"></td>
                </tr>
                <tr>
                    <td className="empty"></td>
                    <td colSpan="2" className="sector" data-sector="7">1 to 18</td>
                    <td colSpan="2" className="sector" data-sector="8">EVEN</td>
                    <td colSpan="2" className="sector red" data-sector="9">RED</td>
                    <td colSpan="2" className="sector black" data-sector="10">BLACK</td>
                    <td colSpan="2" className="sector" data-sector="11">ODD</td>
                    <td colSpan="2" className="sector" data-sector="12">19 to 36</td>
                    <td className="empty"></td>
                </tr>
            </table>
            <div className="controlls">
                <div className="btn btn-zero" data-num="0"></div>
                <div className="col1">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="0,3"></div>
                        <div className="btn m rm cm" data-num="3"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="0,2,3"></div>
                        <div className="btn v rm cv" data-num="0,2"></div>
                        <div className="btn h rh cm" data-num="2,3"></div>
                        <div className="btn m rm cm" data-num="2"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="0,1,2"></div>
                        <div className="btn v rm cv" data-num="0,1"></div>
                        <div className="btn c rb cv" data-num="0,1,2,3"></div>
                        <div className="btn h rh cm" data-num="1,2"></div>
                        <div className="btn m rm cm" data-num="1"></div>
                        <div className="btn h rb cm" data-num="1,2,3"></div>
                    </div>
                    <div className="row4">
                        <div className="btn ms4 rm cm" data-type="sector" data-sector="4"></div>
                    </div>
                    <div className="row5">
                        <div className="btn ms2 rm cm" data-type="sector" data-sector="7"></div>
                    </div>
                </div>
                <div className="col2">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="3,6"></div>
                        <div className="btn m rm cm" data-num="6"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="2,3,5,6"></div>
                        <div className="btn v rm cv" data-num="2,5"></div>
                        <div className="btn h rh cm" data-num="5,6"></div>
                        <div className="btn m rm cm" data-num="5"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="1,2,4,5"></div>
                        <div className="btn v rm cv" data-num="1,4"></div>
                        <div className="btn c rb cv" data-num="1,2,3,4,5,6"></div>
                        <div className="btn h rh cm" data-num="4,5"></div>
                        <div className="btn m rm cm" data-num="4"></div>
                        <div className="btn h rb cm" data-num="4,5,6"></div>
                    </div>
                </div>
                <div className="col3">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="6,9"></div>
                        <div className="btn m rm cm" data-num="9"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="5,6,8,9"></div>
                        <div className="btn v rm cv" data-num="5,8"></div>
                        <div className="btn h rh cm" data-num="8,9"></div>
                        <div className="btn m rm cm" data-num="8"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="4,5,7,8"></div>
                        <div className="btn v rm cv" data-num="4,7"></div>
                        <div className="btn c rb cv" data-num="4,5,6,7,8,9"></div>
                        <div className="btn h rh cm" data-num="7,8"></div>
                        <div className="btn m rm cm" data-num="7"></div>
                        <div className="btn h rb cm" data-num="7,8,9"></div>
                    </div>
                    <div className="row5">
                        <div className="btn ms2 rm cm" data-type="sector" data-sector="8"></div>
                    </div>
                </div>
                <div className="col4">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="9,12"></div>
                        <div className="btn m rm cm" data-num="12"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="8,9,11,12"></div>
                        <div className="btn v rm cv" data-num="8,11"></div>
                        <div className="btn h rh cm" data-num="11,12"></div>
                        <div className="btn m rm cm" data-num="11"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="7,8,10,11"></div>
                        <div className="btn v rm cv" data-num="7,10"></div>
                        <div className="btn c rb cv" data-num="7,8,9,10,11,12"></div>
                        <div className="btn h rh cm" data-num="10,11"></div>
                        <div className="btn m rm cm" data-num="10"></div>
                        <div className="btn h rb cm" data-num="10,11,12"></div>
                    </div>
                </div>
                <div className="col5">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="12,15"></div>
                        <div className="btn m rm cm" data-num="15"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="11,12,14,15"></div>
                        <div className="btn v rm cv" data-num="11,14"></div>
                        <div className="btn h rh cm" data-num="14,15"></div>
                        <div className="btn m rm cm" data-num="14"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="10,11,13,14"></div>
                        <div className="btn v rm cv" data-num="10,13"></div>
                        <div className="btn c rb cv" data-num="10,11,12,13,14,15"></div>
                        <div className="btn h rh cm" data-num="13,14"></div>
                        <div className="btn m rm cm" data-num="13"></div>
                        <div className="btn h rb cm" data-num="13,14,15"></div>
                    </div>
                    <div className="row4">
                        <div className="btn ms4 rm cm" data-type="sector" data-sector="5"></div>
                    </div>
                    <div className="row5">
                        <div className="btn ms2 rm cm" data-type="sector" data-sector="9"></div>
                    </div>
                </div>
                <div className="col6">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="15,18"></div>
                        <div className="btn m rm cm" data-num="18"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="14,15,17,18"></div>
                        <div className="btn v rm cv" data-num="14,17"></div>
                        <div className="btn h rh cm" data-num="17,18"></div>
                        <div className="btn m rm cm" data-num="17"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="13,14,16,17"></div>
                        <div className="btn v rm cv" data-num="13,16"></div>
                        <div className="btn c rb cv" data-num="13,14,15,16,17,18"></div>
                        <div className="btn h rh cm" data-num="16,17"></div>
                        <div className="btn m rm cm" data-num="16"></div>
                        <div className="btn h rb cm" data-num="16,17,18"></div>
                    </div>
                </div>
                <div className="col7">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="18,21"></div>
                        <div className="btn m rm cm" data-num="21"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="17,18,20,21"></div>
                        <div className="btn v rm cv" data-num="17,20"></div>
                        <div className="btn h rh cm" data-num="20,21"></div>
                        <div className="btn m rm cm" data-num="20"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="16,17,19,20"></div>
                        <div className="btn v rm cv" data-num="16,19"></div>
                        <div className="btn c rb cv" data-num="16,17,18,19,20,21"></div>
                        <div className="btn h rh cm" data-num="19,20"></div>
                        <div className="btn m rm cm" data-num="19"></div>
                        <div className="btn h rb cm" data-num="19,20,21"></div>
                    </div>
                    <div className="row5">
                        <div className="btn ms2 rm cm" data-type="sector" data-sector="10"></div>
                    </div>
                </div>
                <div className="col8">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="21,24"></div>
                        <div className="btn m rm cm" data-num="24"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="20,21,23,24"></div>
                        <div className="btn v rm cv" data-num="20,23"></div>
                        <div className="btn h rh cm" data-num="23,24"></div>
                        <div className="btn m rm cm" data-num="23"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="19,20,22,23"></div>
                        <div className="btn v rm cv" data-num="19,22"></div>
                        <div className="btn c rb cv" data-num="19,20,21,22,23,24"></div>
                        <div className="btn h rh cm" data-num="22,23"></div>
                        <div className="btn m rm cm" data-num="22"></div>
                        <div className="btn h rb cm" data-num="22,23,24"></div>
                    </div>
                </div>
                <div className="col9">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="24,27"></div>
                        <div className="btn m rm cm" data-num="27"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="23,24,26,27"></div>
                        <div className="btn v rm cv" data-num="23,26"></div>
                        <div className="btn h rh cm" data-num="26,27"></div>
                        <div className="btn m rm cm" data-num="26"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="22,23,25,26"></div>
                        <div className="btn v rm cv" data-num="22,25"></div>
                        <div className="btn c rb cv" data-num="22,23,24,25,26,27"></div>
                        <div className="btn h rh cm" data-num="25,26"></div>
                        <div className="btn m rm cm" data-num="25"></div>
                        <div className="btn h rb cm" data-num="25,26,27"></div>
                    </div>
                    <div className="row4">
                        <div className="btn ms4 rm cm" data-type="sector" data-sector="6"></div>
                    </div>
                    <div className="row5">
                        <div className="btn ms2 rm cm" data-type="sector" data-sector="11"></div>
                    </div>
                </div>
                <div className="col10">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="27,30"></div>
                        <div className="btn m rm cm" data-num="30"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="26,27,29,30"></div>
                        <div className="btn v rm cv" data-num="26,29"></div>
                        <div className="btn h rh cm" data-num="29,30"></div>
                        <div className="btn m rm cm" data-num="29"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="25,26,28,29"></div>
                        <div className="btn v rm cv" data-num="25,28"></div>
                        <div className="btn c rb cv" data-num="25,26,27,28,29,30"></div>
                        <div className="btn h rh cm" data-num="28,29"></div>
                        <div className="btn m rm cm" data-num="28"></div>
                        <div className="btn h rb cm" data-num="28,29,30"></div>
                    </div>
                </div>
                <div className="col11">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="30,33"></div>
                        <div className="btn m rm cm" data-num="33"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="29,30,32,33"></div>
                        <div className="btn v rm cv" data-num="29,32"></div>
                        <div className="btn h rh cm" data-num="32,33"></div>
                        <div className="btn m rm cm" data-num="32"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="28,29,31,32"></div>
                        <div className="btn v rm cv" data-num="28,31"></div>
                        <div className="btn c rb cv" data-num="28,29,30,31,32,33"></div>
                        <div className="btn h rh cm" data-num="31,32"></div>
                        <div className="btn m rm cm" data-num="31"></div>
                        <div className="btn h rb cm" data-num="31,32,33"></div>
                    </div>
                    <div className="row5">
                        <div className="btn ms2 rm cm" data-type="sector" data-sector="12"></div>
                    </div>
                </div>
                <div className="col12">
                    <div className="row1">
                        <div className="btn v rm cv" data-num="33,36"></div>
                        <div className="btn m rm cm" data-num="36"></div>
                    </div>
                    <div className="row2">
                        <div className="btn c rh cv" data-num="32,33,35,36"></div>
                        <div className="btn v rm cv" data-num="32,35"></div>
                        <div className="btn h rh cm" data-num="35,36"></div>
                        <div className="btn m rm cm" data-num="35"></div>
                    </div>
                    <div className="row3">
                        <div className="btn c rh cv" data-num="31,32,34,35"></div>
                        <div className="btn v rm cv" data-num="31,34"></div>
                        <div className="btn c rb cv" data-num="31,32,33,34,35,36"></div>
                        <div className="btn h rh cm" data-num="34,35"></div>
                        <div className="btn m rm cm" data-num="34"></div>
                        <div className="btn h rb cm" data-num="34,35,36"></div>
                    </div>
                </div>
                <div className="col13">
                    <div className="row1">
                        <div className="btn m rm cm" data-type="sector" data-sector="1"></div>
                    </div>
                    <div className="row2">
                        <div className="btn m rm cm" data-type="sector" data-sector="2"></div>
                    </div>
                    <div className="row3">
                        <div className="btn m rm cm" data-type="sector" data-sector="3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Panel;

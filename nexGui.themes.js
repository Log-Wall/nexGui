nexGui.themes = {
    fireflies() {
        $('#tbl_2h3a').empty();
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="firefly nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('#Khaseem-Fireflies').remove();
        $('#tbl_2h3a').css({overflow: 'hidden', height: '100%'});
        $('body').append(` <style id="Khaseem-Fireflies">

        #tbl_2h3a {
        background: url(https://i.pinimg.com/originals/44/6e/3b/446e3b79395a287ca32f7977dd83b290.jpg);
        background-size: cover;

        }

        .firefly {
        position: relative;
        left: 50%;
        top: 50%;
        width: 0.2vw;
        height: 0.2vw;
        margin: -0.2vw 0 0 9.8vw;
        animation: ease 400s alternate infinite;
        pointer-events: none;
        }
        .firefly::before, .firefly::after {
        content: "";
        position: fixed;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        transform-origin: -10vw;
        }
        .firefly::before {
        background: black;
        opacity: 0.4;
        animation: drift ease alternate infinite;
        }
        .firefly::after {
        background: white;
        opacity: 0;
        box-shadow: 0 0 0vw 0vw yellow;
        animation: drift ease alternate infinite, flash ease infinite;
        }

        .firefly:nth-child(1) {
        animation-name: move1;
        }
        .firefly:nth-child(1)::before {
        animation-duration: 5s;
        }
        .firefly:nth-child(1)::after {
        animation-duration: 5s, 5718ms;
        animation-delay: 0ms, 4929ms;
        }

        @keyframes move1 {
        0% {
            transform: translateX(-48%) translateY(-19%) scale(0.74);
        }
        3.7037037037% {
            transform: translateX(-28%) translateY(22%) scale(0.39);
        }
        7.4074074074% {
            transform: translateX(20%) translateY(-35%) scale(0.5);
        }
        11.1111111111% {
            transform: translateX(-39%) translateY(46%) scale(0.28);
        }
        14.8148148148% {
            transform: translateX(6%) translateY(-12%) scale(0.54);
        }
        18.5185185185% {
            transform: translateX(23%) translateY(35%) scale(0.27);
        }
        22.2222222222% {
            transform: translateX(-5%) translateY(-36%) scale(0.43);
        }
        25.9259259259% {
            transform: translateX(-3%) translateY(-14%) scale(0.55);
        }
        29.6296296296% {
            transform: translateX(-9%) translateY(-38%) scale(0.63);
        }
        33.3333333333% {
            transform: translateX(26%) translateY(19%) scale(0.59);
        }
        37.037037037% {
            transform: translateX(46%) translateY(10%) scale(0.26);
        }
        40.7407407407% {
            transform: translateX(-36%) translateY(-28%) scale(0.65);
        }
        44.4444444444% {
            transform: translateX(44%) translateY(-4%) scale(0.65);
        }
        48.1481481481% {
            transform: translateX(-8%) translateY(44%) scale(0.57);
        }
        51.8518518519% {
            transform: translateX(46%) translateY(13%) scale(0.98);
        }
        55.5555555556% {
            transform: translateX(-14%) translateY(-14%) scale(0.37);
        }
        59.2592592593% {
            transform: translateX(-23%) translateY(-6%) scale(0.95);
        }
        62.962962963% {
            transform: translateX(9%) translateY(15%) scale(0.53);
        }
        66.6666666667% {
            transform: translateX(-27%) translateY(-31%) scale(0.73);
        }
        70.3703703704% {
            transform: translateX(31%) translateY(-42%) scale(0.91);
        }
        74.0740740741% {
            transform: translateX(-2%) translateY(12%) scale(0.41);
        }
        77.7777777778% {
            transform: translateX(32%) translateY(50%) scale(0.26);
        }
        81.4814814815% {
            transform: translateX(-36%) translateY(27%) scale(0.49);
        }
        85.1851851852% {
            transform: translateX(24%) translateY(-22%) scale(0.38);
        }
        88.8888888889% {
            transform: translateX(-47%) translateY(17%) scale(0.7);
        }
        92.5925925926% {
            transform: translateX(-41%) translateY(-32%) scale(0.41);
        }
        96.2962962963% {
            transform: translateX(49%) translateY(-45%) scale(0.47);
        }
        100% {
            transform: translateX(45%) translateY(28%) scale(0.69);
        }
        }
        .firefly:nth-child(2) {
        animation-name: move2;
        }
        .firefly:nth-child(2)::before {
        animation-duration: 21s;
        }
        .firefly:nth-child(2)::after {
        animation-duration: 21s, 9110ms;
        animation-delay: 0ms, 902ms;
        }

        @keyframes move2 {
        0% {
            transform: translateX(6%) translateY(1%) scale(0.65);
        }
        4.5454545455% {
            transform: translateX(19%) translateY(41%) scale(0.92);
        }
        9.0909090909% {
            transform: translateX(-16%) translateY(41%) scale(0.86);
        }
        13.6363636364% {
            transform: translateX(13%) translateY(19%) scale(0.72);
        }
        18.1818181818% {
            transform: translateX(-31%) translateY(-41%) scale(0.83);
        }
        22.7272727273% {
            transform: translateX(-44%) translateY(8%) scale(0.78);
        }
        27.2727272727% {
            transform: translateX(32%) translateY(7%) scale(0.79);
        }
        31.8181818182% {
            transform: translateX(10%) translateY(-16%) scale(0.78);
        }
        36.3636363636% {
            transform: translateX(36%) translateY(-9%) scale(0.47);
        }
        40.9090909091% {
            transform: translateX(49%) translateY(17%) scale(0.67);
        }
        45.4545454545% {
            transform: translateX(9%) translateY(39%) scale(0.89);
        }
        50% {
            transform: translateX(-7%) translateY(-26%) scale(0.42);
        }
        54.5454545455% {
            transform: translateX(-2%) translateY(-13%) scale(0.74);
        }
        59.0909090909% {
            transform: translateX(-39%) translateY(-11%) scale(0.64);
        }
        63.6363636364% {
            transform: translateX(3%) translateY(4%) scale(0.64);
        }
        68.1818181818% {
            transform: translateX(-22%) translateY(9%) scale(1);
        }
        72.7272727273% {
            transform: translateX(7%) translateY(35%) scale(0.85);
        }
        77.2727272727% {
            transform: translateX(-25%) translateY(-15%) scale(0.33);
        }
        81.8181818182% {
            transform: translateX(-16%) translateY(14%) scale(0.64);
        }
        86.3636363636% {
            transform: translateX(-5%) translateY(40%) scale(0.91);
        }
        90.9090909091% {
            transform: translateX(-1%) translateY(-9%) scale(0.53);
        }
        95.4545454545% {
            transform: translateX(-22%) translateY(-22%) scale(0.39);
        }
        100% {
            transform: translateX(-45%) translateY(0%) scale(0.81);
        }
        }
        .firefly:nth-child(3) {
        animation-name: move3;
        }
        .firefly:nth-child(3)::before {
        animation-duration: 11s;
        }
        .firefly:nth-child(3)::after {
        animation-duration: 11s, 5523ms;
        animation-delay: 0ms, 4850ms;
        }

        @keyframes move3 {
        0% {
            transform: translateX(-37%) translateY(37%) scale(0.31);
        }
        5% {
            transform: translateX(26%) translateY(-5%) scale(0.31);
        }
        10% {
            transform: translateX(9%) translateY(44%) scale(0.27);
        }
        15% {
            transform: translateX(28%) translateY(-18%) scale(0.82);
        }
        20% {
            transform: translateX(-24%) translateY(27%) scale(0.72);
        }
        25% {
            transform: translateX(-27%) translateY(-1%) scale(0.56);
        }
        30% {
            transform: translateX(39%) translateY(-3%) scale(0.66);
        }
        35% {
            transform: translateX(49%) translateY(-40%) scale(0.7);
        }
        40% {
            transform: translateX(33%) translateY(-25%) scale(0.38);
        }
        45% {
            transform: translateX(34%) translateY(13%) scale(0.41);
        }
        50% {
            transform: translateX(-1%) translateY(4%) scale(0.38);
        }
        55% {
            transform: translateX(-48%) translateY(-47%) scale(0.97);
        }
        60% {
            transform: translateX(-44%) translateY(4%) scale(0.5);
        }
        65% {
            transform: translateX(-13%) translateY(-5%) scale(0.48);
        }
        70% {
            transform: translateX(-41%) translateY(-10%) scale(0.84);
        }
        75% {
            transform: translateX(23%) translateY(21%) scale(0.53);
        }
        80% {
            transform: translateX(27%) translateY(2%) scale(0.65);
        }
        85% {
            transform: translateX(-43%) translateY(37%) scale(0.86);
        }
        90% {
            transform: translateX(-26%) translateY(-45%) scale(0.55);
        }
        95% {
            transform: translateX(47%) translateY(-4%) scale(0.75);
        }
        100% {
            transform: translateX(-1%) translateY(-40%) scale(0.43);
        }
        }
        .firefly:nth-child(4) {
        animation-name: move4;
        }
        .firefly:nth-child(4)::before {
        animation-duration: 17s;
        }
        .firefly:nth-child(4)::after {
        animation-duration: 17s, 9952ms;
        animation-delay: 0ms, 7556ms;
        }

        @keyframes move4 {
        0% {
            transform: translateX(34%) translateY(19%) scale(0.32);
        }
        4.5454545455% {
            transform: translateX(-42%) translateY(36%) scale(0.69);
        }
        9.0909090909% {
            transform: translateX(44%) translateY(23%) scale(0.69);
        }
        13.6363636364% {
            transform: translateX(27%) translateY(-13%) scale(0.61);
        }
        18.1818181818% {
            transform: translateX(40%) translateY(-46%) scale(0.37);
        }
        22.7272727273% {
            transform: translateX(-10%) translateY(-27%) scale(0.42);
        }
        27.2727272727% {
            transform: translateX(-6%) translateY(-12%) scale(0.51);
        }
        31.8181818182% {
            transform: translateX(-14%) translateY(-14%) scale(0.61);
        }
        36.3636363636% {
            transform: translateX(21%) translateY(-11%) scale(0.93);
        }
        40.9090909091% {
            transform: translateX(38%) translateY(49%) scale(0.53);
        }
        45.4545454545% {
            transform: translateX(17%) translateY(-37%) scale(0.63);
        }
        50% {
            transform: translateX(-36%) translateY(7%) scale(0.55);
        }
        54.5454545455% {
            transform: translateX(25%) translateY(-25%) scale(0.76);
        }
        59.0909090909% {
            transform: translateX(-19%) translateY(39%) scale(0.64);
        }
        63.6363636364% {
            transform: translateX(-43%) translateY(22%) scale(1);
        }
        68.1818181818% {
            transform: translateX(34%) translateY(-16%) scale(0.83);
        }
        72.7272727273% {
            transform: translateX(48%) translateY(19%) scale(0.88);
        }
        77.2727272727% {
            transform: translateX(-16%) translateY(-44%) scale(0.39);
        }
        81.8181818182% {
            transform: translateX(-27%) translateY(-18%) scale(0.42);
        }
        86.3636363636% {
            transform: translateX(29%) translateY(21%) scale(0.37);
        }
        90.9090909091% {
            transform: translateX(-20%) translateY(46%) scale(0.26);
        }
        95.4545454545% {
            transform: translateX(-15%) translateY(-8%) scale(0.68);
        }
        100% {
            transform: translateX(-14%) translateY(36%) scale(0.55);
        }
        }
        .firefly:nth-child(5) {
        animation-name: move5;
        }
        .firefly:nth-child(5)::before {
        animation-duration: 10s;
        }
        .firefly:nth-child(5)::after {
        animation-duration: 10s, 7171ms;
        animation-delay: 0ms, 5341ms;
        }

        @keyframes move5 {
        0% {
            transform: translateX(20%) translateY(50%) scale(0.57);
        }
        4.5454545455% {
            transform: translateX(-44%) translateY(-8%) scale(0.7);
        }
        9.0909090909% {
            transform: translateX(5%) translateY(3%) scale(0.63);
        }
        13.6363636364% {
            transform: translateX(-13%) translateY(-36%) scale(0.9);
        }
        18.1818181818% {
            transform: translateX(-41%) translateY(33%) scale(0.82);
        }
        22.7272727273% {
            transform: translateX(47%) translateY(-42%) scale(0.71);
        }
        27.2727272727% {
            transform: translateX(35%) translateY(-29%) scale(0.6);
        }
        31.8181818182% {
            transform: translateX(-12%) translateY(9%) scale(0.47);
        }
        36.3636363636% {
            transform: translateX(11%) translateY(33%) scale(0.82);
        }
        40.9090909091% {
            transform: translateX(13%) translateY(5%) scale(0.36);
        }
        45.4545454545% {
            transform: translateX(-37%) translateY(43%) scale(0.92);
        }
        50% {
            transform: translateX(-5%) translateY(33%) scale(0.56);
        }
        54.5454545455% {
            transform: translateX(39%) translateY(-46%) scale(0.35);
        }
        59.0909090909% {
            transform: translateX(4%) translateY(22%) scale(0.51);
        }
        63.6363636364% {
            transform: translateX(-22%) translateY(-5%) scale(0.54);
        }
        68.1818181818% {
            transform: translateX(20%) translateY(-33%) scale(0.67);
        }
        72.7272727273% {
            transform: translateX(-41%) translateY(-37%) scale(0.93);
        }
        77.2727272727% {
            transform: translateX(-49%) translateY(-31%) scale(0.66);
        }
        81.8181818182% {
            transform: translateX(-37%) translateY(-1%) scale(0.66);
        }
        86.3636363636% {
            transform: translateX(-48%) translateY(2%) scale(0.27);
        }
        90.9090909091% {
            transform: translateX(42%) translateY(-14%) scale(0.81);
        }
        95.4545454545% {
            transform: translateX(15%) translateY(-21%) scale(0.29);
        }
        100% {
            transform: translateX(-22%) translateY(26%) scale(0.91);
        }
        }
        .firefly:nth-child(6) {
        animation-name: move6;
        }
        .firefly:nth-child(6)::before {
        animation-duration: 13s;
        }
        .firefly:nth-child(6)::after {
        animation-duration: 13s, 5885ms;
        animation-delay: 0ms, 2604ms;
        }

        @keyframes move6 {
        0% {
            transform: translateX(50%) translateY(-33%) scale(0.62);
        }
        3.7037037037% {
            transform: translateX(-25%) translateY(50%) scale(0.62);
        }
        7.4074074074% {
            transform: translateX(-13%) translateY(31%) scale(0.33);
        }
        11.1111111111% {
            transform: translateX(30%) translateY(-19%) scale(0.43);
        }
        14.8148148148% {
            transform: translateX(2%) translateY(43%) scale(0.5);
        }
        18.5185185185% {
            transform: translateX(-11%) translateY(32%) scale(0.98);
        }
        22.2222222222% {
            transform: translateX(-18%) translateY(-30%) scale(0.54);
        }
        25.9259259259% {
            transform: translateX(28%) translateY(35%) scale(0.43);
        }
        29.6296296296% {
            transform: translateX(34%) translateY(27%) scale(0.45);
        }
        33.3333333333% {
            transform: translateX(-25%) translateY(-17%) scale(0.89);
        }
        37.037037037% {
            transform: translateX(-11%) translateY(-8%) scale(0.83);
        }
        40.7407407407% {
            transform: translateX(33%) translateY(28%) scale(0.49);
        }
        44.4444444444% {
            transform: translateX(-34%) translateY(33%) scale(0.29);
        }
        48.1481481481% {
            transform: translateX(2%) translateY(13%) scale(0.72);
        }
        51.8518518519% {
            transform: translateX(-37%) translateY(31%) scale(0.44);
        }
        55.5555555556% {
            transform: translateX(33%) translateY(15%) scale(0.28);
        }
        59.2592592593% {
            transform: translateX(-17%) translateY(-22%) scale(0.5);
        }
        62.962962963% {
            transform: translateX(-21%) translateY(-5%) scale(0.51);
        }
        66.6666666667% {
            transform: translateX(30%) translateY(-47%) scale(0.53);
        }
        70.3703703704% {
            transform: translateX(-31%) translateY(40%) scale(0.96);
        }
        74.0740740741% {
            transform: translateX(2%) translateY(-25%) scale(0.6);
        }
        77.7777777778% {
            transform: translateX(-3%) translateY(-42%) scale(0.74);
        }
        81.4814814815% {
            transform: translateX(36%) translateY(50%) scale(0.36);
        }
        85.1851851852% {
            transform: translateX(44%) translateY(3%) scale(0.4);
        }
        88.8888888889% {
            transform: translateX(43%) translateY(-17%) scale(0.79);
        }
        92.5925925926% {
            transform: translateX(14%) translateY(-20%) scale(0.42);
        }
        96.2962962963% {
            transform: translateX(-17%) translateY(3%) scale(0.59);
        }
        100% {
            transform: translateX(0%) translateY(26%) scale(0.96);
        }
        }
        .firefly:nth-child(7) {
        animation-name: move7;
        }
        .firefly:nth-child(7)::before {
        animation-duration: 9s;
        }
        .firefly:nth-child(7)::after {
        animation-duration: 9s, 7736ms;
        animation-delay: 0ms, 7481ms;
        }

        @keyframes move7 {
        0% {
            transform: translateX(15%) translateY(2%) scale(0.73);
        }
        5.2631578947% {
            transform: translateX(-45%) translateY(33%) scale(0.55);
        }
        10.5263157895% {
            transform: translateX(46%) translateY(-41%) scale(0.99);
        }
        15.7894736842% {
            transform: translateX(-42%) translateY(48%) scale(0.78);
        }
        21.0526315789% {
            transform: translateX(-37%) translateY(0%) scale(0.33);
        }
        26.3157894737% {
            transform: translateX(28%) translateY(-8%) scale(0.31);
        }
        31.5789473684% {
            transform: translateX(-33%) translateY(17%) scale(0.78);
        }
        36.8421052632% {
            transform: translateX(37%) translateY(12%) scale(0.68);
        }
        42.1052631579% {
            transform: translateX(-18%) translateY(15%) scale(0.49);
        }
        47.3684210526% {
            transform: translateX(-46%) translateY(22%) scale(0.76);
        }
        52.6315789474% {
            transform: translateX(-1%) translateY(49%) scale(0.83);
        }
        57.8947368421% {
            transform: translateX(33%) translateY(-14%) scale(0.69);
        }
        63.1578947368% {
            transform: translateX(18%) translateY(-38%) scale(0.43);
        }
        68.4210526316% {
            transform: translateX(46%) translateY(6%) scale(0.76);
        }
        73.6842105263% {
            transform: translateX(-26%) translateY(-22%) scale(0.71);
        }
        78.9473684211% {
            transform: translateX(1%) translateY(-21%) scale(0.46);
        }
        84.2105263158% {
            transform: translateX(-39%) translateY(-37%) scale(0.74);
        }
        89.4736842105% {
            transform: translateX(22%) translateY(31%) scale(0.78);
        }
        94.7368421053% {
            transform: translateX(-18%) translateY(-30%) scale(0.62);
        }
        100% {
            transform: translateX(32%) translateY(3%) scale(0.51);
        }
        }
        .firefly:nth-child(8) {
        animation-name: move8;
        }
        .firefly:nth-child(8)::before {
        animation-duration: 9s;
        }
        .firefly:nth-child(8)::after {
        animation-duration: 9s, 10800ms;
        animation-delay: 0ms, 6212ms;
        }

        @keyframes move8 {
        0% {
            transform: translateX(-24%) translateY(-1%) scale(0.48);
        }
        4.5454545455% {
            transform: translateX(-44%) translateY(29%) scale(0.36);
        }
        9.0909090909% {
            transform: translateX(-46%) translateY(-4%) scale(0.79);
        }
        13.6363636364% {
            transform: translateX(42%) translateY(-17%) scale(0.33);
        }
        18.1818181818% {
            transform: translateX(-26%) translateY(24%) scale(0.48);
        }
        22.7272727273% {
            transform: translateX(26%) translateY(18%) scale(0.6);
        }
        27.2727272727% {
            transform: translateX(-26%) translateY(17%) scale(0.92);
        }
        31.8181818182% {
            transform: translateX(29%) translateY(8%) scale(0.75);
        }
        36.3636363636% {
            transform: translateX(-18%) translateY(6%) scale(0.86);
        }
        40.9090909091% {
            transform: translateX(-23%) translateY(-10%) scale(0.94);
        }
        45.4545454545% {
            transform: translateX(18%) translateY(-22%) scale(0.94);
        }
        50% {
            transform: translateX(7%) translateY(-12%) scale(0.91);
        }
        54.5454545455% {
            transform: translateX(-1%) translateY(1%) scale(0.69);
        }
        59.0909090909% {
            transform: translateX(-4%) translateY(-4%) scale(0.7);
        }
        63.6363636364% {
            transform: translateX(43%) translateY(16%) scale(0.46);
        }
        68.1818181818% {
            transform: translateX(21%) translateY(46%) scale(0.66);
        }
        72.7272727273% {
            transform: translateX(4%) translateY(-30%) scale(0.46);
        }
        77.2727272727% {
            transform: translateX(-14%) translateY(-25%) scale(0.32);
        }
        81.8181818182% {
            transform: translateX(33%) translateY(14%) scale(0.59);
        }
        86.3636363636% {
            transform: translateX(50%) translateY(-40%) scale(0.67);
        }
        90.9090909091% {
            transform: translateX(-25%) translateY(-41%) scale(0.72);
        }
        95.4545454545% {
            transform: translateX(20%) translateY(17%) scale(0.64);
        }
        100% {
            transform: translateX(12%) translateY(9%) scale(0.8);
        }
        }
        .firefly:nth-child(9) {
        animation-name: move9;
        }
        .firefly:nth-child(9)::before {
        animation-duration: 9s;
        }
        .firefly:nth-child(9)::after {
        animation-duration: 9s, 5895ms;
        animation-delay: 0ms, 1701ms;
        }

        @keyframes move9 {
        0% {
            transform: translateX(42%) translateY(-35%) scale(0.57);
        }
        3.8461538462% {
            transform: translateX(47%) translateY(2%) scale(0.35);
        }
        7.6923076923% {
            transform: translateX(-5%) translateY(-12%) scale(0.84);
        }
        11.5384615385% {
            transform: translateX(-34%) translateY(-19%) scale(0.48);
        }
        15.3846153846% {
            transform: translateX(28%) translateY(8%) scale(0.69);
        }
        19.2307692308% {
            transform: translateX(19%) translateY(-17%) scale(0.68);
        }
        23.0769230769% {
            transform: translateX(-7%) translateY(21%) scale(0.99);
        }
        26.9230769231% {
            transform: translateX(44%) translateY(-10%) scale(0.4);
        }
        30.7692307692% {
            transform: translateX(-30%) translateY(42%) scale(0.61);
        }
        34.6153846154% {
            transform: translateX(-35%) translateY(-43%) scale(0.84);
        }
        38.4615384615% {
            transform: translateX(-1%) translateY(-23%) scale(0.73);
        }
        42.3076923077% {
            transform: translateX(46%) translateY(-44%) scale(0.89);
        }
        46.1538461538% {
            transform: translateX(-8%) translateY(-2%) scale(0.75);
        }
        50% {
            transform: translateX(-47%) translateY(8%) scale(0.58);
        }
        53.8461538462% {
            transform: translateX(-49%) translateY(3%) scale(0.45);
        }
        57.6923076923% {
            transform: translateX(22%) translateY(47%) scale(0.71);
        }
        61.5384615385% {
            transform: translateX(24%) translateY(-43%) scale(0.27);
        }
        65.3846153846% {
            transform: translateX(-19%) translateY(-15%) scale(0.79);
        }
        69.2307692308% {
            transform: translateX(38%) translateY(-35%) scale(0.7);
        }
        73.0769230769% {
            transform: translateX(40%) translateY(4%) scale(0.56);
        }
        76.9230769231% {
            transform: translateX(-37%) translateY(12%) scale(0.74);
        }
        80.7692307692% {
            transform: translateX(-19%) translateY(5%) scale(0.65);
        }
        84.6153846154% {
            transform: translateX(4%) translateY(5%) scale(0.29);
        }
        88.4615384615% {
            transform: translateX(-31%) translateY(-26%) scale(1);
        }
        92.3076923077% {
            transform: translateX(42%) translateY(-8%) scale(0.3);
        }
        96.1538461538% {
            transform: translateX(21%) translateY(-39%) scale(0.3);
        }
        100% {
            transform: translateX(3%) translateY(-8%) scale(0.76);
        }
        }
        .firefly:nth-child(10) {
        animation-name: move10;
        }
        .firefly:nth-child(10)::before {
        animation-duration: 9s;
        }
        .firefly:nth-child(10)::after {
        animation-duration: 9s, 10318ms;
        animation-delay: 0ms, 7602ms;
        }

        @keyframes move10 {
        0% {
            transform: translateX(37%) translateY(-43%) scale(0.63);
        }
        5.8823529412% {
            transform: translateX(-36%) translateY(-38%) scale(0.9);
        }
        11.7647058824% {
            transform: translateX(-14%) translateY(8%) scale(0.97);
        }
        17.6470588235% {
            transform: translateX(48%) translateY(-8%) scale(0.29);
        }
        23.5294117647% {
            transform: translateX(8%) translateY(34%) scale(0.55);
        }
        29.4117647059% {
            transform: translateX(-28%) translateY(46%) scale(0.53);
        }
        35.2941176471% {
            transform: translateX(-14%) translateY(37%) scale(0.96);
        }
        41.1764705882% {
            transform: translateX(9%) translateY(11%) scale(0.6);
        }
        47.0588235294% {
            transform: translateX(-37%) translateY(23%) scale(0.28);
        }
        52.9411764706% {
            transform: translateX(49%) translateY(26%) scale(0.33);
        }
        58.8235294118% {
            transform: translateX(24%) translateY(1%) scale(0.86);
        }
        64.7058823529% {
            transform: translateX(-13%) translateY(-45%) scale(0.86);
        }
        70.5882352941% {
            transform: translateX(-44%) translateY(18%) scale(0.28);
        }
        76.4705882353% {
            transform: translateX(36%) translateY(1%) scale(0.35);
        }
        82.3529411765% {
            transform: translateX(35%) translateY(49%) scale(0.37);
        }
        88.2352941176% {
            transform: translateX(-24%) translateY(-24%) scale(0.73);
        }
        94.1176470588% {
            transform: translateX(4%) translateY(41%) scale(0.79);
        }
        100% {
            transform: translateX(45%) translateY(-47%) scale(0.87);
        }
        }
        .firefly:nth-child(11) {
        animation-name: move11;
        }
        .firefly:nth-child(11)::before {
        animation-duration: 14s;
        }
        .firefly:nth-child(11)::after {
        animation-duration: 14s, 10605ms;
        animation-delay: 0ms, 7199ms;
        }

        @keyframes move11 {
        0% {
            transform: translateX(4%) translateY(3%) scale(0.84);
        }
        3.5714285714% {
            transform: translateX(-41%) translateY(-14%) scale(0.71);
        }
        7.1428571429% {
            transform: translateX(-3%) translateY(38%) scale(0.73);
        }
        10.7142857143% {
            transform: translateX(-14%) translateY(29%) scale(0.53);
        }
        14.2857142857% {
            transform: translateX(47%) translateY(-44%) scale(0.66);
        }
        17.8571428571% {
            transform: translateX(18%) translateY(-15%) scale(0.71);
        }
        21.4285714286% {
            transform: translateX(-44%) translateY(37%) scale(0.93);
        }
        25% {
            transform: translateX(-1%) translateY(15%) scale(0.54);
        }
        28.5714285714% {
            transform: translateX(-2%) translateY(-13%) scale(0.61);
        }
        32.1428571429% {
            transform: translateX(-15%) translateY(26%) scale(0.92);
        }
        35.7142857143% {
            transform: translateX(-33%) translateY(35%) scale(0.73);
        }
        39.2857142857% {
            transform: translateX(18%) translateY(48%) scale(0.35);
        }
        42.8571428571% {
            transform: translateX(4%) translateY(-19%) scale(0.9);
        }
        46.4285714286% {
            transform: translateX(13%) translateY(37%) scale(0.89);
        }
        50% {
            transform: translateX(25%) translateY(-35%) scale(0.49);
        }
        53.5714285714% {
            transform: translateX(46%) translateY(24%) scale(0.9);
        }
        57.1428571429% {
            transform: translateX(41%) translateY(0%) scale(0.88);
        }
        60.7142857143% {
            transform: translateX(6%) translateY(12%) scale(0.85);
        }
        64.2857142857% {
            transform: translateX(28%) translateY(22%) scale(0.86);
        }
        67.8571428571% {
            transform: translateX(-2%) translateY(26%) scale(0.28);
        }
        71.4285714286% {
            transform: translateX(45%) translateY(28%) scale(0.73);
        }
        75% {
            transform: translateX(25%) translateY(13%) scale(0.69);
        }
        78.5714285714% {
            transform: translateX(-5%) translateY(33%) scale(0.35);
        }
        82.1428571429% {
            transform: translateX(-25%) translateY(37%) scale(0.45);
        }
        85.7142857143% {
            transform: translateX(46%) translateY(18%) scale(0.52);
        }
        89.2857142857% {
            transform: translateX(-19%) translateY(49%) scale(0.29);
        }
        92.8571428571% {
            transform: translateX(23%) translateY(34%) scale(0.84);
        }
        96.4285714286% {
            transform: translateX(-24%) translateY(20%) scale(0.47);
        }
        100% {
            transform: translateX(-34%) translateY(11%) scale(0.93);
        }
        }
        .firefly:nth-child(12) {
        animation-name: move12;
        }
        .firefly:nth-child(12)::before {
        animation-duration: 18s;
        }
        .firefly:nth-child(12)::after {
        animation-duration: 18s, 7798ms;
        animation-delay: 0ms, 5757ms;
        }

        @keyframes move12 {
        0% {
            transform: translateX(10%) translateY(26%) scale(1);
        }
        3.8461538462% {
            transform: translateX(1%) translateY(-15%) scale(0.32);
        }
        7.6923076923% {
            transform: translateX(-34%) translateY(-24%) scale(0.47);
        }
        11.5384615385% {
            transform: translateX(39%) translateY(48%) scale(1);
        }
        15.3846153846% {
            transform: translateX(28%) translateY(42%) scale(0.92);
        }
        19.2307692308% {
            transform: translateX(-2%) translateY(49%) scale(0.56);
        }
        23.0769230769% {
            transform: translateX(-8%) translateY(-14%) scale(0.67);
        }
        26.9230769231% {
            transform: translateX(37%) translateY(-35%) scale(0.57);
        }
        30.7692307692% {
            transform: translateX(14%) translateY(-11%) scale(0.29);
        }
        34.6153846154% {
            transform: translateX(27%) translateY(-37%) scale(0.66);
        }
        38.4615384615% {
            transform: translateX(42%) translateY(36%) scale(0.62);
        }
        42.3076923077% {
            transform: translateX(6%) translateY(-43%) scale(0.82);
        }
        46.1538461538% {
            transform: translateX(47%) translateY(15%) scale(0.42);
        }
        50% {
            transform: translateX(-31%) translateY(-25%) scale(0.78);
        }
        53.8461538462% {
            transform: translateX(-16%) translateY(-4%) scale(0.64);
        }
        57.6923076923% {
            transform: translateX(38%) translateY(-11%) scale(0.45);
        }
        61.5384615385% {
            transform: translateX(18%) translateY(-34%) scale(0.88);
        }
        65.3846153846% {
            transform: translateX(31%) translateY(27%) scale(0.34);
        }
        69.2307692308% {
            transform: translateX(-42%) translateY(42%) scale(0.91);
        }
        73.0769230769% {
            transform: translateX(29%) translateY(20%) scale(0.95);
        }
        76.9230769231% {
            transform: translateX(24%) translateY(-45%) scale(0.96);
        }
        80.7692307692% {
            transform: translateX(22%) translateY(-33%) scale(0.67);
        }
        84.6153846154% {
            transform: translateX(35%) translateY(-20%) scale(0.38);
        }
        88.4615384615% {
            transform: translateX(13%) translateY(-27%) scale(0.6);
        }
        92.3076923077% {
            transform: translateX(37%) translateY(-5%) scale(0.79);
        }
        96.1538461538% {
            transform: translateX(8%) translateY(-30%) scale(0.94);
        }
        100% {
            transform: translateX(-25%) translateY(-36%) scale(0.96);
        }
        }
        .firefly:nth-child(13) {
        animation-name: move13;
        }
        .firefly:nth-child(13)::before {
        animation-duration: 10s;
        }
        .firefly:nth-child(13)::after {
        animation-duration: 10s, 10776ms;
        animation-delay: 0ms, 6964ms;
        }

        @keyframes move13 {
        0% {
            transform: translateX(-5%) translateY(14%) scale(0.8);
        }
        4.1666666667% {
            transform: translateX(-39%) translateY(-1%) scale(0.26);
        }
        8.3333333333% {
            transform: translateX(6%) translateY(14%) scale(0.34);
        }
        12.5% {
            transform: translateX(-40%) translateY(-42%) scale(0.65);
        }
        16.6666666667% {
            transform: translateX(-36%) translateY(6%) scale(0.59);
        }
        20.8333333333% {
            transform: translateX(33%) translateY(-26%) scale(0.62);
        }
        25% {
            transform: translateX(38%) translateY(-47%) scale(0.26);
        }
        29.1666666667% {
            transform: translateX(1%) translateY(-43%) scale(0.6);
        }
        33.3333333333% {
            transform: translateX(2%) translateY(40%) scale(0.64);
        }
        37.5% {
            transform: translateX(3%) translateY(47%) scale(0.75);
        }
        41.6666666667% {
            transform: translateX(33%) translateY(39%) scale(0.77);
        }
        45.8333333333% {
            transform: translateX(3%) translateY(0%) scale(0.41);
        }
        50% {
            transform: translateX(-18%) translateY(20%) scale(0.26);
        }
        54.1666666667% {
            transform: translateX(-36%) translateY(50%) scale(0.74);
        }
        58.3333333333% {
            transform: translateX(8%) translateY(-33%) scale(0.99);
        }
        62.5% {
            transform: translateX(19%) translateY(-42%) scale(0.73);
        }
        66.6666666667% {
            transform: translateX(13%) translateY(41%) scale(0.9);
        }
        70.8333333333% {
            transform: translateX(-14%) translateY(-32%) scale(0.57);
        }
        75% {
            transform: translateX(8%) translateY(41%) scale(0.55);
        }
        79.1666666667% {
            transform: translateX(38%) translateY(43%) scale(0.76);
        }
        83.3333333333% {
            transform: translateX(29%) translateY(-21%) scale(0.72);
        }
        87.5% {
            transform: translateX(15%) translateY(-2%) scale(0.78);
        }
        91.6666666667% {
            transform: translateX(36%) translateY(2%) scale(0.94);
        }
        95.8333333333% {
            transform: translateX(-36%) translateY(-16%) scale(0.93);
        }
        100% {
            transform: translateX(47%) translateY(34%) scale(1);
        }
        }
        .firefly:nth-child(14) {
        animation-name: move14;
        }
        .firefly:nth-child(14)::before {
        animation-duration: 11s;
        }
        .firefly:nth-child(14)::after {
        animation-duration: 11s, 7665ms;
        animation-delay: 0ms, 7139ms;
        }

        @keyframes move14 {
        0% {
            transform: translateX(16%) translateY(-40%) scale(0.83);
        }
        3.7037037037% {
            transform: translateX(34%) translateY(21%) scale(0.74);
        }
        7.4074074074% {
            transform: translateX(-45%) translateY(40%) scale(0.54);
        }
        11.1111111111% {
            transform: translateX(-41%) translateY(-41%) scale(1);
        }
        14.8148148148% {
            transform: translateX(46%) translateY(-18%) scale(0.58);
        }
        18.5185185185% {
            transform: translateX(-29%) translateY(0%) scale(0.94);
        }
        22.2222222222% {
            transform: translateX(39%) translateY(-28%) scale(0.96);
        }
        25.9259259259% {
            transform: translateX(48%) translateY(46%) scale(0.29);
        }
        29.6296296296% {
            transform: translateX(45%) translateY(-20%) scale(0.37);
        }
        33.3333333333% {
            transform: translateX(-14%) translateY(-44%) scale(0.3);
        }
        37.037037037% {
            transform: translateX(20%) translateY(-19%) scale(0.98);
        }
        40.7407407407% {
            transform: translateX(49%) translateY(40%) scale(0.5);
        }
        44.4444444444% {
            transform: translateX(-27%) translateY(-5%) scale(0.89);
        }
        48.1481481481% {
            transform: translateX(31%) translateY(1%) scale(0.72);
        }
        51.8518518519% {
            transform: translateX(-26%) translateY(-7%) scale(0.87);
        }
        55.5555555556% {
            transform: translateX(-42%) translateY(39%) scale(0.95);
        }
        59.2592592593% {
            transform: translateX(10%) translateY(35%) scale(0.88);
        }
        62.962962963% {
            transform: translateX(-8%) translateY(-7%) scale(0.48);
        }
        66.6666666667% {
            transform: translateX(3%) translateY(38%) scale(0.7);
        }
        70.3703703704% {
            transform: translateX(36%) translateY(39%) scale(0.77);
        }
        74.0740740741% {
            transform: translateX(12%) translateY(-9%) scale(0.31);
        }
        77.7777777778% {
            transform: translateX(-26%) translateY(10%) scale(0.49);
        }
        81.4814814815% {
            transform: translateX(-31%) translateY(1%) scale(0.46);
        }
        85.1851851852% {
            transform: translateX(-1%) translateY(21%) scale(1);
        }
        88.8888888889% {
            transform: translateX(42%) translateY(8%) scale(0.72);
        }
        92.5925925926% {
            transform: translateX(-12%) translateY(47%) scale(0.99);
        }
        96.2962962963% {
            transform: translateX(-37%) translateY(-17%) scale(0.29);
        }
        100% {
            transform: translateX(35%) translateY(20%) scale(0.38);
        }
        }
        .firefly:nth-child(15) {
        animation-name: move15;
        }
        .firefly:nth-child(15)::before {
        animation-duration: 16s;
        }
        .firefly:nth-child(15)::after {
        animation-duration: 16s, 6090ms;
        animation-delay: 0ms, 6973ms;
        }

        @keyframes move15 {
        0% {
            transform: translateX(34%) translateY(7%) scale(0.91);
        }
        3.8461538462% {
            transform: translateX(-13%) translateY(36%) scale(0.99);
        }
        7.6923076923% {
            transform: translateX(-3%) translateY(20%) scale(0.73);
        }
        11.5384615385% {
            transform: translateX(-39%) translateY(11%) scale(0.8);
        }
        15.3846153846% {
            transform: translateX(-7%) translateY(43%) scale(0.62);
        }
        19.2307692308% {
            transform: translateX(5%) translateY(-36%) scale(0.28);
        }
        23.0769230769% {
            transform: translateX(-45%) translateY(35%) scale(0.82);
        }
        26.9230769231% {
            transform: translateX(-46%) translateY(14%) scale(0.96);
        }
        30.7692307692% {
            transform: translateX(10%) translateY(3%) scale(0.29);
        }
        34.6153846154% {
            transform: translateX(-28%) translateY(6%) scale(0.35);
        }
        38.4615384615% {
            transform: translateX(-33%) translateY(-49%) scale(0.59);
        }
        42.3076923077% {
            transform: translateX(-35%) translateY(44%) scale(0.83);
        }
        46.1538461538% {
            transform: translateX(5%) translateY(12%) scale(0.53);
        }
        50% {
            transform: translateX(3%) translateY(-35%) scale(0.85);
        }
        53.8461538462% {
            transform: translateX(-17%) translateY(28%) scale(0.92);
        }
        57.6923076923% {
            transform: translateX(-44%) translateY(20%) scale(0.39);
        }
        61.5384615385% {
            transform: translateX(15%) translateY(-48%) scale(0.98);
        }
        65.3846153846% {
            transform: translateX(-26%) translateY(41%) scale(0.33);
        }
        69.2307692308% {
            transform: translateX(-12%) translateY(-14%) scale(0.69);
        }
        73.0769230769% {
            transform: translateX(11%) translateY(-22%) scale(0.46);
        }
        76.9230769231% {
            transform: translateX(27%) translateY(20%) scale(0.93);
        }
        80.7692307692% {
            transform: translateX(-4%) translateY(-49%) scale(0.82);
        }
        84.6153846154% {
            transform: translateX(-28%) translateY(-39%) scale(0.39);
        }
        88.4615384615% {
            transform: translateX(47%) translateY(-41%) scale(0.52);
        }
        92.3076923077% {
            transform: translateX(-49%) translateY(12%) scale(0.79);
        }
        96.1538461538% {
            transform: translateX(-3%) translateY(29%) scale(0.28);
        }
        100% {
            transform: translateX(22%) translateY(47%) scale(0.77);
        }
        }
        @keyframes drift {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
        }
        @keyframes flash {
        0%, 30%, 100% {
            opacity: 0;
            box-shadow: 0 0 0vw 0vw yellow;
        }
        5% {
            opacity: 1;
            box-shadow: 0 0 2vw 0.4vw yellow;
        }
        }
        </style>`)
    },
    moonSmall() {
        $('#tbl_2h3a').empty();
        $('<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png" alt="">').css({
        height: '50%',
        position: 'absolute',
        'z-index': '3',
        right: '20px',
        class: 'nexGui-theme'
        }).appendTo('#tbl_2h3a')
        $('<div class="stars nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="twinkling nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('<div class="small_clouds nexGui-theme"></div>').appendTo('#tbl_2h3a')
        $('#Khaseem-Clouds-mini').remove();

        $('body').append(`<style id="Khaseem-Clouds-mini">
        @keyframes move-background {
        from {
            -webkit-transform: translate3d(0px, 0px, 0px);
        }
        to {
            -webkit-transform: translate3d(1000px, 0px, 0px);
        }
        }
        @-webkit-keyframes move-background {
        from {
            -webkit-transform: translate3d(0px, 0px, 0px);
        }
        to {
            -webkit-transform: translate3d(1000px, 0px, 0px);
        }
        }
        @-moz-keyframes move-background {
        from {
            -webkit-transform: translate3d(0px, 0px, 0px);
        }
        to {
            -webkit-transform: translate3d(1000px, 0px, 0px);
        }
        }
        @-webkit-keyframes move-background {
        from {
            -webkit-transform: translate3d(0px, 0px, 0px);
        }
        to {
            -webkit-transform: translate3d(1000px, 0px, 0px);
        }
        }
        .background-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        }

        .stars {
        background: black url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: block;
        z-index: 0;
        }

        .twinkling {
        width: 10000px;
        height: 100%;
        background: transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png") repeat;
        background-size: cover;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        -moz-animation: move-background 70s linear infinite;
        -ms-animation: move-background 70s linear infinite;
        -o-animation: move-background 70s linear infinite;
        -webkit-animation: move-background 70s linear infinite;
        animation: move-background 70s linear infinite;
        }

        .small_clouds {
        width: 10000px;
        height: 100%;
        background: transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/clouds_repeat.png") repeat;
        background-size: 500px 500px;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 3;
        -moz-animation: move-background 150s linear infinite;
        -ms-animation: move-background 150s linear infinite;
        -o-animation: move-background 150s linear infinite;
        -webkit-animation: move-background 150s linear infinite;
        animation: move-background 150s linear infinite;
        }
        </style>`)
    },
    moonMain() {
        $('<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png" alt="">').css({
        height: '25%',
        position: 'absolute',
        'z-index': '3',
        right: '20px',
        class: 'nexGui-theme'
        }).prependTo('#output_main')
        $('<div class="stars nexGui-theme"></div>').prependTo('#output_main')
        $('<div class="twinkling nexGui-theme"></div>').prependTo('#output_main')
        $('<div class="clouds nexGui-theme"></div>').prependTo('#output_main')
        $('#output_main > .output_wrap').css({'z-index': '4',position:'relative'});
        $('#Khaseem-Clouds-main').remove();

        $('body').append(`<style id="Khaseem-Clouds-main">
        @keyframes move-background {
        from {
            -webkit-transform: translate3d(0px, 0px, 0px);
        }
        to {
            -webkit-transform: translate3d(1000px, 0px, 0px);
        }
        }
        @-webkit-keyframes move-background {
        from {
            -webkit-transform: translate3d(0px, 0px, 0px);
        }
        to {
            -webkit-transform: translate3d(1000px, 0px, 0px);
        }
        }
        @-moz-keyframes move-background {
        from {
            -webkit-transform: translate3d(0px, 0px, 0px);
        }
        to {
            -webkit-transform: translate3d(1000px, 0px, 0px);
        }
        }
        @-webkit-keyframes move-background {
        from {
            -webkit-transform: translate3d(0px, 0px, 0px);
        }
        to {
            -webkit-transform: translate3d(1000px, 0px, 0px);
        }
        }
        .background-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        }

        .stars {
        background: black url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: block;
        z-index: 0;
        }

        .twinkling {
        width: 10000px;
        height: 100%;
        background: transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png") repeat;
        background-size: cover;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        -moz-animation: move-background 70s linear infinite;
        -ms-animation: move-background 70s linear infinite;
        -o-animation: move-background 70s linear infinite;
        -webkit-animation: move-background 70s linear infinite;
        animation: move-background 70s linear infinite;
        }

        .clouds {
        width: 10000px;
        height: 100%;
        background: transparent url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/clouds_repeat.png") repeat;
        background-size: 1000px 1000px;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 3;
        -moz-animation: move-background 150s linear infinite;
        -ms-animation: move-background 150s linear infinite;
        -o-animation: move-background 150s linear infinite;
        -webkit-animation: move-background 150s linear infinite;
        animation: move-background 150s linear infinite;
        }
        </style>`)
    },
    birds() {
        $('#tbl_2h3a').empty();
        $('#Khaseem-Birds-side').remove();
        let container = $('<div class="birds-container nexGui-theme"><div>').appendTo('#tbl_2h3a')
        $('<div class="bird-container bird-container--one nexGui-theme"></div>').append('<div class="bird bird--one"></div>').appendTo(container)
        $('<div class="bird-container bird-container--two nexGui-theme"></div>').append('<div class="bird bird--two"></div>').appendTo(container)
        $('<div class="bird-container bird-container--three nexGui-theme"></div>').append('<div class="bird bird--three"></div>').appendTo(container)
        $('<div class="bird-container bird-container--four nexGui-theme"></div>').append('<div class="bird bird--four"></div>').appendTo(container)


        $('body').append(`<style id="Khaseem-Birds-side">

        .birds-container {
        z-index: 1;
        position: absolute;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        top: -50px;
        background-image: linear-gradient(to bottom, rgba(255, 168, 76, 0.6) 0%, rgba(255, 123, 13, 0.6) 100%), url("https://images.unsplash.com/photo-1446824505046-e43605ffb17f");
        background-blend-mode: soft-light;
        background-size: cover;
        background-position: center center;
        padding: 2rem;
        }

        .bird {
        background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/174479/bird-cells-new.svg);
        background-size: auto 100%;
        width: 88px;
        height: 125px;
        will-change: background-position;
        -webkit-animation-name: fly-cycle;
                animation-name: fly-cycle;
        -webkit-animation-timing-function: steps(10);
                animation-timing-function: steps(10);
        -webkit-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
        }
        .bird--one {
        -webkit-animation-duration: 1s;
                animation-duration: 1s;
        -webkit-animation-delay: -0.5s;
                animation-delay: -0.5s;
        }
        .bird--two {
        -webkit-animation-duration: 0.9s;
                animation-duration: 0.9s;
        -webkit-animation-delay: -0.75s;
                animation-delay: -0.75s;
        }
        .bird--three {
        -webkit-animation-duration: 1.25s;
                animation-duration: 1.25s;
        -webkit-animation-delay: -0.25s;
                animation-delay: -0.25s;
        }
        .bird--four {
        -webkit-animation-duration: 1.1s;
                animation-duration: 1.1s;
        -webkit-animation-delay: -0.5s;
                animation-delay: -0.5s;
        }

        .bird-container {
        position: absolute;
        top: 20%;
        left: -10%;
        transform: scale(0) translateX(-10vw);
        will-change: transform;
        -webkit-animation-name: fly-right-one;
                animation-name: fly-right-one;
        -webkit-animation-timing-function: linear;
                animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
        }
        .bird-container--one {
        -webkit-animation-duration: 30s;
                animation-duration: 15s;
        -webkit-animation-delay: 0;
                animation-delay: 0;
        }
        .bird-container--two {
        -webkit-animation-duration: 25s;
                animation-duration: 16s;
        -webkit-animation-delay: 1s;
                animation-delay: 1s;
        }
        .bird-container--three {
        -webkit-animation-duration: 20s;
                animation-duration: 14.6s;
        -webkit-animation-delay: 9.5s;
                animation-delay: 9.5s;
        }
        .bird-container--four {
        -webkit-animation-duration: 16s;
                animation-duration: 16s;
        -webkit-animation-delay: 10.25s;
                animation-delay: 10.25s;
        }

        @-webkit-keyframes fly-cycle {
        100% {
            background-position: -900px 0;
        }
        }

        @keyframes fly-cycle {
        100% {
            background-position: -900px 0;
        }
        }
        @-webkit-keyframes fly-right-one {
        0% {
            transform: scale(0.3) translateX(-10vw);
        }
        10% {
            transform: translateY(2vh) translateX(10vw) scale(0.4);
        }
        20% {
            transform: translateY(0vh) translateX(30vw) scale(0.5);
        }
        30% {
            transform: translateY(4vh) translateX(50vw) scale(0.6);
        }
        40% {
            transform: translateY(2vh) translateX(70vw) scale(0.6);
        }
        50% {
            transform: translateY(0vh) translateX(90vw) scale(0.6);
        }
        60% {
            transform: translateY(0vh) translateX(110vw) scale(0.6);
        }
        100% {
            transform: translateY(0vh) translateX(110vw) scale(0.6);
        }
        }
        @keyframes fly-right-one {
        0% {
            transform: scale(0.3) translateX(-10vw);
        }
        10% {
            transform: translateY(2vh) translateX(10vw) scale(0.4);
        }
        20% {
            transform: translateY(0vh) translateX(30vw) scale(0.5);
        }
        30% {
            transform: translateY(4vh) translateX(50vw) scale(0.6);
        }
        40% {
            transform: translateY(2vh) translateX(70vw) scale(0.6);
        }
        50% {
            transform: translateY(0vh) translateX(90vw) scale(0.6);
        }
        60% {
            transform: translateY(0vh) translateX(110vw) scale(0.6);
        }
        100% {
            transform: translateY(0vh) translateX(110vw) scale(0.6);
        }
        }
        @-webkit-keyframes fly-right-two {
        0% {
            transform: translateY(-2vh) translateX(-10vw) scale(0.5);
        }
        10% {
            transform: translateY(0vh) translateX(10vw) scale(0.4);
        }
        20% {
            transform: translateY(-4vh) translateX(30vw) scale(0.6);
        }
        30% {
            transform: translateY(1vh) translateX(50vw) scale(0.45);
        }
        40% {
            transform: translateY(-2.5vh) translateX(70vw) scale(0.5);
        }
        50% {
            transform: translateY(0vh) translateX(90vw) scale(0.45);
        }
        51% {
            transform: translateY(0vh) translateX(110vw) scale(0.45);
        }
        100% {
            transform: translateY(0vh) translateX(110vw) scale(0.45);
        }
        }
        @keyframes fly-right-two {
        0% {
            transform: translateY(-2vh) translateX(-10vw) scale(0.5);
        }
        10% {
            transform: translateY(0vh) translateX(10vw) scale(0.4);
        }
        20% {
            transform: translateY(-4vh) translateX(30vw) scale(0.6);
        }
        30% {
            transform: translateY(1vh) translateX(50vw) scale(0.45);
        }
        40% {
            transform: translateY(-2.5vh) translateX(70vw) scale(0.5);
        }
        50% {
            transform: translateY(0vh) translateX(90vw) scale(0.45);
        }
        51% {
            transform: translateY(0vh) translateX(110vw) scale(0.45);
        }
        100% {
            transform: translateY(0vh) translateX(110vw) scale(0.45);
        }
        }
        </style>`)
    }
}
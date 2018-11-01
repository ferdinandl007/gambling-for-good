var UI = pc.createScript('ui');

UI.prototype.initialize = function () {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = [
        '@media (min-width: 0px) {',
            '#playBtn { ',
            '   position: absolute;',
            '   top: calc(50% - 64px);',
            '   left: calc(50% - 121px);',
            '   cursor: pointer;',
            '   opacity: 0.75;',
            '   -webkit-touch-callout: none;',
            '   -webkit-user-select: none;',
            '   -khtml-user-select: none;',
            '   -moz-user-select: none;',
            '   -ms-user-select: none;',
            '   user-select: none;',
            '}',
            '#playBtn:hover { ',
            '   opacity: 1;',
            '}',

            '#play { ',
            '   position: absolute;',
            '   left: 2px;',
            '}',

            '#cog { ',
            '   -webkit-transition: all 1s;',
            '   -moz-transition: all 1s;',
            '   -o-transition: all 1s;',
            '   transition: all 1s;',
            '   -webkit-transform: rotate(0deg);',
            '   -moz-transform: rotate(0deg);',
            '   -ms-transform: rotate(0deg);',
            '   -o-transform: rotate(0deg);',
            '   transform: rotate(0deg);',
            '}',

            '#cog.active { ',
            '   -webkit-transform: rotate(180deg);',
            '   -moz-transform: rotate(180deg);',
            '   -ms-transform: rotate(180deg);',
            '   -o-transform: rotate(180deg);',
            '   transform: rotate(180deg);',
            '}',
        '}',

        '@media (min-width: 768px) {',
            '#playBtn { ',
            '   left: 10%;',
            '}',
        '}'
    ].join('\n');
    document.getElementsByTagName('head')[0].appendChild(style);

    var button = document.createElement('div');
    button.id = 'playBtn';

    var cog = document.createElement('img');
    cog.id = 'cog';
    cog.src = 'https://s3-eu-west-1.amazonaws.com/steampunkslots.playcanvas.com/justcog.png';
    button.appendChild(cog);

    var play = document.createElement('img');
    play.id = 'play';
    play.src = 'https://s3-eu-west-1.amazonaws.com/steampunkslots.playcanvas.com/justplay.png';
    button.appendChild(play);

    document.body.appendChild(button);

    button.addEventListener('click', function () {
        game.playSound('Lever');
        cog.classList.add('active');

        setTimeout(function () {
            game.play();
            button.style.display = 'none';
        }, 1000);
    });
};
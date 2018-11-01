var Mechanism = pc.createScript('mechanism');

Mechanism.attributes.add('multiplier', { type: 'number', default: 1 });

Mechanism.prototype.initialize = function () {
    this.spinners = [];
    for (var i = 1; i <= 4; i++) {
        this.spinners.push(this.app.root.findByName('Drum_0' + i).findByName('Symbol').script.delta);
    }

    game.once('spinStart', function () {
        this.entity.sound.slot('Drum').play();
    }.bind(this));
};

Mechanism.prototype.postUpdate = function (dt) {
    var speed = 0;
    for (var i = 0; i < 4; i++) {
        speed = Math.max(speed, this.spinners[i].getDelta());
    }

    this.entity.animation.speed = speed * this.multiplier;
    this.entity.sound.volume = speed * this.multiplier;
};
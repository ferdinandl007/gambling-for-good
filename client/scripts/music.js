var Music = pc.createScript('music');

Music.prototype.initialize = function () {
    this.initialVolume = this.entity.sound.volume;
    this.targetVolume = this.initialVolume;

    var self = this;
    game.on('spinStart', function () {
        self.targetVolume = self.initialVolume / 2;
    });

    game.on('spinEnd', function () {
        self.targetVolume = self.initialVolume;
    });
};

Music.prototype.update = function (dt) {
    var volume = this.entity.sound.volume;
    if (this.targetVolume === volume) return;

    this.entity.sound.volume = pc.math.lerp(volume, this.targetVolume, dt * 2);
};
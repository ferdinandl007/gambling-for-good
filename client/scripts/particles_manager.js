var ParticlesManager = pc.createScript('particlesManager');

ParticlesManager.prototype.initialize = function () {
    this.motorLeft = this.entity.findByName('MotorLeft').particlesystem;
    this.motorRight = this.entity.findByName('MotorRight').particlesystem;

    var self = this;
    game.on('spinStart', function () {
        self.motorLeft.loop = true;
        self.motorLeft.play();

        self.motorRight.loop = true;
        self.motorRight.play();
    }); 

    game.on('spinEnd', function () {
        self.motorLeft.loop = false;
        self.motorLeft.stop(); 

        self.motorRight.loop = false;
        self.motorRight.stop();
    });
};
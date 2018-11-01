pc.Vec3.prototype.setRandomInSphere = function (radius) {
    radius = radius || 1;
    var r = Math.random() * radius;
    var phi = Math.random() * Math.PI;
    var theta = Math.random() * Math.PI * 2;
    var x = r * Math.cos(theta) * Math.sin(phi);
    var y = r * Math.sin(theta) * Math.sin(phi);
    var z = r * Math.cos(phi);
    return this.set(x, y, z);
};

var Shake = pc.createScript('shake');

Shake.attributes.add('duration', { type: 'number', default: 1 });
Shake.attributes.add('amount', { type: 'number', default: 0.7 });

Shake.prototype.initialize = function () {
    this.offset = new pc.Vec3();
    this.originalPos = this.entity.getLocalPosition().clone();
};

Shake.prototype.doShake = function () {
    this.timer = this.duration;
};

Shake.prototype.postUpdate = function (dt) {
    this.entity.setLocalPosition(this.originalPos);
    if (this.timer > 0) {
        this.offset.setRandomInSphere().scale(this.amount * this.timer);
        this.entity.translateLocal(this.offset);
        this.timer -= dt;
    }
};
var easingFuncs = [
    [TWEEN.Easing.Linear.None, TWEEN.Easing.Linear.None, TWEEN.Easing.Linear.None],
    [TWEEN.Easing.Quadratic.In, TWEEN.Easing.Quadratic.Out, TWEEN.Easing.Quadratic.InOut],
    [TWEEN.Easing.Cubic.In, TWEEN.Easing.Cubic.Out, TWEEN.Easing.Cubic.InOut],
    [TWEEN.Easing.Quartic.In, TWEEN.Easing.Quartic.Out, TWEEN.Easing.Quartic.InOut],
    [TWEEN.Easing.Quintic.In, TWEEN.Easing.Quintic.Out, TWEEN.Easing.Quintic.InOut],
    [TWEEN.Easing.Sinusoidal.In, TWEEN.Easing.Sinusoidal.Out, TWEEN.Easing.Sinusoidal.InOut],
    [TWEEN.Easing.Exponential.In, TWEEN.Easing.Exponential.Out, TWEEN.Easing.Exponential.InOut],
    [TWEEN.Easing.Circular.In, TWEEN.Easing.Circular.Out, TWEEN.Easing.Circular.InOut],
    [TWEEN.Easing.Elastic.In, TWEEN.Easing.Elastic.Out, TWEEN.Easing.Elastic.InOut],
    [TWEEN.Easing.Back.In, TWEEN.Easing.Back.Out, TWEEN.Easing.Back.InOut],
    [TWEEN.Easing.Bounce.In, TWEEN.Easing.Bounce.Out, TWEEN.Easing.Bounce.InOut]
];

var Tween = pc.createScript('tween');

Tween.attributes.add('startTime', { type: 'number', default: 0 });
Tween.attributes.add('duration', { type: 'number', default: 1 });
Tween.attributes.add('startPos', { type: 'vec3', default: [0, 0, 0] });
Tween.attributes.add('endPos', { type: 'vec3', default: [0, 0, 0] });
Tween.attributes.add('startRot', { type: 'vec3', default: [0, 0, 0] });
Tween.attributes.add('endRot', { type: 'vec3', default: [0, 0, 0] });
Tween.attributes.add('startScale', { type: 'vec3', default: [1, 1, 1] });
Tween.attributes.add('endScale', { type: 'vec3', default: [1, 1, 1] });
Tween.attributes.add('easing', { 
    type: 'number',
    enum: [
        { 'Linear': 0 },
        { 'Quadratic': 1 },
        { 'Cubic': 2 },
        { 'Quartic': 3 },
        { 'Quintic': 4 },
        { 'Sinusoidal': 5 },
        { 'Exponential': 6 },
        { 'Circular': 7 },
        { 'Elastic': 8 },
        { 'Back': 9 },
        { 'Bounce': 10 }
    ]
});
Tween.attributes.add('inOut', { 
    type: 'number',
    enum: [
        { 'In': 0 },
        { 'Out': 1 },
        { 'InOut': 2 }
    ]
});

// initialize code called once per entity
Tween.prototype.initialize = function() {
    this.timer = this.startTime;
    this.startPos.copy(this.entity.getPosition());
    this.startRot.copy(this.entity.getEulerAngles());
    this.startScale.copy(this.entity.getLocalScale());
    this.endPos.copy(this.entity.getPosition());
    this.endRot.copy(this.entity.getEulerAngles());
    this.endScale.copy(this.entity.getLocalScale());
    this.createTween();

    this.on('attr', function (name, value, prev) {
        this.createTween();
    });
};

Tween.prototype.createTween = function () {
    var e = this.entity;
    this.started = false;
    this.timer = this.startTime;
    this.tween = new TWEEN.Tween( { px: this.startPos.x, py: this.startPos.y, pz: this.startPos.z,
                                    rx: this.startRot.x, ry: this.startRot.y, rz: this.startRot.z,
                                    sx: this.startScale.x, sy: this.startScale.y, sz: this.startScale.z } )
        .to( { px: this.endPos.x, py: this.endPos.y, pz: this.endPos.z,
               rx: this.endRot.x, ry: this.endRot.y, rz: this.endRot.z,
               sx: this.endScale.x, sy: this.endScale.y, sz: this.endScale.z }, Math.floor(this.duration * 1000) )
        .easing(easingFuncs[this.easing][this.inOut])
        .onUpdate( function () {
            e.setPosition(this.px, this.py, this.pz);
            e.setEulerAngles(this.rx, this.ry, this.rz);
            e.setLocalScale(this.sx, this.sy, this.sz);
        });

    return this.tween;
};

// Called every frame, dt is time in seconds since last update
Tween.prototype.update = function (dt) {
    this.timer -= dt;
    if ((this.timer <= 0) && !this.started) {
        this.tween.start();
        this.started = true;
    }
};
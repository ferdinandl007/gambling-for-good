var temp2 = new pc.Vec2();

var Lever = pc.createScript('lever');

Lever.attributes.add('sensitivity', { type: 'number', default: 0.5 });
Lever.attributes.add('returnSpeed', { type: 'number', default: 5 });

Lever.prototype.initialize = function () {
    this.startTouch = 0;
    this.currentTouch = 0;
    this.isDragging = false;
    this.disable = true;
    this.reachedBottom = false;

    var app = this.app;
    app.mouse.on('mousedown', this.onMouseDown, this);
    app.mouse.on('mousemove', this.onMouseMove, this);
    app.mouse.on('mouseup', this.onMouseUp, this);

    if (app.touch) {
        app.touch.on('touchstart', this.onTouchStart, this);
        app.touch.on('touchmove', this.onTouchMove, this);
        app.touch.on('touchend', this.onTouchEnd, this);
    }

    game.on('play', function () {
        this.disable = false;
    }.bind(this));

    // disable lever movement while spin in progress
    game.on('spinStart', function () {
        this.disable = true;
    }.bind(this));

    game.on('spinEnd', function () {
        this.disable = false;
    }.bind(this));
};

Lever.prototype.onMouseDown = function (evt) {
    if (evt.button !== 0 || this.disable) return;

    this.isDragging = true;
    this.startTouch = evt.y;
    this.currentTouch = this.startTouch;
};

Lever.prototype.onMouseMove = function (evt) {
    if (! this.isDragging) return;

    this.currentTouch = evt.y;
};

Lever.prototype.onMouseUp = function (evt) {
    if (evt.button !== 0) return;

    if (this.isDragging) {
        this.isDragging = false;
        this.releaseLever();
    }
};
        
Lever.prototype.onTouchStart = function (evt) {
    var e = evt.event;
    if (e.touches.length > 1 || this.disable) return;

    this.isDragging = true;
    var touch = e.touches[0];
    this.startTouch = touch.clientY;
    this.currentTouch = this.startTouch;
};
        
Lever.prototype.onTouchMove = function (evt) {
    var e = evt.event;
    if (e.touches.length > 1) return;

    var touch = e.touches[0];
    this.currentTouch = touch.clientY;
};

Lever.prototype.onTouchEnd = function (evt) {
    var e = evt.event;
    if (e.touches.length === 0 && this.isDragging) {
        this.isDragging = false;
        this.releaseLever();
    }
};

// Rotate level depending on how far user dragged
Lever.prototype.dragLever = function () {
    if (this.reachedBottom) return;

    var amount = pc.math.clamp((this.currentTouch - this.startTouch) * this.sensitivity, 0, 90);
    this.entity.setLocalEulerAngles(amount, 0, 0);
    if (amount > 85) {
        this.reachedBottom = true;

        game.playSound('Lock');
    }
};

// Releases lever - if lever was dragged far enough then spin
Lever.prototype.releaseLever = function () {
    if (this.reachedBottom) {
        this.reachedBottom = false;

        game.playSound('Lever');

        this.fire('leverPulled');
    }
};

// Returns lever to starting position
Lever.prototype.returnLever = function (dt) {
    var angles = this.entity.getLocalEulerAngles();
    angles.x = pc.math.lerp(angles.x, 0, dt * this.returnSpeed);
    this.entity.setLocalEulerAngles(angles);
};

Lever.prototype.update = function (dt) {
    if (this.isDragging) {
        this.dragLever();
    } else {
        this.returnLever(dt);
    }
};
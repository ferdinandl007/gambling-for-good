var SYMBOL_COUNT               = 12;
var DISTINCT_SYMBOL_COUNT      = 3;
var INITIAL_SYMBOL_POSITION    = 36;
var SYMBOL_SPACING             = 360 / SYMBOL_COUNT;
var OVERSPIN                   = 360;
var DELAY_FACTOR               = 0.4;
var SPIN_DURATION              = 3;
var SPIN_EASING                = 1;
var SPIN_INOUT                 = 2;

var RANDOMNESS = [];
var RANDOMNESS_INDEX = 0;

var getRandomSymbolIndex =  function () {
    // lol, using Math.random() for slot gambling logic
    return Math.floor(Math.random() * SYMBOL_COUNT);
};

// predefine symbol order so that we predictably win
// every few times (for demo purposes)
for (var times = 0; times < 4; times++) {

    // all random for the first 2 times
    for (var i = 0; i < 8; i++) {
        RANDOMNESS.push(getRandomSymbolIndex());
    }

    // win on the 3rd time
    var randomSymbol = getRandomSymbolIndex();
    for (var j = 0; j < 4; j++) {
        RANDOMNESS.push(randomSymbol);
    }    
}

var Spin = pc.createScript('spin');

Spin.attributes.add('speed', { type: 'number', default: 20 });
Spin.attributes.add('delayOrder', { type: 'number', default: 0 });

Spin.prototype.initialize = function () {
    this.entity.setLocalEulerAngles(INITIAL_SYMBOL_POSITION, 0, 0);
};

Spin.prototype.getTargetAngleForSymbolIndex = function (index) {
    return (OVERSPIN * (this.delayOrder + 1)) + INITIAL_SYMBOL_POSITION + (index * SYMBOL_SPACING);
};

Spin.prototype.getTargetAngleForRandomSymbol = function () {
    return this.getTargetAngleForSymbolIndex(getRandomSymbolIndex());
};

Spin.prototype.spinToSymbolAtIndex = function (index) {
    var tween = this.entity.script.tween;
    var targetAngle = this.getTargetAngleForSymbolIndex(index);

    tween.startRot   = this.entity.getLocalEulerAngles();
    tween.endRot     = new pc.Vec3(targetAngle, 0, 0);
    tween.easing     = SPIN_EASING;
    tween.duration   = SPIN_DURATION;
    tween.startTime  = DELAY_FACTOR * this.delayOrder;

    tween.createTween().onComplete(function () {
        this.fire('spinFinished', index % DISTINCT_SYMBOL_COUNT );
    }.bind(this));
};

Spin.prototype.spinToRandomSymbol = function () {
    var symbolIndex = RANDOMNESS[RANDOMNESS_INDEX];
    RANDOMNESS_INDEX = (RANDOMNESS_INDEX + 1) % RANDOMNESS.length;
    this.spinToSymbolAtIndex(symbolIndex);
};
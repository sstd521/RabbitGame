cc.Class({
    extends: cc.Component,

    properties: {
        gravity: -1000,
        jumpHeight: 0,//跳高
        jumpDuring: 0,//持续时间
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(2000, 2000),
        mushroom_catch_Audio: {
            default: null,
            url: cc.AudioClip
        },
        mushroom_appear_Audio: {
            default: null,
            url: cc.AudioClip
        }
    },
    setJumpAction: function ()
        {
            var fadeIn   = cc.fadeIn(0);
            // var fadeOut = cc.fadeOut(1);
            var jumpUp = cc.moveBy(this.jumpDuring, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());// 先快后慢
             // var moveRight = cc.moveBy( cc.p(10, 0));
            // var callback = cc.callFunc(this.playJumpSound,this);
            // return cc.sequence(callback,fadeIn,jumpUp, jumpDown,fadeOut);

            return cc.sequence(fadeIn,jumpUp);
        },
    // use this for initialization
    onLoad: function () {
        this.touchingNumber = 0;
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        // collisionManager.enabledDebugDraw = true;
        cc.audioEngine.play(this.mushroom_appear_Audio, false, Global.volume);
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        // this.scheduleOnce(function ()
        // {
        //     // 这里的 this 指向 component
        //     this.node.removeFromParent();
        // },3);
    },
    onCollisionEnter: function (other, self)
        {

            var otherAabb = other.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();

            var selfAabb = self.world.aabb;
            var selfPreAabb = self.world.preAabb.clone();
            selfPreAabb.y = selfAabb.y;
            otherPreAabb.y = otherAabb.y;
            if (other.tag == 2||other.tag == 3||other.tag == 5)
                {
                    this.touchingNumber++;
                }
            if (other.tag == 0)
            {
                cc.audioEngine.play(this.mushroom_catch_Audio, false, Global.volume);
                Global.addSpeed = 1.2;//玩家1.2倍速度
                this.scheduleOnce(function ()
                {
                    // console.log('mushroom onCollisionEnter');
                    this.node.removeFromParent();
                }, 0.2);
            }
            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb))
                {

                }
        },
    onCollisionExit: function (other)
        {

            if (other.tag == 2||other.tag == 3||other.tag == 5)
                {
                    this.touchingNumber--;
                }

        },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // console.log("this.touchingNumber: " + this.touchingNumber);
        // if (this.collisionY === 0)
        if (this.touchingNumber === 0)
            {
                this.speed.y += this.gravity * dt;
                if (Math.abs(this.speed.y) > this.maxSpeed.y)
                    {
                        this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
                    }
            }
        // this.node.x++;
        // this.node.y += this.speed.y * dt;
    },
});

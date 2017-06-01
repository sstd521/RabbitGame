var Enemy = cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.v2(0, 0),
        scaleX: 1,
        canMove: true,
        dieAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    onLoad: function ()
        {
            this.node.scaleX = 1;
            cc.director.getCollisionManager().enabled = true;
            // cc.director.getCollisionManager().enabledDebugDraw = true;
            this.anim = this.getComponent(cc.Animation);
        },
    onCollisionEnter: function (other, self)
        {
            if (!Global.enemyIsAlive)
                {
                    this.todie();
                    Global.enemyIsAlive = true;
                }
            if (other.tag == 5)
                {
                    this.turn();
                    this.speed.x = -this.speed.x;
                }
            var otherAabb = other.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();

            var selfAabb = self.world.aabb;
            var selfPreAabb = self.world.preAabb.clone();
            selfPreAabb.y = selfAabb.y;
            otherPreAabb.y = otherAabb.y;

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb))
                {
                    if (selfPreAabb.yMax < otherPreAabb.yMax&&other.node.group=='rabbit')
                        {
                            this.todie();
                        }
                }
        },
    todie(){
        cc.audioEngine.play(this.dieAudio, false, Global.volume);
        this.anim.play('beetled');
        this.canMove = false;
        this.node.height = this.node.height * 0.3;
        // this.node.y = 0.5*this.node.y;
        // var action = cc.fadeOut(1.0);
        this.node.runAction(cc.fadeOut(.5));

        this.scheduleOnce(function ()
        {
            // 这里的 this 指向 component
            this.node.removeFromParent();
        }, 0.5);
    },
    update: function (dt)
        {
            if (this.canMove)
                {
                    this.node.x -= this.speed.x * dt;
                }
        },
    turn()
        {
            // this.speedX = -100;
            this.node.scaleX = -this.node.scaleX;
        },


});

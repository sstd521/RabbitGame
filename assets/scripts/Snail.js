var Enemy = cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(2000, 2000),
        scaleX: 1,
        hurtNum: 0,
        gravity: -1000,
        isAlive: true,
        canMove: true,
        dieAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    onLoad: function ()
        {
            this.touchingNumber = 0;
            this.node.scaleX = 1;
            cc.director.getCollisionManager().enabled = true;
            // cc.director.getCollisionManager().enabledDebugDraw = true;
            this.anim = this.getComponent(cc.Animation);
        },
    onCollisionEnter: function (other, self)
        {
            if (other.node.group == 'snailBlock')
                {
                    // console.log('snailBlock.tag == 8');
                    if (this.isAlive)
                        {
                            this.turn();
                            this.speed.x = -this.speed.x;
                            return;
                        }
                }
            if (other.node.group == 'enemy'&&!this.isAlive)
            {
                // console.log('great');
                Global.enemyIsAlive = false;
            }

            if (other.tag == 5)//木桩
                {
                    this.touchingNumber++;
                    this.speed.x = -this.speed.x;
                    this.turn();
                    // console.log('this.touchingNumber++: ' + this.touchingNumber++);
                }


            var otherAabb = other.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();

            var selfAabb = self.world.aabb;
            var selfPreAabb = self.world.preAabb.clone();
            selfPreAabb.y = selfAabb.y;
            otherPreAabb.y = otherAabb.y;

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb))
                {
                    if (selfPreAabb.yMax < otherPreAabb.yMax)// 兔子和蜗牛
                        {
                            if (other.node.group =='rabbit'&&this.hurtNum ==0)
                            {
                                cc.audioEngine.play(this.dieAudio, false, Global.volume);
                            }
                            this.hurtNum++;
                            this.anim.play('snaild');
                            // console.log('this.hurtNum===========' + this.hurtNum);
                            if (this.hurtNum == 1)
                                {
                                    this.canMove = false;
                                    this.isAlive = false;
                                } else
                                {
                                    this.canMove = true;
                                    this.speed.x = 500;
                                }
                            console.log('this.canMove: ' + this.canMove);
                        }
                    if (selfPreAabb.xMax > otherPreAabb.xMax)
                        {

                            this.turn();
                            this.speed.x = -this.speed.x;
                        }
                    if (selfPreAabb.xMin < otherPreAabb.xMin)
                        {
                            this.turn();
                            this.speed.x = -this.speed.x;
                        }

                }

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb))
                {
                    if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax))
                        {
                            this.node.y = otherPreAabb.yMax - this.node.parent.y;

                        }
                    else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin))
                        {
                            this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y;
                        }

                    this.speed.y = 0;
                }
        },
    onCollisionExit: function (other)
        {

            if (other.tag == 5)
                {
                    this.touchingNumber--;
                }
        },
    update: function (dt)
        {
            // console.log('this.touchingNumber-----' + this.touchingNumber);
            if (this.canMove)
                {
                    this.node.x -= this.speed.x * dt;
                }
            if (this.touchingNumber === 0)
                {
                    this.speed.y += this.gravity * dt;
                    if (Math.abs(this.speed.y) > this.maxSpeed.y)
                        {
                            this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
                        }
                }
            this.node.y += this.speed.y * dt;
        },
    turn()
        {
            this.node.scaleX = -this.node.scaleX;
        },

});


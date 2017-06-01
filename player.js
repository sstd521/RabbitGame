let Direction = cc.Enum({
    left: -1,
    none: 0,
    right: 1,
    up: 2,
    down: 3,
});

cc.Class({
    extends: cc.Component,

    properties: {
        rabbit: {
            default: null,
            type: cc.AnimationClip,
        },
        speed: cc.v2(0, 0),
        speedX: 100,
        speedY: 100,
        jumpSpeed: 300,
        gravity: -1000,
        collisionX: 0, //检测Y轴方向是否发生碰撞
        collisionY: 0,
        prePosition: cc.v2(0, 0), //上一帧的坐标
        addSpeed: 600,
        maxSpeed: cc.v2(10, 1000),
        minPosY: 126,
        drag: 1000,
        anim: null,
        direction: {
            default: Direction.none,
            type: Direction
        },//控制 方向，只有左右
        // dir:{
        //     default:direction.right,
        //     type:direction
        // }
    },

    // use this for initialization
    onLoad () {

        this.prePosition.x = this.node.x;
        this.prePosition.y = this.node.y;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.moveXDirection = null;
        this.moveYDirection = null;
        this.anim = this.getComponent(cc.Animation);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown (event) {
        switch (event.keyCode)
        {
            case cc.KEY.up:
            case cc.KEY.w:
                // this.node.y += this.speedX;
                if (this.direction !== Direction.up)
                    {
                        this.anim.play("player_jump");
                        this.direction = Direction.up;
                    }
                        break;
            case cc.KEY.a:
            case cc.KEY.left:
                //console.log('turn left');
                // this.dir = direction.left;
                // if (this.direction !== Direction.left)
                //     {
                        this.anim.play("player_walk");
                        this.turnLeft();
                        this.direction = Direction.left;
                        break;
                    // }
            case cc.KEY.d:
            case cc.KEY.right:
                //console.log('turn right');
                //this.dir = direction.right;
                if (this.direction !== Direction.right)
                    {
                        this.anim.play("player_walk");
                        this.turnRight();
                        this.direction = Direction.right;
                    }
                        break;
            case cc.KEY.down:
            case cc.KEY.s:
                if (this.direction === Direction.none)
                    {
                        this.anim.play("player_hunker");
                        this.node.y = 170;
                        this.direction = Direction.down;
                    }
                        break;
        }


    },
    onKeyUp: function (event)
        {
            // while(this.node.y>176)
            // this.node.y += this.speedY * dt;

            switch (event.keyCode)
            {
                case cc.KEY.up:
                case cc.KEY.w:
                    if (this.direction === Direction.up)
                        {
                            this.direction = Direction.none;
                        }
                    break;
                case cc.KEY.a:
                case cc.KEY.left:
                    if (this.direction === Direction.left)
                        {
                            this.direction = Direction.none;
                        }
                    break;
                case cc.KEY.d:
                case cc.KEY.right:
                    if (this.direction === Direction.right)
                        {
                            this.direction = Direction.none;
                        }
                    break;
                case cc.KEY.s:
                case cc.KEY.down:
                    if (this.direction === Direction.down)
                        {
                            this.direction = Direction.none;
                        }
                    break;
            }


            // this.node.y = 176
            //if (event.keyCode !== cc.KEY.up)
            // if (event.keyCode === this.moveXDirection)
            //     this.moveXDirection = null;
            // if (event.keyCode === this.moveYDirection)
            //     this.moveYDirection = null;
            // if (this.moveYDirection === null || this.moveXDirection === null)
            //     this.anim.play("player_idle");
        },
// called every frame
    update(dt)
        {
            if (this.collisionY === 0) //没任何碰撞，计算重力
                {
                    // if (this.node.y > 176)
                    //     this.node.y += this.gravity * dt;
                    // else
                    //     this.node.y = 176;

                    this.speed.y += this.gravity * dt;
                    if (Math.abs(this.speed.y) > this.maxSpeed.y)
                        {
                            this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
                        }

                    switch (this.direction)
                    {
                        case (Direction.none):
                            this.anim.play("player_idle");
                            break;
                        case (Direction.up):
                            console.log("Direction.up");
                            this.node.y += this.speedY * dt;
                            break;
                        case(Direction.left):
                            console.log("Direction.left");
                            this.node.x += this.speedX * dt;
                            break;
                        case(Direction.right):
                            console.log("Direction.right");
                            this.node.x += this.speedX * dt;
                            break;
                    }


                }

            // switch (this.moveXDirection)
            // {
            //     case cc.KEY.right:
            //     case cc.KEY.d:
            //     // this.node.x += this.speedX * dt;
            //     // break;
            //     case cc.KEY.a:
            //     case cc.KEY.left:
            //         this.node.x += this.speedX * dt;
            //         break;
            // }
        },

    turnLeft()
        {
            this.speedX = -100;
            this.node.scaleX = -1;
        },

    turnRight()
        {
            this.speedX = 100;
            this.node.scaleX = 1;
        },
});

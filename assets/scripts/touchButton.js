cc.Class({
    extends: cc.Component,

    properties: {
        leftButton:cc.Node,
        rightButton:cc.Node,
        downButton:cc.Node,
        jumpButton:cc.Node,
        player:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.leftButton.on('touchstart', this.leftButtonTouchstart, this);//当手指触点落在目标节点区域内时
        this.leftButton.on('touchend', this.leftButtonTouchend, this);//当手指在目标节点区域内离开屏幕时
        this.leftButton.on('touchcancel', this.leftButtonTouchcancel, this);//当手指在目标节点区域外离开屏幕时
        this.rightButton.on('touchstart', this.rightButtonTouchstart, this);
        this.rightButton.on('touchend', this.rightButtonTouchend, this);
        this.rightButton.on('touchcancel', this.rightButtonTouchcancel, this);
        this.downButton.on('touchstart', this.downButtonTouchstart, this);
        this.downButton.on('touchend', this.downButtonTouchend, this);
        this.downButton.on('touchcancel', this.downButtonTouchcancel, this);
        this.jumpButton.on('touchstart', this.jumpButtonTouchstart, this);
        this.jumpButton.on('touchend', this.jumpButtonTouchend, this);
        this.jumpButton.on('touchcancel', this.jumpButtonTouchcancel, this);
        this.playerScript = this.player.getComponent('Player');
    },

    leftButtonTouchstart(){
        this.playerScript.playerLeft();
    },
    leftButtonTouchend(){
        this.playerScript.noLRControlPlayer();
    },
    leftButtonTouchcancel(){
        this.playerScript.noLRControlPlayer();
    },
    rightButtonTouchstart(){
        this.playerScript.playerRight();
    },
    rightButtonTouchend(){
        this.playerScript.noLRControlPlayer();
    },
    rightButtonTouchcancel(){
        this.playerScript.noLRControlPlayer();
    },
    downButtonTouchstart(){
        this.playerScript.playerDown();
    },
    downButtonTouchend(){
        this.playerScript.noDownControlPlayer();
    },
    downButtonTouchcancel(){
        this.playerScript.noDownControlPlayer();
    },
    jumpButtonTouchstart(){
        this.playerScript.playerUp();
    },
    jumpButtonTouchend(){
        this.playerScript.noUpControlPlayer();
    },
    jumpButtonTouchcancel(){
        this.playerScript.noUpControlPlayer();
    },
    player_idle(){
        this.anim.play("player_idle");
    },
    player_walk(){
        this.anim.play("player_walk");
    },
    player_jump(){
        this.anim.play("player_jump");
    },
    player_hunker(){
        this.anim.play("player_hunker");
    },
    rabbitJump () {
        this.anim.play("player_jump");
        this.speed.y = this.jumpSpeed * 0.5;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

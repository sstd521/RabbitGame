cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 0,//跳高
        jumpDuring: 0,//持续时间
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        }
    },
    setJumpAction: function ()
        {
            var fadeIn   = cc.fadeIn(0);
            var fadeOut = cc.fadeOut(1);
            var jumpUp = cc.moveBy(this.jumpDuring, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());// 先快后慢
            var jumpDown = cc.moveBy(this.jumpDuring, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());//缓动 先慢后快
            // var callback = cc.callFunc(this.playJumpSound,this);
            // return cc.sequence(callback,fadeIn,jumpUp, jumpDown,fadeOut);
            return cc.sequence(fadeIn,jumpUp, jumpDown,fadeOut);
        },
    onLoad: function ()
        {
            this.jumpAction = this.setJumpAction();

            this.node.runAction(this.jumpAction);
            // this.node.removeFromParent();
            this.scheduleOnce(function ()
            {
                // 这里的 this 指向 component
                this.node.removeFromParent();
            }, 1);
            // var seq = cc.sequence(cc.moveBy(1, 0, 200), cc.moveBy(1, 0,-200));
            // this.node.runAction(seq);
        },
});

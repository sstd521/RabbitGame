cc.Class({
    extends: cc.Component,

    properties: {

        level2Sprite: cc.Node,
    },

    // use this for initialization
    onLoad: function ()
        {
            if (Global.level2Open)
            {
                this.level2Sprite.active = false;
            }
            if (!this.level2Sprite.active)
            {
                var scaleTo = cc.scaleTo(.8, .9);
                var reverse = cc.scaleTo(.8, 1);
                var seq = cc.sequence(scaleTo, reverse);
                var repeat = cc.repeatForever(seq);
                this.node.runAction(repeat);
                this.node.on(cc.Node.EventType.TOUCH_START, function ()
                {
                    cc.director.loadScene("Main");
                });
            }
        },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc.Class({
    extends: cc.Component,

    properties: {
        menu_music: {
            default: null,
            url: cc.AudioClip
        }

    },

    // use this for initialization
    onLoad: function () {
        cc.audioEngine.stopAll();
        cc.audioEngine.play(this.menu_music, true, Global.volume);
        if (!Global.level2Open)
        {
            var scaleTo = cc.scaleTo(.8, .9);
            var reverse = cc.scaleTo(.8, 1);
            var seq = cc.sequence(scaleTo, reverse);
            var repeat = cc.repeatForever(seq);
            this.node.runAction(repeat);
        }
        this.node.on(cc.Node.EventType.TOUCH_START, function ()
        {
            cc.director.loadScene("Main");
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

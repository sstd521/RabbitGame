cc.Class({
    extends: cc.Component,

    properties: {
        clickAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function ()
        {

            this.node.on("touchstart",function ()
            {
                cc.audioEngine.play(this.clickAudio, false, Global.volume);
                cc.director.resume();
                cc.director.loadScene("LevelMenu");
                cc.find('toLevelMenu').active = false;
            });
        },
});

cc.Class({
    extends: cc.Component,

    properties: {
        high_score_Audio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function ()
        {
            cc.director.getCollisionManager().enabled = true;
        },
    onCollisionEnter: function (other, self)
        {
            this.scheduleOnce(function ()
            {
                cc.audioEngine.play(this.high_score_Audio, false, Global.volume);
            }, 2);
            cc.director.loadScene('LevelMenu');
            Global.level2Open = true;
        }
});

cc.Class({
    extends: cc.Component,

    properties: {
        // resumeNode: cc.Node,
        clickAudio: {
            default: null,
            url: cc.AudioClip
        }
    },
    onLoad(){
        // cc.game.addPersistRootNode(this.node);

    },
    // use this for initialization
    start: function ()
        {
            this.node.on(cc.Node.EventType.TOUCH_START, function ()
            {
                // this.scheduleOnce(function ()
                // {
                //     cc.audioEngine.play(this.clickAudio, false, 1);
                // }, 1);
                if (cc.director.isPaused())
                    {
                        cc.director.resume();
                        cc.audioEngine.resumeAll();
                        cc.find('ResumeButton').active = false;
                        cc.find('PauseButton').active = true;
                    } else
                    {
                        cc.audioEngine.pauseAll();
                        cc.director.pause();
                        cc.find('ResumeButton').active = true;
                        cc.find('PauseButton').active = false;
                    }
            });
        },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel: {
            default: null,
            type: cc.Label,
        },
        timeout:cc.Label,
        gameTime: 400,
    },

    // use this for initialization
    onLoad: function ()
        {

                    this.schedule(function ()
                    {
                        if (Global.playIsAlive)
                            {
                                this.gameTime--;
                                this.timeLabel.string = '' + this.gameTime;
                                // this.timeLabel.node.zIndex = 10;
                                if (this.gameTime <= 0)
                                    {
                                        Global.playIsAlive = false;
                                        this.timeout.string = 'Time out !'
                                        // cc.director.pause();
                                        // cc.director.loadScene("GameOver");
                                        // cc.audioEngine.stopAll();
                                        // cc.audioEngine.play(this.dieAudio,false);
                                    }
                            }
                    }, 1);
        },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

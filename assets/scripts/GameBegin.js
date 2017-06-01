cc.Class({
    extends: cc.Component,

    properties: {
        underGroundAudio: {
            default: null,
            url: cc.AudioClip
        },
        slider_h: cc.Slider,
        music: cc.AudioSource,
    },
    onLoad: function ()
        {
            this.slider_h.progress = 0;
            this._updateMusicVolume(this.slider_h.progress);
            cc.audioEngine.stopAll();
            cc.audioEngine.play(this.underGroundAudio, true, Global.volume);
            var scaleTo = cc.scaleTo(.8, .9);
            var reverse = cc.scaleTo(.8, 1);
            var seq = cc.sequence(scaleTo, reverse);
            var repeat = cc.repeatForever(seq);
            this.node.runAction(repeat);
            this.node.on("touchstart", function ()
            {
                cc.director.loadScene("LevelMenu");
            })
        },
    onSliderHEvent (sender, eventType) {
        this._updateMusicVolume(sender.progress);
    },
    _updateMusicVolume (progress) {
        this.music.volume = progress;
        Global.volume = this.music.volume;
        // console.log('this.music.volume: ' + progress);
    },
    endGame(){
        cc.game.end();
    },
    toActiveVolumeBar(){
        cc.find('over').active = true;
    },
    disActiveVolumeBar(){
        cc.find('over').active = false;
    },
    // use this for initialization
    // update(){
    //     console.log('Global.volume: ' + Global.volume);
    // },
});

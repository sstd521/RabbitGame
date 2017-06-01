var storageManager = require("storageManager");
cc.Class({
    extends: cc.Component,

    properties: {
        gold_label: cc.Label,
        coinNum: 0,
        hightestScoreLabel:cc.Label,
        coinAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        this.hightestScoreLabel.string = "最高分: " + storageManager.getHighestScore();
        // cc.find('HighScore/Score').string = "最高分: " + storageManager.getHighestScore();
    },
    addCoin: function() {
        cc.audioEngine.play(this.coinAudio, false,Global.volume);
        this.coinNum++;
        this.gold_label.string = this.coinNum + "";
        if(storageManager.getHighestScore()<this.coinNum){
            storageManager.setHighestScore(this.coinNum);
            this.changeHightestScoreLabel();
        }
    },
    changeHightestScoreLabel(){
        this.hightestScoreLabel.string = "最高分: " + storageManager.getHighestScore();
        // cc.find('HighScore/Score').string = "最高分: " + storageManager.getHighestScore();
    },
});

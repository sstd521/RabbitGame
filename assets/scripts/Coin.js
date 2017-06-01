var storageManager = require("storageManager");
cc.Class({
    extends: cc.Component,

    properties: {
        coin_label: cc.Label,
        coinNum: 0,
        hightestScoreLabel:cc.Label,
    },

    // use this for initialization
    onLoad: function ()
        {

        },

    addCoin: function ()
        {
            this.coinNum++;
            this.coin_label.string = this.coinNum + "";
            if(storageManager.getHighestScore()<this.coinNum){
                storageManager.setHighestScore(this.coinNum);
                this.changeHightestScoreLabel();
            }
        },
    changeHightestScoreLabel(){
        this.hightestScoreLabel.string = "最高分:" + storageManager.getHighestScore();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function ()
        {


            this.schedule(function ()
            {
                var scaleTo = cc.scaleTo(.8, .9);
                var reverse = cc.scaleTo(.8, 1);
                var seq = cc.sequence(scaleTo, reverse);
                var repeat = cc.repeatForever(seq);
                this.node.runAction(repeat);
            }, 1);

            this.node.on(cc.Node.EventType.TOUCH_START, function ()
            {
                if (cc.director.isPaused())
                    {
                        cc.director.resume();
                    }
                cc.find('toLevelMenu').active = false;
            });
        },
    toActiveParent(){
        this.node.parent.active = true;
        cc.director.pause();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

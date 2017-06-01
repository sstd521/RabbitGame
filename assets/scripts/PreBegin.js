cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function ()
        {
            this.node.on(cc.Node.EventType.TOUCH_START, function ()
            {
                cc.director.loadScene("Open");
            });
        },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

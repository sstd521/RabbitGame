cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        hero: {
            default:null,
            type: cc.Node,
        }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        //console.log(this.getComponent(cc.Sprite));
        self.node.runAction(cc.follow(self.hero));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
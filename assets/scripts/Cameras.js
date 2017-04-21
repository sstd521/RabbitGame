cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        },
        map: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function ()
        {
            this.boundingBox = cc.rect(0, 0, this.map.width, this.map.height);
            let winsize = cc.winSize;
            this.screenMiddle = cc.v2(winsize.width / 2, winsize.height / 2);
            this.minX = -(this.boundingBox.xMax - winsize.width);
            this.maxX = this.boundingBox.xMin;
            this.minY = -(this.boundingBox.yMax - winsize.height);
            this.maxY = this.boundingBox.yMin;
        },
    update: function ()
        {
            let pos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
            let targertPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
            let dis = pos.sub(targertPos);
            let dest = this.screenMiddle.add(dis);
            dest.x = cc.clampf(dest.x, this.minX, this.maxX);
            dest.y =  this.minY;
            // dest.y = cc.clampf(dest.y, this.minY, this.maxY);
            this.node.position = this.node.parent.convertToNodeSpaceAR(dest);

        }
});

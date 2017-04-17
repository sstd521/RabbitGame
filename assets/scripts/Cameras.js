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
            let winsize = cc.winSize;//cc.winSize 为当前的游戏窗口的大小。
            this.screenMiddle = cc.v2(winsize.width / 2, winsize.height / 2);
            this.minX = -(this.boundingBox.xMax - winsize.width); // xMax:矩形 x 轴上的最大值。
            this.maxX = this.boundingBox.xMin;
            this.minY = -(this.boundingBox.yMax - winsize.height);
            this.maxY = this.boundingBox.yMin;
            console.log("this.boundingBox "+this.boundingBox);
        },
    update: function ()
        {
            let pos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
            //将一个点转换到世界空间坐标系。结果以 Vec2 为单位。
            let targertPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
            let dis = pos.sub(targertPos);
            let dest = this.screenMiddle.add(dis);
            dest.x = cc.clampf(dest.x, this.minX, this.maxX);  //第一个值位于后两个值之间
            dest.y = cc.clampf(dest.y, this.minY, this.maxY);
            this.node.position = this.node.parent.convertToNodeSpaceAR(dest);

        }
});

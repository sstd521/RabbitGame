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
        isRun: true,
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
            // console.log('minX：'+this.minX+" "+"minY："+this.minY+" "+'maxX：'+this.maxX+" "+"maxY："+this.maxY);
        },
    update: function ()
        {
            if (this.isRun)
                {
                    //将一个点转换到世界空间坐标系。结果以 Vec2 为单位。
                    let pos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
                    // console.log('pos：'+pos);
                    let targertPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
                    // console.log('targertPos：'+targertPos);
                    let dis = pos.sub(targertPos);
                    // console.log('dis：'+dis);
                    let dest = this.screenMiddle.add(dis);
                    // console.log('dest：'+dest);
                    dest.x = cc.clampf(dest.x, this.minX, this.maxX);//限定dest.x的最大最小值。
                    dest.y = this.minY;
                    // dest.y = cc.clampf(dest.y, this.minY, this.maxY);
                    this.node.position = this.node.parent.convertToNodeSpaceAR(dest);
                }

        }
});

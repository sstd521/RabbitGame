cc.Class({
    extends: cc.Component,

    properties: {
        CoinJump: cc.Prefab,
        mushroom: cc.Prefab,
        // ScoreBar: cc.Node,
        isCollisionable: true,
    },

    onLoad: function ()
        {
            this.node.scaleX = 1;
            cc.director.getCollisionManager().enabled = true;
            // cc.director.getCollisionManager().enabledDebugDraw = true;
            this.anim = this.getComponent(cc.Animation);
            this.node.setLocalZOrder(1);
            // this.Score = this.ScoreBar.getComponent('Score');
        },

    onCollisionEnter: function (other, self)
        {
            var otherAabb = other.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();

            var selfAabb = self.world.aabb;
            var selfPreAabb = self.world.preAabb.clone();
            selfPreAabb.y = selfAabb.y;
            otherPreAabb.y = otherAabb.y;

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb))
                {

                    if (selfPreAabb.yMin > otherPreAabb.yMin)
                        {

                            if (this.isCollisionable)
                                {
                                    if (self.tag == 7)//mushroom
                                        {
                                            var bonus = cc.instantiate(this.mushroom);
                                        }
                                    else
                                        {
                                            Global.isGotCoin = true;
                                            var bonus = cc.instantiate(this.CoinJump);
                                        }
                                    var scence = cc.find('Scence');
                                    bonus.position = scence.convertToNodeSpace(cc.p(selfAabb.x+30,selfAabb.y+30));
                                    scence.addChild(bonus);
                                    this.isCollisionable = false;
                                }

                            this.anim.play('bonusBlocked');


                        }
                }
        },

});
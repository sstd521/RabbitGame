var minTilesCount = 2;
var mapMoveStep = 1;
var minMoveValue = 50;
var MoveDirection = cc.Enum({
    NONE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
});

cc.Class({
    extends: cc.Component,

    properties: {
        //地图
        curMap: cc.TiledMap,
        PointsName: {
            default: 'points'
        },
        playerName: {
            default: 'player'
        },
        finishName: {
            default: 'finish'
        },
        Wall: {
            default: 'wall'
        },
        Ground: {
            default: 'ground'
        },
        destroyable_blocksName: {default: 'destroyable_blocks'},
        bonus_blocksName: {default: 'bonus_blocks'},
        CoinsName: {default: 'coins'},
        enemyName: {default: 'enemies'},
        CoinsPre: cc.Prefab,
        ColliderPreName: cc.Prefab,
        breakableWallPre: cc.Prefab,
        bonusWallPre: cc.Prefab,
        enemyBeetle: cc.Prefab,
        enemySnail: cc.Prefab,
        castle_finish:cc.Prefab,
        snailBlockPre:cc.Prefab,
        //CurMap:cc.TiledMap,
        //Player:cc.Prefab,
        _isMapLoaded: {
            default: false,
            serializable: false,
        },
        player: cc.Node,
        CollisionsGroupName: {default: 'physics'},
        collisions: [],
        collisionName: [],
        floorLayerName: {
            default: 'floor'
        },
        waterLayerName: {
            default: 'water'
        },
        finishName: {default: 'finish'},
        snailBlockName:{default:'snailBlock'}

    },

    onLoad(){
        this._TiledMap = this.curMap.getComponent('cc.TiledMap');
    },
    start: function (error)
        {

            if (error)
                return;
            //this._MapTileSize = this._TiledMap.getTileSize();
            //this._mapSize = cc.v2(this.node.width,this.node.height);
            // var pointGroup = this._TiledMap.getObjectGroup(this.PointsName);
            // if(!pointGroup)
            //     return;
            this._layerFloor = this._TiledMap.getLayer(this.floorLayerName);
            if (!this._layerFloor) return;
            var startPoint = this._TiledMap.getObjectGroup(this.playerName);
            var endPoint = this._TiledMap.getObjectGroup(this.finishName);
            var coinPoints = this._TiledMap.getObjectGroup(this.CoinsName);
            var collisionPoints = this._TiledMap.getObjectGroup(this.CollisionsGroupName);
            var destroyable_blocks = this._TiledMap.getObjectGroup(this.destroyable_blocksName);
            var bonus_blocks = this._TiledMap.getObjectGroup(this.bonus_blocksName);
            var enemies = this._TiledMap.getObjectGroup(this.enemyName);
            var waters = this._TiledMap.getObjectGroup(this.waterLayerName);
            var finish = this._TiledMap.getObjectGroup(this.finishName);
            // var sni = this._TiledMap.getObjectGroup(this.finishName);
            var snailBlocks = this._TiledMap.getObjectGroup(this.snailBlockName);
            var finishPoint = finish.getObject('finishPoint');
            var finishNode = finishPoint.sgNode;
            var castle_finish = cc.instantiate(this.castle_finish);
            castle_finish.x = finishNode.x;
            castle_finish.y = finishNode.y+200;
            this.node.addChild(castle_finish);
            if (!startPoint || !endPoint)
                return;
            for (var i = 1; i < 3; i++)
                {
                    var snailBlockName = 'snailBlock' + i;
                    var snailBlock = snailBlocks.getObject(snailBlockName);
                    var snailBlockSgNode = snailBlock.sgNode;
                    var snailBlockNode = cc.instantiate(this.snailBlockPre);
                    snailBlockNode.width = snailBlockSgNode.width;
                    snailBlockNode.height = snailBlockSgNode.height;
                    snailBlockNode.x = snailBlockSgNode.x;
                    snailBlockNode.y = snailBlockSgNode.y - snailBlockSgNode.height;
                    snailBlockNode.addComponent(cc.BoxCollider);
                    snailBlockNode.getComponent(cc.BoxCollider).size = new cc.size(snailBlockNode.width, snailBlockNode.height);
                    snailBlockNode.getComponent(cc.BoxCollider).offset = new cc.size(snailBlockNode.width/2, -snailBlockNode.height/2);
                    // console.log('watersgNode.height: '+snailBlockNode.height);
                    snailBlockNode.getComponent(cc.BoxCollider).tag = 9;
                    this.node.addChild(snailBlockNode);

                }
            for (var i = 1; i < 8; i++)
                {
                    var waterName = 'water' + i;
                    var waterBlock = waters.getObject(waterName);
                    var watersgNode = waterBlock.sgNode;
                    // var waterNode = new cc.Node();
                    var waterNode = cc.instantiate(this.ColliderPreName);
                    waterNode.group = 'water';
                    // waterNode.setAnchorPoint(0,0);
                    waterNode.width = watersgNode.width;
                    waterNode.height = watersgNode.height;
                    waterNode.x = watersgNode.x;
                    waterNode.y = watersgNode.y - watersgNode.height;
                    waterNode.addComponent(cc.BoxCollider);
                    waterNode.getComponent(cc.BoxCollider).size = new cc.size(waterNode.width, waterNode.height);
                    waterNode.getComponent(cc.BoxCollider).offset = new cc.size(waterNode.width/2, -waterNode.height/2);
                    console.log('watersgNode.height: '+watersgNode.height);
                    waterNode.getComponent(cc.BoxCollider).tag = 6;
                    this.node.addChild(waterNode);
                }
            for (var i = 1; i < 17; i++)
                {
                    var enemyName = 'enemy' + i;
                    var enemyBlock = enemies.getObject(enemyName);
                    var enemyNode = enemyBlock.sgNode;
                    if (5 == i || 9 == i)
                        {
                            var enemy = cc.instantiate(this.enemySnail);
                        }
                    else
                        var enemy = cc.instantiate(this.enemyBeetle);
                    enemy.x = enemyNode.x;
                    enemy.y = enemyNode.y;
                    this.node.addChild(enemy);
                    // console.log('enemy Name'+enemy._name);

                }
            for (var i = 1; i < 30; i++)
                {
                    var destroyable_blockName = 'destroyable_blocks' + i;
                    var destroyable_block = destroyable_blocks.getObject(destroyable_blockName);
                    var destroyable_blockNode = destroyable_block.sgNode;
                    var breakableWall = cc.instantiate(this.breakableWallPre);
                    breakableWall.x = destroyable_blockNode.x;
                    // breakableWall.height = destroyable_blockNode.height;
                    breakableWall.y = destroyable_blockNode.y;
                    this.node.addChild(breakableWall);
                }
            for (var i = 1; i < 7; i++)
                {
                    var bonus_blockName = 'bonus_block' + i;
                    var bonus_block = bonus_blocks.getObject(bonus_blockName);
                    var bonus_blockNode = bonus_block.sgNode;
                    var bonusWall = cc.instantiate(this.bonusWallPre);
                    // console.log('bonusWallPre Name: ' + bonusWall.name);
                    bonusWall.setLocalZOrder(99);
                    bonusWall.x = bonus_blockNode.x;
                    // bonusWall.height = bonus_blockNode.height;
                    bonusWall.y = bonus_blockNode.y;
                    if (bonus_block.name == 'bonus_block4')
                        {
                            bonusWall.getComponent(cc.BoxCollider).tag = 7;
                        }
                    this.node.addChild(bonusWall);
                }
            for (var i = 1; i < 40; i++)
                {
                    var coinName = 'coin' + i;
                    var coinPoint = coinPoints.getObject(coinName);
                    var coinNode = coinPoint.sgNode;
                    var coin = cc.instantiate(this.CoinsPre);
                    coin.x = coinNode.x;
                    // coin.height = coinNode.height;
                    coin.y = coinNode.y;
                    this.node.addChild(coin);
                }
            for (var i = 1; i < 31; i++)
                {
                    // this.collisionName[i] = i.toString();
                    var collisionName = i.toString();
                    this.collisions[i] = collisionPoints.getObject(collisionName);
                    var collisionNode = this.collisions[i].sgNode;
                    var node = cc.instantiate(this.ColliderPreName);
                    // var node = new cc.Node();
                    node.setAnchorPoint(0, 0);
                    node.x = collisionNode.x;
                    node.height = collisionNode.height;
                    node.y = collisionNode.y - collisionNode.height;
                    node.width = collisionNode.width;
                    node.addComponent(cc.BoxCollider);
                    node.getComponent(cc.BoxCollider).size = new cc.size(collisionNode.width, collisionNode.height);
                    node.getComponent(cc.BoxCollider).offset = new cc.size(collisionNode.width / 2, collisionNode.height / 2);
                    node.getComponent(cc.BoxCollider).tag = 5;
                    this.node.addChild(node);
                }
            var rabbit = startPoint.getObject('rabbit');
            // console.log("rabbit: " + rabbit);
            var startPos = cc.p(rabbit.sgNode.x, rabbit.sgNode.y);
            // var endPos = cc.p(endPoint.sgNode.x,endPoint.sgNode.y);

            // this.wallLayer = this._TiledMap.getLayer(this.Wall);
            // this.groundPlayer = this._TiledMap.getLayer(this.Ground);
            // if (!this.wallLayer||!this.groundPlayer)
            //     return ;

            // var coin = cc.instantiate(this.CoinsPre);
            // this._startTile = this._getTilePos(startPos);
            // var pos = this._layerFloor.getPositionAt(this._startTile);
            // coin.setPosition(pos);

            // coin.setPosition(cc.p(this._startTile.x, this._startTile.y));
            // player.position = cc.p(startPos.x,startPos.y);
            // this.node.addChild(coin, 2);
            // cc.log("coin.getPosition()" + coin.getPosition());

        },
// 获取tiledMap上的位置
//     _getTilePos: function (posInPixel)
//         {
//             // var mapSize = this.node.getContentSize();
//             var mapSize = cc.v2(this._TiledMap.node.width, this._TiledMap.node.height);
//             var tileSize = this._TiledMap.getTileSize(); //单个瓦片的大小，单位是像素
//             var x = Math.floor(posInPixel.x / tileSize.width);
//             var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
//
//             return cc.p(x, y);
//         },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

});

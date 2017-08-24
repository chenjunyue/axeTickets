class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = Scene(game)
            game.replaceScene(s)
        })
        game.registerAction('b', function(){
            var s = SceneEdit.new(game)
            game.replaceScene(s)
        })

    }
    draw() {
        // draw labels
        this.game.context.fillText('按 k 开始游戏', 100, 190)
        this.game.context.fillText('按 b 编辑游戏', 100, 150)
    }

}

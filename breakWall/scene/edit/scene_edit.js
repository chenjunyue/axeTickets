class SceneEdit extends GuaScene {
    constructor(game) {
        super(game)
        this.level = 1
        this.lifes = 1
        this.color = ''
        var that = this
        e('.lifes').style = 'display:block';
        this.addEvent()
        this.bandEvent()

    }

    drawAll() {
        var blocks = loadLevel(this.game, this.level)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            this.game.drawImage(block)
        }
    }

    bandEvent() {
        var that = this

        e('.lifes').addEventListener('input', function(event) {
            var self = event.target
            if (self.classList.contains('iblock-lifes')) {
                that.lifes = self.value
            }
            if (self.classList.contains('level-color')) {
                log('、2改变了')
            }
            if (self.classList.contains('levels-num')) {
                that.level = self.value
            }
        })
        window.addEventListener('keydown', function(event) {
            if (event.key == 't') {
                window.location.reload()
            }
        })
        e('.lifes').addEventListener('click', function(event) {
            var self = event.target
            if (self.classList.contains('levels-up')) {
                if ((levels.length - 1) <= that.level) {
                    var ar = []
                    levels.push(ar)
                }
                that.level++
                    e('.levels-num').value = that.level
            }
            if (self.classList.contains('levels-down')) {
                if (that.level <= 1) {
                    return
                }
                that.level--
                    e('.levels-num').value = that.level
            }
            if (self.classList.contains('level-seve')) {
                var data = JSON.stringify(levels);
                localStorage.daFangKuaiData = data
                e('.seveDone').classList.remove('vanish')
                setTimeout(function() {
                    e('.seveDone').classList.add('vanish')
                }, 2000)
                setTimeout(function() {
                    window.location.reload()
                }, 5000)
            }
            if (self.classList.contains('level-clear')) {
                levels= [
                    []
                ]
            }
        })
    }

    addEvent() {
        var that = this
        var addBlock = function(event) {
            var x = event.offsetX
            var y = event.offsetY
            log(x, y, )

            //直接写入关卡数据。
            if (y > 190) {
                that.game.context.font = 'normal 11px Arial'
                that.game.context.fillStyle = "#f44336"
                that.game.context.fillText('——————————————编辑不能超过这条线——————————————', 0, 190)
                return
            }
            var p = [x, y, ]
            var b = Block(that.game, p)
            if (that.peng(b)) {
                that.game.context.font = 'normal 11px Arial'
                that.game.context.fillStyle = "#f44336"
                that.game.context.fillText('不要重叠了', x, y)
                return
            }
            p = p.concat(Number(that.lifes))
            log('that.lifes___', p)
            var le = that.level - 1
            levels[le].push(p)
            that.drawAll()
        }
        this.game.canvas.addEventListener('click', addBlock)
        return addBlock
    }

    peng(p) {
        var blocks = loadLevel(this.game, this.level)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(p)) {
                return true
            }
        }
    }

    draw() {
        window.fps = 1
        //背景颜色。
        this.game.context.fillStyle = "#554"
        this.game.context.fillRect(0, 0, 400, 300)
        this.game.context.fillStyle = "#fff"
        this.game.context.font = 'normal 10px Arial'
        var tx = '关卡编译页面第   ' + this.level + '  官'
        this.game.context.fillText(tx, 100, 290)
        this.game.context.fillStyle = "#f78880"
        this.game.context.font = "bold 15px Arial"
        this.game.context.fillText('请先保存后，按下 t 键退出', 100, 270)
        this.drawAll()
    }
}

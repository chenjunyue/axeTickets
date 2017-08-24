
var data = localStorage.daFangKuaiData
var levelsData 
if (!!data) {
    levelsData = JSON.parse(data)
}


var levels = levelsData ||  [
    [
        [0, 0,],
    ],
    [
        [50, 0,],
        [100, 100,],
    ],
    [
        [50, 30,],
        [100, 100, 2],
        [200, 100, 2],
    ],
]

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const data = [1.09, 1.5, 1.2, 1.3]
const labels = ['   Jackpot', 'This Or That', '   Blackjack', '      Slots']
const barWidth = 90
const gap = 40
const maxData = 1.5

canvas.width = 630
canvas.height = 350
const chartHeight = canvas.height - 40

context.beginPath()
context.moveTo(50, chartHeight)
context.lineTo(canvas.width - 10, chartHeight)
context.stroke()

data.forEach((value, index) => {
    const x = 50 + gap + index * (barWidth + gap)
    const height = (value/maxData) * (chartHeight - 20)
    const y = chartHeight - height

    context.fillStyle = 'rgba(255, 255, 255, 0.8)'
    context.fillRect(x, y, barWidth, height)

    context.fillStyle = '#fff'
    context.fillText(value, x + barWidth / 4 + 13, y - 10)

    context.fillText(labels[index], x + barWidth / 4 - 5, chartHeight + 20)
})

const sites = ['Jackpot.php', 'ThisOrThat.php', 'Blackjack.php', 'Slots.php']
const sites_imgs = ['Wheel', 'RideTheBus', 'Blackjack', 'Slots']

const pic1 = document.getElementById('pic1')
const pic2 = document.getElementById('pic2')
const pic3 = document.getElementById('pic3')

let one = 3
let two = 0
let three = 1

changeimages(one, two, three)

function switchtoleft(){
    if(one==3){one = 2; two = 3; three = 0}
    else if(one==2){one = 1; two = 2; three = 3}
    else if(one==1){one = 0; two = 1; three = 2}
    else if(one==0){one = 3; two = 0; three = 1}
    changeimages(one, two, three)
}

function gotosite(){
    window.location.href = `../games/${sites[two]}`
}

function switchtoright(){
    if(one==1){one = 2; two = 3; three = 0}
    else if(one==0){one = 1; two = 2; three = 3}
    else if(one==3){one = 0; two = 1; three = 2}
    else if(one==2){one = 3; two = 0; three = 1}
    changeimages(one, two, three)
}

function changeimages(one, two, three){
    pic1.style.backgroundImage = `url(../others/${sites_imgs[one]}_site.png)`
    pic2.style.backgroundImage = `url(../others/${sites_imgs[two]}_site.png)`
    pic3.style.backgroundImage = `url(../others/${sites_imgs[three]}_site.png)`
}
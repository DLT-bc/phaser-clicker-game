export function calcScale() {
    var targetWidth = 960 // идеальная ширина приложения (под неё рисуем спрайты и т.п.)
    var targetHeight = 580 // 640х960 - это iPhone 4, под меньшее разрешение наверно нет смысла делать
    
    var deviceRatio = window.innerWidth / window.innerHeight
    var newRatio = (targetHeight / targetWidth) * deviceRatio
                
    var newWidth = targetWidth * newRatio
    var newHeight = targetHeight * newRatio
    
    console.log(newWidth, newHeight)
    console.log(newRatio);

    return { newWidth, newHeight, newRatio}
}
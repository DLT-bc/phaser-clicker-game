export function drawDebugBounds(scene, gameObject, x, y) {
    var output = gameObject.getBounds()
    let rec = scene.add.rectangle(output.x + output.width / 2, output.y + output.height / 2, output.width, output.height)
    rec.setStrokeStyle(2, 0xFF0000);

    let point = scene.add.rectangle(x, y, 2, 2)
    point.setStrokeStyle(10, 0x0000FF);
}
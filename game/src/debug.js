export function drawDebugBounds(scene, gameObject) {
    var output = gameObject.getBounds()
    let rec = scene.add.rectangle(output.x + output.width / 2, output.y + output.height / 2, output.width, output.height)
    rec.setStrokeStyle(2, 0xFF0000);
}
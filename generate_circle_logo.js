const { Jimp } = require('jimp');

async function createCircleIcon() {
  const image = await Jimp.read('public/logo.png');
  image.autocrop({ tolerance: 0.05 });
  
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  const size = Math.max(w, h);
  const padding = Math.floor(size * 0.1);
  const finalSize = size + padding * 2;
  
  const circleImg = new Jimp({ width: finalSize, height: finalSize, color: 0x00000000 });
  const offsetX = Math.floor((finalSize - w) / 2);
  const offsetY = Math.floor((finalSize - h) / 2);
  circleImg.composite(image, offsetX, offsetY);
  
  const radius = finalSize / 2;
  const cx = radius;
  const cy = radius;
  
  circleImg.scan(0, 0, finalSize, finalSize, function(x, y, idx) {
    const dx = x - cx;
    const dy = y - cy;
    if (dx * dx + dy * dy > radius * radius) {
      this.bitmap.data[idx + 3] = 0; // Alpha 0 (transparent outside circle)
    }
  });
  
  circleImg.resize({ w: 256, h: 256 });
  await circleImg.write('public/logo-circle.png');
  console.log('Created public/logo-circle.png with pure circular transparency!');
}

createCircleIcon().catch(console.error);

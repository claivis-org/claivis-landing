const { Jimp } = require('jimp');

async function roundIcon() {
  const image = await Jimp.read('public/logo.png');
  
  // Step 1: Auto-crop whitespace around the logo
  image.autocrop({ tolerance: 0.05 });
  
  // Step 2: Add a small padding (8% on each side)
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  const size = Math.max(w, h);
  const padding = Math.floor(size * 0.08);
  const finalSize = size + padding * 2;
  
  // Create padded canvas with white background
  const padded = new Jimp({ width: finalSize, height: finalSize, color: 0xFFFFFFFF });
  const offsetX = Math.floor((finalSize - w) / 2);
  const offsetY = Math.floor((finalSize - h) / 2);
  padded.composite(image, offsetX, offsetY);
  
  // Step 3: Apply rounded corners
  const radius = Math.floor(finalSize * 0.22);
  
  padded.scan(0, 0, finalSize, finalSize, function(x, y, idx) {
    let outside = false;
    
    if (x < radius && y < radius) {
      const dx = radius - x, dy = radius - y;
      if (dx * dx + dy * dy > radius * radius) outside = true;
    }
    if (x >= finalSize - radius && y < radius) {
      const dx = x - (finalSize - radius - 1), dy = radius - y;
      if (dx * dx + dy * dy > radius * radius) outside = true;
    }
    if (x < radius && y >= finalSize - radius) {
      const dx = radius - x, dy = y - (finalSize - radius - 1);
      if (dx * dx + dy * dy > radius * radius) outside = true;
    }
    if (x >= finalSize - radius && y >= finalSize - radius) {
      const dx = x - (finalSize - radius - 1), dy = y - (finalSize - radius - 1);
      if (dx * dx + dy * dy > radius * radius) outside = true;
    }
    
    if (outside) {
      this.bitmap.data[idx + 3] = 0;
    }
  });
  
  // Step 4: Resize to 512x512
  padded.resize({ w: 512, h: 512 });
  
  await padded.write('app/icon.png');
  console.log('Done! Cropped & rounded icon saved to app/icon.png');
}

roundIcon().catch(console.error);

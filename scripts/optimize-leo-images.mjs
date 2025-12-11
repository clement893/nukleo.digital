import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const publicDir = join(process.cwd(), 'client/public');
const targetSize = 168; // 2x pour retina (84px displayed)

async function optimizeImages() {
  console.log('🖼️  Optimizing LEO avatar images...\n');

  const files = await readdir(publicDir);
  const leoImages = files.filter(f => f.startsWith('leo-avatar') && f.endsWith('.png'));

  for (const file of leoImages) {
    const inputPath = join(publicDir, file);
    const outputPath = join(publicDir, file.replace('.png', '.webp'));

    console.log(`Processing: ${file}`);
    
    const inputStats = await sharp(inputPath).metadata();
    console.log(`  Original: ${inputStats.width}x${inputStats.height}`);

    await sharp(inputPath)
      .resize(targetSize, targetSize, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    const outputStats = await sharp(outputPath).metadata();
    const inputSize = (await import('fs')).statSync(inputPath).size;
    const outputSize = (await import('fs')).statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(`  Optimized: ${outputStats.width}x${outputStats.height}`);
    console.log(`  Size: ${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB (-${savings}%)`);
    console.log(`  Output: ${file.replace('.png', '.webp')}\n`);
  }

  console.log('✅ All images optimized!');
}

optimizeImages().catch(console.error);

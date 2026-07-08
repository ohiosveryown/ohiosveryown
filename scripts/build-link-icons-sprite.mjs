import sharp from 'sharp'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const iconsDir = join(__dirname, '../public/icons')
const CELL = 128

const icons = [
  { id: 'github', file: 'github.webp', fit: 'cover' },
  { id: 'mailchimp', file: 'mailchimp.webp', fit: 'cover', scale: 1.32 },
  { id: 'elevenwarriors', file: 'elevenwarriors.webp', fit: 'cover' },
  { id: 'proportional', file: 'proportional.webp', fit: 'contain' },
  { id: 'notch', file: 'notch@2x.webp', fit: 'contain' },
  { id: 'supersymmetry', file: 'supersymmetry.webp', fit: 'contain' },
]

async function renderCell({ file, fit, scale = 1 }) {
  const input = join(iconsDir, file)

  if (fit === 'cover') {
    const size = Math.round(CELL * scale)
    const resized = await sharp(input).resize(size, size, { fit: 'cover' }).toBuffer()
    const offset = Math.floor((size - CELL) / 2)

    return sharp(resized)
      .extract({
        left: offset,
        top: offset,
        width: CELL,
        height: CELL,
      })
      .png()
      .toBuffer()
  }

  const size = Math.round(CELL * scale)

  return sharp({
    create: {
      width: CELL,
      height: CELL,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: await sharp(input).resize(size, size, { fit: 'inside' }).toBuffer(),
        gravity: 'center',
      },
    ])
    .png()
    .toBuffer()
}

const cells = await Promise.all(icons.map(renderCell))

await sharp({
  create: {
    width: CELL * icons.length,
    height: CELL,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite(cells.map((input, index) => ({ input, left: index * CELL, top: 0 })))
  .webp({ quality: 85 })
  .toFile(join(iconsDir, 'link-icons.webp'))

console.info(`Built ${iconsDir}/link-icons.webp (${icons.length} icons @ ${CELL}px)`)

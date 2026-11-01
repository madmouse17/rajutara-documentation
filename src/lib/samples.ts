import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { withBase } from './site';

/** The sample tee the landing page and the gallery offer for download. Its files are copied from the
 *  application repository's samples/kaos-lengan-pendek/ (scripts/sync-samples.sh). */
export const SAMPLE_DIR = 'samples/kaos-lengan-pendek';

export interface SampleFile {
  name: string;
  url: string;
  bytes: number;
  /** What the file is, in the Operator's words. */
  kind: string;
  /** How to use it. */
  use: string;
  group: 'open' | 'interchange' | 'output';
}

/** Describe a sample file by its name. The native extensions come in two spellings: `.rjx`, `.rjm` and
 *  `.rjc` are current, `.optx`, `.optm` and `.optc` are what earlier builds wrote and still open. */
function describe(name: string): Omit<SampleFile, 'name' | 'url' | 'bytes'> {
  const ext = path.extname(name).toLowerCase();
  if (['.rjx', '.optx'].includes(ext)) {
    return {
      kind: 'Style',
      use: 'Open it in Rajutara: four pieces, sizes S, M, L and XL, grade rules.',
      group: 'open',
    };
  }
  if (['.rjm', '.optm'].includes(ext)) {
    return {
      kind: 'Marker',
      use: 'Open it in Rajutara: the nested tee, 20 pieces on 180 cm fabric.',
      group: 'open',
    };
  }
  if (['.rjc', '.optc'].includes(ext)) {
    return { kind: 'Cut Plan', use: 'Open it in Rajutara.', group: 'open' };
  }
  if (ext === '.dxf') {
    return {
      kind: 'ASTM D6673 DXF',
      use: 'The graded nest. Import it into any CAD that reads ASTM.',
      group: 'interchange',
    };
  }
  if (ext === '.rul') {
    return {
      kind: 'ASTM grade rules',
      use: 'Keep it beside the DXF: it holds the dX and dY per size.',
      group: 'interchange',
    };
  }
  if (ext === '.plt') {
    return {
      kind: 'HPGL/2 plot',
      use: 'The marker as a plotter file, 40 units to the millimetre.',
      group: 'output',
    };
  }
  if (ext === '.csv') {
    return {
      kind: 'Marker report',
      use: 'Length, efficiency, areas and piece counts as a table.',
      group: 'output',
    };
  }
  if (ext === '.pdf' && name.includes('pieces')) {
    return {
      kind: 'Pieces, size M',
      use: 'Every piece at 1:1, tiled for an A4 printer.',
      group: 'output',
    };
  }
  if (ext === '.pdf') {
    return {
      kind: 'Marker plot',
      use: 'The nested marker at 1:1 on A0 sheets, with a tile map.',
      group: 'output',
    };
  }
  return { kind: 'File', use: '', group: 'output' };
}

/** Every file in the sample folder, in a stable order: files you open, then interchange, then outputs. */
export function listSamples(): SampleFile[] {
  const dir = path.join(process.cwd(), 'public', SAMPLE_DIR);
  const order = { open: 0, interchange: 1, output: 2 } as const;
  return readdirSync(dir)
    .map((name) => ({
      name,
      url: withBase(`/${SAMPLE_DIR}/${name}`),
      bytes: statSync(path.join(dir, name)).size,
      ...describe(name),
    }))
    .sort((a, b) => order[a.group] - order[b.group] || a.name.localeCompare(b.name));
}

export const formatBytes = (n: number): string =>
  n < 1024 * 100 ? `${(n / 1024).toFixed(1)} KB` : `${Math.round(n / 1024)} KB`;

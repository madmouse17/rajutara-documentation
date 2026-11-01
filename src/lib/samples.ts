import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { withBase } from './site';
import { t, type Lang } from './i18n';

/** The sample tee the landing page and the gallery offer for download. Its files are copied from the
 *  application repository's samples/kaos-lengan-pendek/ (scripts/sync-samples.sh). */
export const SAMPLE_DIR = 'samples/kaos-lengan-pendek';

type Type =
  'style' | 'marker' | 'cutplan' | 'dxf' | 'rul' | 'plt' | 'csv' | 'pieces' | 'plot' | 'file';

export interface SampleFile {
  name: string;
  url: string;
  bytes: number;
  /** What the file is, independent of the language. */
  type: Type;
  /** What the file is, in the Operator's words. */
  kind: string;
  /** How to use it. */
  use: string;
  group: 'open' | 'interchange' | 'output';
}

/** Classify a sample file by its name. The native extensions come in two spellings: `.rjx`, `.rjm` and
 *  `.rjc` are current, `.optx`, `.optm` and `.optc` are what earlier builds wrote and still open. */
function classify(name: string): { type: Type; group: SampleFile['group'] } {
  const ext = path.extname(name).toLowerCase();
  if (['.rjx', '.optx'].includes(ext)) return { type: 'style', group: 'open' };
  if (['.rjm', '.optm'].includes(ext)) return { type: 'marker', group: 'open' };
  if (['.rjc', '.optc'].includes(ext)) return { type: 'cutplan', group: 'open' };
  if (ext === '.dxf') return { type: 'dxf', group: 'interchange' };
  if (ext === '.rul') return { type: 'rul', group: 'interchange' };
  if (ext === '.plt') return { type: 'plt', group: 'output' };
  if (ext === '.csv') return { type: 'csv', group: 'output' };
  if (ext === '.pdf' && name.includes('pieces')) return { type: 'pieces', group: 'output' };
  if (ext === '.pdf') return { type: 'plot', group: 'output' };
  return { type: 'file', group: 'output' };
}

/** Every file in the sample folder, in a stable order: files you open, then interchange, then outputs. */
export function listSamples(lang: Lang): SampleFile[] {
  const dir = path.join(process.cwd(), 'public', SAMPLE_DIR);
  const order = { open: 0, interchange: 1, output: 2 } as const;
  return readdirSync(dir)
    .map((name): SampleFile => {
      const { type, group } = classify(name);
      return {
        name,
        url: withBase(`/${SAMPLE_DIR}/${name}`),
        bytes: statSync(path.join(dir, name)).size,
        type,
        group,
        kind: t(lang, `sample.${type}`),
        use: type === 'file' ? '' : t(lang, `sample.${type}Use`),
      };
    })
    .sort((a, b) => order[a.group] - order[b.group] || a.name.localeCompare(b.name));
}

export const formatBytes = (n: number): string =>
  n < 1024 * 100 ? `${(n / 1024).toFixed(1)} KB` : `${Math.round(n / 1024)} KB`;

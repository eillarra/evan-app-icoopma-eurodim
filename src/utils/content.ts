import type { EvanContent } from '@evan/types';

import type { ContentWithFiles } from '@/types/icoodim';

export function contentWithFiles(content: EvanContent | undefined): ContentWithFiles | undefined {
  return content as ContentWithFiles | undefined;
}

export function firstContentFile(content: EvanContent | undefined): string | undefined {
  return contentWithFiles(content)?.files?.[0]?.file;
}

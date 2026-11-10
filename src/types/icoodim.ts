import type { EvanContent, EvanSession } from '@evan/types';

export interface ContentWithFiles extends EvanContent {
  readonly files: { readonly id: number; readonly file: string; readonly description: string }[];
}

export type SessionWithChair = EvanSession & {
  readonly extra_data: EvanSession['extra_data'] & { readonly chair?: string | null };
};

export interface SessionDay {
  readonly key: string;
  readonly label: string;
  readonly sessions: EvanSession[];
}

// Global type declarations for the ICOOPMA-EuroDIM 2022 archive.

import type * as EvanTypes from '@evan/types';

declare global {
  type ApiEndpoint = EvanTypes.ApiEndpoint;
  type Url = EvanTypes.Url;
  type MarkdownText = EvanTypes.MarkdownText;
  type EmptyString = EvanTypes.EmptyString;
  type EvanCountry = EvanTypes.EvanCountry;

  type EvanEvent = EvanTypes.EvanEvent;
  type EvanFile = EvanTypes.EvanFile;
  type EvanContent = EvanTypes.EvanContent;
}

export {};

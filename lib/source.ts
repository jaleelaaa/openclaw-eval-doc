import { loader } from 'fumadocs-core/source';
import { docs } from '@/.source';
import type { InferPageType } from 'fumadocs-core/source';

// Get the source from toFumadocsSource
const mdxSource = docs.toFumadocsSource();

// The files property might be a getter function, call it to get the array
const filesArray = typeof mdxSource.files === 'function'
  ? (mdxSource.files as () => unknown[])()
  : mdxSource.files;

// Create a proper source object with files as array
const sourceConfig = {
  ...mdxSource,
  files: filesArray,
};

export const source = loader({
  baseUrl: '/docs',
  // @ts-expect-error - fumadocs-mdx type compatibility issue
  source: sourceConfig,
});

export type Page = InferPageType<typeof source>;

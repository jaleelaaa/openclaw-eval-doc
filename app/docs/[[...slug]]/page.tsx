import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import { source } from '@/lib/source';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsPage,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { FC } from 'react';
import type { TableOfContents } from 'fumadocs-core/server';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

interface MDXData {
  body: FC<{ components: Record<string, unknown> }>;
  toc: TableOfContents;
  title: string;
  description?: string;
}

export default async function Page({ params }: PageProps) {
  const { slug = [] } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  const data = page.data as unknown as MDXData;
  const Mdx = data.body;

  return (
    <DocsPage toc={data.toc}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
        <Mdx components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = source.getPage(slug);

  if (!page)
    return createMetadata({
      title: 'Not Found',
    });

  return createMetadata({
    title: page.data.title,
    description: page.data.description ?? 'OpenClaw Documentation',
  });
}

export function generateStaticParams() {
  return source.generateParams();
}

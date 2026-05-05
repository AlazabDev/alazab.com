import type { GetStaticPaths, GetStaticProps } from 'next';
import { getContentItem, getStaticSlugs } from '../../lib/alazabContent';
import { ContentArticlePage } from '../../lib/alazabContentViews';
import type { AlazabContentItem } from '../../types/alazab-content';

const SECTION = 'blogs' as const;

export default function Page({ item }: { item: AlazabContentItem }) {
  return <ContentArticlePage item={item} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: getStaticSlugs(SECTION), fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug || '');
  const item = getContentItem(SECTION, slug);
  if (!item) return { notFound: true };
  return { props: { item } };
};

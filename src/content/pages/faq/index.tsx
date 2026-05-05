import type { GetStaticProps } from 'next';
import { getContentList } from '../../lib/alazabContent';
import { ContentIndexPage } from '../../lib/alazabContentViews';
import type { AlazabContentItem } from '../../types/alazab-content';

const SECTION = 'faq' as const;

export default function Page({ items }: { items: AlazabContentItem[] }) {
  return <ContentIndexPage section={SECTION} items={items} />;
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { items: getContentList(SECTION) } };
};

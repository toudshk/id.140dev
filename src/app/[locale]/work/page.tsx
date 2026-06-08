import { WorkList } from "@/components/work/WorkList";
import { getDictionary, isLocale } from "@/lib/i18n";

export function generateMetadata({
  params
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? params.locale : "ru";
  const t = getDictionary(locale);

  return {
    title: t.work.title,
    description: t.meta.description
  };
}

export default function WorkPage() {
  return <WorkList />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects, getProjectBySlug, portfolio } from "@/data/portfolio";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { CaseStudyView } from "@/components/case-study-view";

const navigation = portfolio.navigation.map(item => ({ ...item, href: `/${item.href}` }));
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allProjects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  const url = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { title: `${project.title} | Wilfried Druid`, description: project.summary, url, type: "website" },
    twitter: { title: `${project.title} | Wilfried Druid`, description: project.summary, card: "summary_large_image" },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  return (
    <>
      <SkipLink />
      <SiteHeader name={portfolio.identity.shortName} navigation={navigation} github={portfolio.socials.github} homeHref="/#top" />
      <CaseStudyView slug={project.slug} />
    </>
  );
}

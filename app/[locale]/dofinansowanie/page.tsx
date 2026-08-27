import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { FundingSignSet } from '@/app/components/FundingSigns';

export const revalidate = 3600;

interface FundingProject {
  name?: string;
  programName?: string;
  fund?: string;
  contractNumber?: string;
  objective?: string;
  effects?: string;
  projectValue?: string;
  euContribution?: string;
}

interface FundingData {
  enabled?: boolean;
  heading?: string;
  intro?: string;
  logoLockup?: { asset?: unknown; alt?: string };
  projects?: FundingProject[];
  hashtags?: string;
  signalUrl?: string;
}

const FUNDING_QUERY = `*[_type == "funding"][0] {
  enabled,
  "heading": coalesce(heading[$locale], heading.pl),
  "intro": coalesce(intro[$locale], intro.pl),
  logoLockup { asset, alt },
  projects[] {
    "name": coalesce(name[$locale], name.pl),
    "programName": coalesce(programName[$locale], programName.pl),
    "fund": coalesce(fund[$locale], fund.pl),
    contractNumber,
    "objective": coalesce(objective[$locale], objective.pl),
    "effects": coalesce(effects[$locale], effects.pl),
    projectValue,
    euContribution
  },
  hashtags,
  signalUrl
}`;

export default async function FundingPage() {
  const locale = await getLocale();
  const t = await getTranslations('funding');

  let data: FundingData | null = null;
  try {
    data = await client.fetch<FundingData | null>(FUNDING_QUERY, { locale });
  } catch (error) {
    console.error('Funding Sanity fetch failed:', error);
  }

  // Puste wiersze-zaślepki (dodane w Studio, jeszcze bez danych z umowy) nie
  // mogą udawać gotowej informacji - liczą się tylko projekty z nazwą.
  const projects = (data?.projects ?? []).filter((project) => project.name?.trim());
  const isReady = Boolean(data?.enabled) && projects.length > 0;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden">
        <div className="pt-[var(--page-top-offset)] w-full justify-center container mx-auto pb-12 flex flex-col items-center relative overflow-x-hidden px-4">
          <div className="flex flex-col z-30 items-center justify-center relative max-w-4xl mx-auto text-center">
            <h1
              className="heading-hero tracking-tighter text-slate-900 mb-6"
              style={{ fontFamily: 'var(--font-michroma)' }}
            >
              {data?.heading || t('title')}
            </h1>
            {data?.intro && (
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
                {data.intro}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Oficjalne zestawienie znakow */}
          {!data?.logoLockup?.asset && (
            <div className="mb-12 flex justify-center rounded-2xl border border-gray-200 bg-white p-6 md:p-10">
              <FundingSignSet
                locale={locale}
                className="h-auto w-full max-w-2xl"
                priority
              />
            </div>
          )}
          {Boolean(data?.logoLockup?.asset) && data?.logoLockup && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 mb-12 flex justify-center">
              <Image
                src={urlFor(data.logoLockup).width(1200).fit('max').url()}
                alt={
                  data.logoLockup.alt ||
                  'Znak Fundusze Europejskie, flaga Unii Europejskiej - Dofinansowane przez Unie Europejska'
                }
                width={1200}
                height={220}
                className="w-full max-w-3xl h-auto"
                priority
              />
            </div>
          )}

          {!isReady ? (
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 md:p-10 text-center">
              <p className="text-lg text-slate-700 leading-relaxed">
                {t('inPreparation')}
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {projects.map((project, index) => (
                <article
                  key={index}
                  className="bg-gray-50 rounded-2xl border border-gray-100 p-8 md:p-10"
                >
                  {project.name && (
                    <h2 className="heading-3 text-slate-900 mb-6">{project.name}</h2>
                  )}

                  <dl className="space-y-5">
                    {project.programName && (
                      <div>
                        <dt className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                          {t('program')}
                        </dt>
                        <dd className="text-slate-700 mt-1">{project.programName}</dd>
                      </div>
                    )}
                    {project.fund && (
                      <div>
                        <dt className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                          {t('fund')}
                        </dt>
                        <dd className="text-slate-700 mt-1">{project.fund}</dd>
                      </div>
                    )}
                    {project.objective && (
                      <div>
                        <dt className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                          {t('objective')}
                        </dt>
                        <dd className="text-slate-700 mt-1 leading-relaxed whitespace-pre-line">
                          {project.objective}
                        </dd>
                      </div>
                    )}
                    {project.effects && (
                      <div>
                        <dt className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                          {t('effects')}
                        </dt>
                        <dd className="text-slate-700 mt-1 leading-relaxed whitespace-pre-line">
                          {project.effects}
                        </dd>
                      </div>
                    )}
                    {project.contractNumber && (
                      <div>
                        <dt className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                          {t('contractNumber')}
                        </dt>
                        <dd className="text-slate-700 mt-1">{project.contractNumber}</dd>
                      </div>
                    )}
                  </dl>

                  {(project.projectValue || project.euContribution) && (
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {project.projectValue && (
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                          <p className="text-sm text-slate-500">{t('projectValue')}</p>
                          <p className="text-xl font-bold text-slate-900 mt-1">
                            {project.projectValue}
                          </p>
                        </div>
                      )}
                      {project.euContribution && (
                        <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl p-5 text-white">
                          <p className="text-sm text-white/80">{t('euContribution')}</p>
                          <p className="text-xl font-bold mt-1">{project.euContribution}</p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              ))}

              {(data?.hashtags || data?.signalUrl) && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  {data?.hashtags && (
                    <p className="text-blue-600 font-semibold">{data.hashtags}</p>
                  )}
                  {data?.signalUrl && (
                    <a
                      href={data.signalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 underline hover:text-blue-600"
                    >
                      {t('reportIrregularities')}
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import {
  fetchTechnologies,
  fetchIndustries,
  fetchOfferStats,
  fetchAboutUs,
  fetchHistory,
  fetchTeam,
  fetchFAQs,
  fetchPartners,
  fetchHomepageModules,
  fetchFooter,
  fetchFooterOfferProjects,
} from './fetchers';
import type {
  TechnologiesData,
  IndustriesData,
  OfferStatsData,
  AboutUsData,
  HistoryItem,
  TeamMember,
  FAQ,
  Partner,
  HomepageModule,
  FooterData,
  OfferProject,
} from './types';

export function useTechnologies() {
  const [data, setData] = useState<TechnologiesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTechnologies()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export function useIndustries() {
  const [data, setData] = useState<IndustriesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndustries()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export function useOfferStats() {
  const [data, setData] = useState<OfferStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOfferStats()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export function useAboutUs(locale: string) {
  const [data, setData] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutUs(locale)
      .then(setData)
      .finally(() => setLoading(false));
  }, [locale]);

  return { data, loading };
}

export function useHistory(locale: string) {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory(locale)
      .then(setData)
      .finally(() => setLoading(false));
  }, [locale]);

  return { data, loading };
}

export function useTeam(locale: string) {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam(locale)
      .then(setData)
      .finally(() => setLoading(false));
  }, [locale]);

  return { data, loading };
}

export function useFAQs(locale: string) {
  const [data, setData] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs(locale)
      .then(setData)
      .finally(() => setLoading(false));
  }, [locale]);

  return { data, loading };
}

export function usePartners(locale: string) {
  const [data, setData] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners(locale)
      .then(setData)
      .finally(() => setLoading(false));
  }, [locale]);

  return { data, loading };
}

export function useHomepageModules(locale: string) {
  const [data, setData] = useState<HomepageModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomepageModules(locale)
      .then(setData)
      .finally(() => setLoading(false));
  }, [locale]);

  return { data, loading };
}

export function useFooter(locale: string) {
  const [data, setData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooter(locale)
      .then(setData)
      .finally(() => setLoading(false));
  }, [locale]);

  return { data, loading };
}

export function useFooterOfferProjects(locale: string) {
  const [data, setData] = useState<OfferProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooterOfferProjects(locale)
      .then(setData)
      .finally(() => setLoading(false));
  }, [locale]);

  return { data, loading };
}

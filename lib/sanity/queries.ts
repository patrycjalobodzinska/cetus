export const QUERIES = {
  technologies: `*[_type == "technologies"][0] {
    "title": title,
    "description": description,
    "categories": categories[] | order(order asc) {
      "title": title,
      "items": items,
      order
    }
  }`,

  industries: `*[_type == "industries"][0] {
    "title": title,
    "description": description,
    "items": items[] | order(order asc) {
      "name": name,
      order
    },
    buttonText,
    buttonLink
  }`,

  offerStats: `*[_type == "offerStats"][0] {
    "title": title,
    "description": description,
    "stats": stats[] | order(order asc) {
      value,
      "label": label,
      icon,
      order
    }
  }`,

  aboutUs: (locale: string) => `*[_type == "aboutUs"][0] {
    "title": coalesce(title[$locale], title.pl),
    "description": coalesce(description[$locale], description.pl),
    "primaryButtonText": coalesce(primaryButtonText[$locale], primaryButtonText.pl),
    primaryButtonLink,
    "secondaryButtonText": coalesce(secondaryButtonText[$locale], secondaryButtonText.pl),
    secondaryButtonLink,
    image,
    statValue,
    "statLabel": coalesce(statLabel[$locale], statLabel.pl),
    "statSubLabel": coalesce(statSubLabel[$locale], statSubLabel.pl)
  }`,

  history: (locale: string) => `*[_type == "history"] | order(order asc) {
    _id,
    year,
    "title": coalesce(title[$locale], title.pl),
    "description": coalesce(description[$locale], description.pl),
    image,
    order
  }`,

  team: (locale: string) => `*[_type == "team" && hidden != true] | order(order asc) {
    _id,
    firstName,
    lastName,
    "position": coalesce(position[$locale], position.pl),
    image,
    order
  }`,

  faqs: (locale: string) => `*[_type == "faq"] | order(order asc) {
    _id,
    "title": coalesce(title[$locale], title.pl),
    "description": coalesce(description[$locale], description.pl),
    order
  }`,

  partners: (locale: string) => `*[_type == "partner"] | order(order asc) {
    _id,
    "name": coalesce(name[$locale], name.pl),
    logo,
    "description": coalesce(description[$locale], description.pl),
    "caseStudySlug": caseStudy->slug.current
  }`,

  homepageModules: (locale: string) => `*[_type == "homepageModule"] | order(order asc) {
    _id,
    moduleNumber,
    "title": coalesce(title[$locale], title.pl),
    "description": coalesce(description[$locale], description.pl),
    image,
    link,
    "linkText": coalesce(linkText[$locale], linkText.pl)
  }`,

  caseStudies: (locale: string) => `*[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    "title": coalesce(title[$locale], title.pl),
    slug,
    "category": coalesce(category[$locale], category.pl),
    "description": coalesce(description[$locale], description.pl),
    "solution": coalesce(solution[$locale], solution.pl),
    image
  }`,

  caseStudyBySlug: (locale: string) => `*[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.pl),
    slug,
    "category": coalesce(category[$locale], category.pl),
    "description": coalesce(description[$locale], description.pl),
    image,
    "solution": coalesce(solution[$locale], solution.pl),
    "results": coalesce(results[$locale], results.pl),
    technologies
  }`,

  caseStudySlugs: `*[_type == "caseStudy"] {
    "slug": slug.current
  }`,

  footer: (locale: string) => `*[_type == "footer"][0] {
    "contactTitle": coalesce(contactTitle[$locale], contactTitle.pl),
    "contactDescription": coalesce(contactDescription[$locale], contactDescription.pl),
    phone,
    email,
    address,
    "primaryButtonText": coalesce(primaryButtonText[$locale], primaryButtonText.pl),
    primaryButtonLink,
    "secondaryButtonText": coalesce(secondaryButtonText[$locale], secondaryButtonText.pl),
    secondaryButtonLink,
    companyLinks[] {
      "text": coalesce(text[$locale], text.pl),
      url
    },
    documentLinks[] {
      "text": coalesce(text[$locale], text.pl),
      url
    },
    socialMedia[] {
      platform,
      url
    },
    "copyright": coalesce(copyright[$locale], copyright.pl)
  }`,

  footerOfferProjects: (locale: string) => `*[_type == "footer"][0] {
    "projects": projects[] | order(order asc) {
      _id,
      "title": coalesce(title[$locale], title.pl),
      "slug": slug.current,
      order
    }
  }`,
};

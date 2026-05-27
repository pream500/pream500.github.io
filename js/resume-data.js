/**
 * resume-data.js
 * Contains the decoupled structured configuration for Puriphan Sawatudomphon's resume and portfolio.
 * Edit this file to update the personal details, experience, skills, and projects on the website.
 */

export const resumeData = {
  personalInfo: {
    name: "Puriphan Sawatudomphon",
    title: "Consultant - Data & Platforms",
    subtitle: "Bridging the gap between business vision and advanced analytics engineering.",
    avatar: "./Screenshot 2026-05-26 at 6.38.43 am.png", // Matches workspace image
    email: "spuriphan@gmail.com",
    phones: [
      { label: "AU", number: "+61478527096" },
      { label: "TH", number: "+66910097096" }
    ],
    address: "1333/592 Krungthep-Nonthaburi road, Wongsawang, Bangsue, BKK 10800",
    github: "https://github.com/pream500",
    linkedin: "https://linkedin.com", // Placeholder
    aboutMe: "A senior-level data professional with extensive experience leading data analytics strategy and engineering across global clients and telecommunications. Expert in architecting modern measurement systems, deploying Adobe Experience Cloud and Google Marketing Platform at scale, and executing high-ROI data pipelines. Skilled in transforming complex datasets into actionable executive insights while acting as a trusted liaison between technical teams and business stakeholders."
  },
  
  typewriterWords: [
    "Data & Platforms Consultant",
    "Digital Data Engineer",
    "Data Analytics Manager",
    "Business Intelligence Architect"
  ],

  themeConfig: {
    defaultTheme: "dark" // "dark" or "light" (dark-mode-first)
  },

  web3forms: {
    // Paste your Web3Forms access key here to activate live emails.
    // If kept as standard placeholder, the website triggers an interactive simulated sandbox.
    accessKey: "YOUR_ACCESS_KEY_HERE"
  },

  skills: [
    {
      category: "Data & Analytics",
      items: [
        { name: "Google Analytics (GA4/GA360)", level: 98 },
        { name: "BigQuery & SQL", level: 95 },
        { name: "Applied Statistics", level: 90 },
        { name: "Python Data Analysis", level: 85 },
        { name: "Adobe Analytics", level: 92 }
      ]
    },
    {
      category: "Platforms & Tagging",
      items: [
        { name: "Google Tag Manager (GTM)", level: 98 },
        { name: "Firebase Analytics", level: 90 },
        { name: "Adobe Experience Cloud", level: 88 },
        { name: "A/B Testing & Personalization", level: 92 },
        { name: "Search Engine Optimization (SEO)", level: 85 }
      ]
    },
    {
      category: "Data Visualization",
      items: [
        { name: "Looker Studio (Data Studio)", level: 95 },
        { name: "Tableau & Power BI", level: 90 },
        { name: "Domo Dashboarding", level: 88 },
        { name: "Adobe Analytics Workspace", level: 92 }
      ]
    },
    {
      category: "Strategy & Management",
      items: [
        { name: "Stakeholder Alignment", level: 96 },
        { name: "Team Management", level: 90 },
        { name: "Data Strategy & Governance", level: 94 },
        { name: "Client Consulting", level: 95 }
      ]
    }
  ],

  experience: [
    {
      role: "Consultant - Data and Platforms",
      company: "Digital Balance Australia PTY Limited",
      location: "Sydney, Australia (Remote/Hybrid)",
      period: "Aug 29, 2022 – Dec 31, 2025",
      description: "Led comprehensive measurement architectures and data-driven strategy for multiple major Australian and international enterprises, optimizing digital marketing ROI and data collection integrity.",
      accomplishments: [
        "Developed and maintained strong relationships with multiple high-value clients and stakeholders to map operational business needs to digital solutions.",
        "Provided comprehensive measurement solutions that successfully integrated technology, data, process, people, and business strategies.",
        "Created technical, data-driven recommendations maximizing client ROI across cloud and data platforms, refining analytics tools, and upskilling teams.",
        "Analyzed customer behavior, mapped end-to-end user journeys against client KPIs, and identified critical optimization pathways.",
        "Built elite, interactive executive-level dashboards using Adobe Analytics, Looker Studio, Domo, Power BI, and Tableau to enable data-driven business actions.",
        "Collaborated closely with developers to test, audit, and debug tracking codes, ensuring 100% data collection precision.",
        "Managed enterprise-scale deployment of Adobe Experience Cloud and Google Marketing Platform, including tracking, tagging setup, data ingestion, and overall platform health."
      ]
    },
    {
      role: "Senior Manager, Digital Data Engineer",
      company: "Total Access Communication Public Co. Ltd (dtac)",
      location: "Bangkok, Thailand",
      period: "Aug 1, 2020 - Apr 30, 2022",
      description: "Spearheaded the enterprise-wide analytics tracking roadmap and led a team in designing massive naming conventions, product configurations, and migrating to modern tracking frameworks.",
      accomplishments: [
        "Analyzed core commercial objectives and defined data requirements to ensure accurate, valuable, and compliant tracking across all web and application frameworks.",
        "Designed and implemented a unified, global data naming convention and schema layout for digital assets.",
        "Managed and governed cloud access and security protocols across Google Cloud Platform, Google Analytics, GTM, and Firebase.",
        "Cleaned and processed complex performance datasets, utilizing Data Studio to surface strategic visual insights for executive decision-makers.",
        "Implemented secure 3rd-party cookie tracking and cookie consent policies to support the digital media team using GTM.",
        "Successfully migrated dtac's enterprise analytics pipeline from legacy GA360 to Google Analytics 4 (GA4) with zero tracking downtime.",
        "Acted as the key bridge and translator between deep technology engineers and business executives, ensuring products aligned perfectly with growth targets."
      ]
    },
    {
      role: "Data Analyst Manager",
      company: "Predictive Co. Ltd",
      location: "Bangkok, Thailand",
      period: "Mar 27, 2017 - Jun 30, 2020",
      description: "Managed and scaled a team of junior and senior data analysts, establishing high-quality engineering workflows and delivering state-of-the-art data analytics consulting for diverse industries.",
      accomplishments: [
        "Consulted both domestic and international enterprises to unpack complex data problems and draft specifications.",
        "Managed a growing team of analysts, guaranteeing project deliverables met precision requirements and were delivered ahead of deadlines.",
        "Configured advanced website/mobile app tracking solutions to record detailed user interactions.",
        "Engineered statistical models and custom reports using Python, SQL, and BigQuery to measure exact campaign and website impact.",
        "Conducted training sessions and workshops for client companies to establish a data-informed internal culture.",
        "Drove significant organic traffic growth by implementing technical Search Engine Optimization (SEO) best practices.",
        "Ran rigorous A/B tests and personalization logic using Google Optimize, raising online conversions by up to 25%."
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor’s Degree in Science, Major Applied Statistics",
      institution: "King Mongkut's Institute of Technology Ladkrabang",
      location: "Bangkok, Thailand",
      period: "June 11, 2012 - May 30, 2016",
      details: "Rigorous coursework focusing on statistical analysis, data modeling, computational mathematics, and probability theory, providing a deep analytical foundation."
    }
  ],

  projects: [
    {
      id: "ga4-migration",
      title: "GA360 to GA4 Enterprise Migration",
      category: "Data Platforms",
      shortDesc: "Migrated a leading telecom carrier's complete analytics framework to GA4.",
      thumbnail: "analytics_thumbnail", // Fallback, will style with high-quality icons/gradients
      techTags: ["GA4", "GA360", "Google Tag Manager", "GCP", "Firebase"],
      highlights: [
        "Zero tracking downtime across millions of active monthly web and mobile application sessions.",
        "Created dtac's global naming convention and data dictionary covering 500+ customized parameters.",
        "Integrated Firebase and web streams into a single unified Google Analytics 4 property.",
        "Configured secure real-time streaming pipelines from GA4 straight into Google BigQuery."
      ],
      detailsText: "Successfully designed and executed the strategic migration from Universal Analytics (GA360) to GA4 for a major telecommunications operator. This included mapping legacy events to the new event-driven measurement model, implementing unified consent frameworks, training over 100 internal marketing specialists on Looker Studio interfaces, and ensuring that marketing campaigns had uninterrupted conversion attribution data."
    },
    {
      id: "adobe-experience-cloud",
      title: "Adobe Experience Cloud Strategy",
      category: "Analytics",
      shortDesc: "Architected enterprise measurement suite for financial and hospitality enterprises.",
      thumbnail: "adobe_thumbnail",
      techTags: ["Adobe Experience Cloud", "Adobe Analytics", "Launch", "Domo", "Tableau"],
      highlights: [
        "Created standardized data layer guidelines for cross-domain customer analytics.",
        "Replaced fragmented vendor scripts with Adobe Experience Platform Web SDK.",
        "Consolidated Adobe Workspace views to enable real-time cohort tracking.",
        "Connected digital touchpoints with offline transactional data inside Domo."
      ],
      detailsText: "Built and managed advanced customer measurement platforms utilizing Adobe's enterprise stack. Designed complex processing rules in Adobe Analytics and set up tags using Adobe Launch. This solution enabled real-time customer behavior reports, deep funnel analysis, and high-fidelity dashboard synchronizations that eliminated data discrepancies between product owners, marketing coordinators, and billing platforms."
    },
    {
      id: "bigquery-pipeline",
      title: "BigQuery Automated Dashboard Suite",
      category: "Data Engineering",
      shortDesc: "Automated ETL pipelines and executive analytics dashboards to track digital ROI.",
      thumbnail: "bigquery_thumbnail",
      techTags: ["BigQuery", "SQL", "Python", "Looker Studio", "Power BI"],
      highlights: [
        "Designed automated Python ETL jobs that aggregate ad spend with analytics tables.",
        "Reduced monthly dashboard maintenance time from 40 hours to zero.",
        "Implemented granular row-level data access policies for different departments.",
        "Crafted responsive executive reporting boards inside Microsoft Power BI and Looker Studio."
      ],
      detailsText: "Developed custom data collection, cleaning, and reporting pipelines. Using BigQuery SQL, complex analytical queries were scheduled to run daily to update core business performance tables. This eliminated manual excel reporting and provided key executive teams with instant visibility into client acquisition costs, user lifetimes, conversion rates, and exact platform ROI metrics."
    },
    {
      id: "ab-personalization",
      title: "A/B Personalization Engine",
      category: "Growth & Optimization",
      shortDesc: "Implemented testing strategies that grew client conversion rates by 25%.",
      thumbnail: "personalization_thumbnail",
      techTags: ["Google Optimize", "SEO", "A/B Testing", "JavaScript", "User Journeys"],
      highlights: [
        "A/B tested checkout flow optimizations, reducing cart abandonment rates.",
        "Personalized landing experiences based on incoming user search term intent.",
        "Boosted technical SEO ratings, scaling organic search impressions.",
        "Conducted extensive multivariate tests with strict statistical confidence models."
      ],
      detailsText: "Formulated and executed digital optimization campaigns to bridge the gap between traffic acquisition and actual conversions. By identifying blockages in user flow, and coding light JavaScript overrides, we ran split-tests that verified customer behavior hypotheses. This resulted in optimized landing page copy, better button positioning, and custom SEO configurations that directly drove growth in organic traffic and product checkout."
    }
  ]
};

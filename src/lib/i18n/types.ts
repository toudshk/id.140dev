import type { Project } from "@/lib/data";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogDescription: string;
  };
  nav: {
    aria: string;
    home: string;
    work: string;
    about: string;
    contact: string;
  };
  frame: {
    logoAria: string;
    home: string;
    work: string;
    project: string;
    about: string;
    contact: string;
  };
  home: {
    pitch: string;
    viewWork: string;
    aboutLink: string;
    projectsLabel: string;
    publishedLabel: string;
    statusLabel: string;
    statusValue: string;
    featuredLabel: string;
  };
  about: {
    code: string;
    title: string;
    briefLabel: string;
    lead: string;
    body: string;
    approachLabel: string;
    approach: string;
    end: string;
    write: string;
    rows: {
      name: string;
      focus: string;
      team: string;
      tools: string;
      avoids: string;
      timezone: string;
      load: string;
    };
    rowValues: {
      focus: string;
      team: string;
      tools: string;
      avoids: string;
      timezone: string;
      load: string;
    };
  };
  contact: {
    code: string;
    title: string;
    heading: string;
    hint: string;
    note: string;
    holdAria: string;
    hold: string;
    emailLabel: string;
    footer: string;
  };
  work: {
    title: string;
    code: string;
    heading: string;
    subtitle: string;
    columns: {
      num: string;
      project: string;
      year: string;
      role: string;
      status: string;
    };
    status: {
      live: string;
      private: string;
      wip: string;
    };
    total: string;
    footer: string;
  };
  project: {
    label: string;
    meta: {
      year: string;
      client: string;
      role: string;
      status: string;
    };
    status: {
      live: string;
      private: string;
      wip: string;
    };
    blockKinds: {
      text: string;
      spec: string;
      code: string;
      quote: string;
      image: string;
    };
    noExternal: string;
    back: string;
  };
  notFound: {
    message: string;
    back: string;
  };
  site: {
    alias: string;
    name: string;
    role: string;
    city: string;
    year: string;
  };
  projects: Project[];
};

import projectsData from "@/data/projects.json";
import peopleData from "@/data/people.json";
import papersData from "@/data/papers.json";
import blogData from "@/data/blog.json";
import siteData from "@/data/site.json";

export type ProjectLink = {
  repo?: string;
  paper?: string;
  docs?: string;
  site?: string;
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: "active" | "planned" | "archived";
  links: ProjectLink;
  tags: string[];
};

export type Person = {
  name: string;
  role?: string;
  affiliation?: string;
  description?: string;
  avatar?: string;
  website?: string;
  googleScholar?: string;
  github?: string;
};

export type Paper = {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  url: string;
  project?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  url?: string;
};

export type Site = {
  name: string;
  tagline: string;
  links: { repo?: string };
};

export const site = siteData as Site;

export function getProjects(): Project[] {
  return (projectsData as { projects: Project[] }).projects;
}

export function getPeople(): Person[] {
  return (peopleData as { people: Person[] }).people;
}

export function getPapers(): Paper[] {
  return (papersData as { papers: Paper[] }).papers;
}

export function getBlogPosts(): BlogPost[] {
  return (blogData as { posts: BlogPost[] }).posts;
}

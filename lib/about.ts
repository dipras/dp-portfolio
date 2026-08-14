import { readFileSync } from "node:fs";
import path from "node:path";

export type Skill = {
  label: string;
  icon: string;
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
};

export type EducationEntry = {
  program: string;
  school: string;
  status: string;
  description: string;
};

export type About = {
  name: string;
  nickname: string;
  title: string;
  email: string;
  website: string;
  github: string;
  photo: string;
  intro: string;
  skills: Skill[];
  resumeSkills: SkillGroup[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
};

export function getAbout() {
  const file = path.join(process.cwd(), "content", "about.json");
  return JSON.parse(readFileSync(file, "utf8")) as About;
}

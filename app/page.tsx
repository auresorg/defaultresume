"use client";

import { useEffect, useState } from "react";

import { Navigation } from "@/components/portfolio/navigation";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Footer } from "@/components/portfolio/footer";

type AuresData = {
  username: string;
  avatar?: string;
  email?: string;
  skills?: Record<string, number>;
  projects?: any[];
  experience?: any[];
  profile?: {
    firstName?: string;
    lastName?: string;
    linkedin?: string;
    portfolio?: string;
    education?: {
      school: string;
      degree: string;
      description: string;
      startDate: string;
      endDate: string;
      field: string;
    };
  };
};

type Config = {
  heroTitle: string;
  bio: string;
  aboutTitle: string;
  aboutText: string[];
  contactTitle: string;
  contactBio: string;
};

export default function Portfolio() {
  const [data, setData] = useState<AuresData | null>(null);
  const [config, setConfig] = useState<Config | null>(null);
  const [skillsMap, setSkillsMap] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const configRes = await fetch("/config.json");
      const configData = await configRes.json();

      if (!configData.username) {
        console.error("Username not found in config.json");
        return;
      }

      const apiRes = await fetch(
        `https://aures.dev/api/public/${configData.username}?select=profile,projects,experience,skills,email`,
      );

      const apiData = await apiRes.json();

      const skillsRes = await fetch("/skills.json");
      const skillsData = await skillsRes.json();

      // Set document title to the person's name from API
      if (apiData?.profile?.firstName || apiData?.profile?.lastName) {
        const fullName = `${apiData.profile.firstName ?? ""} ${apiData.profile.lastName ?? ""}`.trim();
        if (fullName) {
          document.title = fullName;
        }
      }

      setData(apiData);
      setConfig(configData);
      setSkillsMap(skillsData);
    }

    load();
  }, []);

  if (!data || !config) return null;

  const name =
    `${data.profile?.firstName ?? ""} ${data.profile?.lastName ?? ""}`.trim();

  const allSkills = Object.keys(data.skills ?? {});

  const skillCategories: Record<string, string[]> = {
    Languages: skillsMap?.Languages || [],
    Databases: skillsMap?.Databases || [],
    Platforms: skillsMap?.Platforms || [],
    Frameworks: skillsMap?.Frameworks || [],
    Tools: skillsMap?.Tools || [],
    "Operating Systems": skillsMap?.["Operating Systems"] || [],
    Others: [],
  };

  const categorized: Record<string, string[]> = {
    Languages: [],
    Databases: [],
    Platforms: [],
    Frameworks: [],
    Tools: [],
    "Operating Systems": [],
    Others: [],
  };

  allSkills.forEach((skill) => {
    const skillLower = skill.toLowerCase();
    let matched = false;

    for (const category of [
      "Languages",
      "Databases",
      "Platforms",
      "Frameworks",
      "Tools",
      "Operating Systems",
    ]) {
      if (
        skillCategories[category].some(
          (item: string) => item.toLowerCase() === skillLower,
        )
      ) {
        categorized[category].push(skill);
        matched = true;
        break;
      }
    }

    if (!matched) categorized["Others"].push(skill);
  });
  return (
    <main className="min-h-screen bg-background">
      <Navigation name={name} username={data.username} />

      <HeroSection
        username={data.username}
        name={name}
        title={config.heroTitle}
        linkedin={data.profile?.linkedin ?? "#"}
        email={data.email ?? ""}
        bio={config.bio}
      />

      <AboutSection
        title={config.aboutTitle}
        name={name}
        p1={config.aboutText[0]}
        p2={config.aboutText[1]}
        p3={config.aboutText[2]}
        username={data.username}
      />

      <SkillsSection
        skills={Object.entries(categorized)
          .filter(([_, items]) => items.length > 0)
          .map(([category, items]) => ({
            category,
            items,
          }))}
      />

      <ProjectsSection
        projects={(data.projects ?? []).map((p: any) => ({
          title: p.name,
          description: p.desc,
          tech: p.tech ?? [],
          repo: p.repo,
          live: p.url,
        }))}
      />

      <ExperienceSection
        experiences={[
          ...(data.profile?.education
            ? [
              {
                title: data.profile.education.degree + " in " + data.profile.education.field,
                company: data.profile.education.school,
                description: data.profile.education.description,
                start: new Date(data.profile.education.startDate),
                period: `${new Date(
                  data.profile.education.startDate
                ).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })} — ${new Date(
                  data.profile.education.endDate
                ).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}`,
                skills: [],
                link: "#",
              },
            ]
            : []),

          ...(data.experience ?? []).map((e: any) => {
            const formatDate = (date: string) => {
              const d = new Date(date);
              const day = d.getDate();
              const suffix =
                day % 10 === 1 && day !== 11
                  ? "st"
                  : day % 10 === 2 && day !== 12
                    ? "nd"
                    : day % 10 === 3 && day !== 13
                      ? "rd"
                      : "th";

              return d
                .toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "2-digit",
                })
                .replace(/\d+/, `${day}${suffix}`);
            };

            return {
              title: e.title,
              company: e.company,
              description: e.description,
              start: new Date(e.startDate),
              period: `${formatDate(e.startDate)} — ${e.endDate ? formatDate(e.endDate) : "Present"
                }`,
              skills: [],
              link: "#",
            };
          }),
        ]
          .sort((a: any, b: any) => b.start.getTime() - a.start.getTime())
          .map(({ start, ...rest }) => rest)}
      />

      <ContactSection
        title={config.contactTitle}
        bio={config.contactBio}
        email={data.email ?? ""}
        linkedin={data.profile?.linkedin ?? "#"}
        username={data.username}
      />

      <Footer text="Built with aures.dev" name={name} />
    </main>
  );
}

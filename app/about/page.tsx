import Image from "next/image";
import Link from "next/link";

const FALLBACK_ERROR_ROUTE = "/not-found";

const dockApps = [
  { name: "Figma", icon: "https://www.figma.com/api/mcp/asset/3928281a-3d0f-4b48-b7b7-adc64467900d" },
  { name: "Cursor", icon: "https://www.figma.com/api/mcp/asset/c4008ecb-0f80-475f-8f10-1e21da0f250c" },
  { name: "Affinity", icon: "https://www.figma.com/api/mcp/asset/7077e9dd-7ed2-4b04-95e6-2112418ef724" },
  { name: "Github Desktop", icon: "https://www.figma.com/api/mcp/asset/0022a158-2622-49f7-85b1-51899b386bfe" },
  { name: "Notion", icon: "https://www.figma.com/api/mcp/asset/99e8f6a5-ae66-4dcd-ac56-4bde678ac862" },
  { name: "Framer", icon: "https://www.figma.com/api/mcp/asset/690d584b-d135-4799-b944-1b75510e8e5f" },
  { name: "Spotify", icon: "https://www.figma.com/api/mcp/asset/cad70b18-1f0b-48a9-b78d-2cbb108071ce" },
  { name: "WhatsApp", icon: "https://www.figma.com/api/mcp/asset/15c7de87-fd3a-4e2f-9fc6-1110cf302c97" },
  { name: "Finder", icon: "https://www.figma.com/api/mcp/asset/c7b30e4e-76ac-4525-a021-05506e87a664" },
  { name: "Trash", icon: "https://www.figma.com/api/mcp/asset/5271f34d-aa24-47e4-9454-6abff83ccbf0" },
] as const;

const experienceItems = [
  { logo: "https://www.figma.com/api/mcp/asset/50d1c82a-d05c-4f80-a163-0e1c00ba3c90", title: "Product Designer", company: "SF Sekuritas", date: "Dec 2021 - Present" },
  { logo: "https://www.figma.com/api/mcp/asset/59273ef0-1816-43f7-a41f-863d190682e6", title: "Product Specialist", company: "CIMB Niaga", date: "Mar 2020 - Dec 2021" },
  { logo: "https://www.figma.com/api/mcp/asset/680de076-0449-4758-9635-c27db1c4b250", title: "Graphic Designer", company: "Ristek-BRIN", date: "Apr 2018 - Mar 2020" },
] as const;

const certificationItems = [
  { logo: "https://www.figma.com/api/mcp/asset/3dca2474-52eb-49c4-bcac-87eead56e79c", title: "Responsive Web Design", org: "freeCodeCamp", date: "Oct 2025" },
  { logo: "https://www.figma.com/api/mcp/asset/c9973cc3-6979-46ee-ba11-582a15f12af7", title: "HTML & CSS", org: "Progate", date: "Jan 2024" },
  { logo: "https://www.figma.com/api/mcp/asset/b4777a9f-fdbf-4823-996a-e4003e6a8b49", title: "English Certificate (C1 Advanced)", org: "EF SET", date: "Jul 2023" },
  { logo: "https://www.figma.com/api/mcp/asset/4c174135-2b11-4241-b413-358822deca9f", title: "Training Awareness Based on ISO27001:2022", org: "ISO", date: "Jul 2023" },
  { logo: "https://www.figma.com/api/mcp/asset/3aaaa0bb-3254-45c5-b67e-c1236d0b9b84", title: "101 Crash Course", org: "Protopie", date: "Apr 2023" },
  { logo: "https://www.figma.com/api/mcp/asset/81d63956-c47f-41f8-b548-829cdd0d7f3b", title: "Enterprise Design Thinking Co-Creator", org: "IBM", date: "Sep 2022" },
  { logo: "https://www.figma.com/api/mcp/asset/81d63956-c47f-41f8-b548-829cdd0d7f3b", title: "Enterprise Design Thinking Practitioner", org: "IBM", date: "Aug 2022" },
] as const;

function LogoMark() {
  return (
    <Link href="/" aria-label="Go to home" className="group relative block h-[27px] w-[124px]">
      <Image src="/logo-haekal-default.svg" alt="Haekal" width={124} height={27} unoptimized className="absolute inset-0 h-full w-full opacity-100 transition-opacity duration-200 group-hover:opacity-0" />
      <Image src="/logo-haekal-hover.svg" alt="Haekal" width={124} height={27} unoptimized className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} target="_blank" rel="noreferrer noopener" className="relative inline-flex items-center gap-1">
      {children}
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M14.3763 12.7083V5.625H7.29297" stroke="#141414" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.1667 5.83203L5.625 14.3737" stroke="#141414" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

function ArrowButton() {
  return (
    <div className="bg-[#FAFAFA] p-[6px] rounded-[1000px] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M14.3763 12.7083V5.625H7.29297" stroke="#707070" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.1667 5.83203L5.625 14.3737" stroke="#707070" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAFA] text-black">
      <header className="pointer-events-none fixed inset-x-0 top-6 z-40 hidden px-10 sm:block lg:px-[60px]">
        <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[1320px] items-center justify-between">
          <LogoMark />
          <nav aria-label="Primary navigation" className="flex items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]">
            <Link href="/" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] hover:bg-[#F2F2F2]">Home</Link>
            <Link href="/about" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] bg-[#F2F2F2] text-center text-base leading-[21px] text-black">About</Link>
            <Link href="/#designs" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-center text-base leading-[21px] text-[#707070] hover:bg-[#F2F2F2]">Designs</Link>
          </nav>
          <Link href="mailto:alhaekalnast@gmail.com" className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070]">Let&apos;s Talk</Link>
        </div>
      </header>

      <header className="pointer-events-none fixed inset-x-0 top-6 z-40 px-4 sm:hidden">
        <div className="pointer-events-auto mx-auto flex h-[46px] w-full max-w-[358px] items-center justify-between">
          <LogoMark />
          <Link href="mailto:alhaekalnast@gmail.com" className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070]">Let&apos;s Talk</Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-4 pt-[124px] sm:px-10 lg:px-[60px]">
        <section className="grid gap-10 py-10 lg:grid-cols-[1fr_648px] lg:py-14">
          <div className="space-y-4">
            <h1 className="text-[32px] leading-[40px] tracking-[-1px]">About Haekal</h1>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">I&apos;m Haekal, a product designer with 4+ years of experience building digital products across trading, payments, and B2B systems.</p>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">I work closely with product and engineering to simplify complex flows into clear and usable experiences.</p>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">Before product design, my background was in visual communication and marketing, which shaped how I think about clarity, storytelling, and communication.</p>
            <p className="max-w-[632px] text-base leading-6 text-[#707070]">More of a quiet builder. I think, structure, and iterate. Recently exploring how design decisions turn to implementation.</p>
          </div>

          <div className="space-y-6">
            <article className="relative h-[324px] overflow-hidden rounded-[20px] bg-[#F2F2F2] pl-10 md:pl-0 lg:pl-10">
              <div className="absolute top-6 right-0 bottom-20 flex items-center">
                <div className="relative h-[124px] w-[290px] overflow-hidden md:w-[530px]">
                  <div className="absolute top-[39px] left-0 h-[85px] w-[880px] rounded-[20px] border border-[#484848] bg-[rgba(40,40,40,0.6)] shadow-[0_2px_2px_rgba(0,0,0,0.25)] backdrop-blur-[12px]" />
                  <div className="absolute top-[48px] left-[6px] flex h-[66px] w-[868px] items-center gap-[5px]">
                    {dockApps.map((app) => (
                      <div key={app.name} className="relative">
                        <Image src={app.icon} alt={app.name} width={66} height={66} unoptimized className="h-[66px] w-[66px] shrink-0 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Link href={FALLBACK_ERROR_ROUTE} className="absolute bottom-4 left-4 z-20">
                <ArrowButton />
              </Link>
            </article>

            <div className="grid gap-6 sm:grid-cols-2">
              <article className="relative h-[210px] overflow-hidden rounded-[20px] bg-[#F2F2F2]">
                <Image src="https://www.figma.com/api/mcp/asset/b0429ba2-2061-4fed-bf2e-76d642d12d60" alt="Resume preview" fill unoptimized className="object-cover" />
                <Link href={FALLBACK_ERROR_ROUTE} className="absolute bottom-4 left-4"><ArrowButton /></Link>
              </article>
              <article className="relative h-[210px] overflow-hidden rounded-[20px] bg-[#F2F2F2]">
                <Image src="https://www.figma.com/api/mcp/asset/af83d8f4-84d1-4e27-987a-5a0aae600c38" alt="Portrait" fill unoptimized className="object-cover" />
                <Link href={FALLBACK_ERROR_ROUTE} className="absolute bottom-4 left-4"><ArrowButton /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className="py-[64px]">
          <h2 className="text-[32px] leading-[40px] tracking-[-1px]">Experience</h2>
          <p className="mt-2 mb-6 text-base leading-6 text-[#707070]">From communication and design to product and digital systems.</p>
          <div className="grid gap-3 lg:grid-cols-3">
            {experienceItems.map((item) => (
              <article key={item.title} className="flex items-center gap-2 rounded-[16px] bg-[#F2F2F2] p-2">
                <div className="relative h-[50px] w-[50px] overflow-hidden rounded-[12px] bg-white">
                  <Image src={item.logo} alt={item.company} fill unoptimized className="object-contain" />
                </div>
                <div>
                  <p className="text-base leading-6 text-black">{item.title}</p>
                  <p className="text-[12px] leading-4 text-[#707070]">{item.company} | {item.date}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-[64px]">
          <h2 className="text-[32px] leading-[40px] tracking-[-1px]">Learning &amp; Certifications</h2>
          <p className="mt-2 mb-6 text-base leading-6 text-[#707070]">Covering design, frontend, communication, and security fundamentals.</p>
          <div className="grid gap-3 lg:grid-cols-2">
            {certificationItems.map((item) => (
              <article key={item.title} className="flex items-center gap-2 rounded-[16px] bg-[#F2F2F2] p-2">
                <div className="relative h-[50px] w-[50px] overflow-hidden rounded-[12px] bg-white">
                  <Image src={item.logo} alt={item.org} fill unoptimized className="object-contain" />
                </div>
                <div>
                  <p className="text-base leading-6 text-black">{item.title}</p>
                  <p className="text-[12px] leading-4 text-[#707070]">{item.org} | {item.date}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-[64px]">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[40px] leading-[56px] tracking-[-1px]">Creative Journal</h2>
              <p className="text-base leading-6 text-[#707070]">Work from my early years in visual communication, branding, and marketing, shaping how I design today.</p>
            </div>
            <Link href={FALLBACK_ERROR_ROUTE} className="hidden rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070] lg:inline-flex">Explore Journal</Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <article className="relative h-[210px] overflow-hidden rounded-[20px] bg-[#F2F2F2] lg:col-span-1">
              <Image src="https://www.figma.com/api/mcp/asset/706e447e-7f5c-4b07-9c47-f0c39d1b1be0" alt="Campaign" fill unoptimized className="object-cover" />
              <Link href={FALLBACK_ERROR_ROUTE} className="absolute bottom-4 left-4"><ArrowButton /></Link>
            </article>
            <article className="relative h-[210px] overflow-hidden rounded-[20px] bg-[#F2F2F2]">
              <Image src="https://www.figma.com/api/mcp/asset/504366ec-43dd-43e3-9c68-e11105caa11a" alt="Shirt mockup" fill unoptimized className="object-cover" />
              <Link href={FALLBACK_ERROR_ROUTE} className="absolute bottom-4 left-4"><ArrowButton /></Link>
            </article>
            <article className="relative h-[210px] overflow-hidden rounded-[20px] bg-[#F2F2F2]">
              <Image src="https://www.figma.com/api/mcp/asset/1b6eeb35-5e3a-42cb-9544-e77a61d0a3d3" alt="Packaging" fill unoptimized className="object-cover" />
              <Link href={FALLBACK_ERROR_ROUTE} className="absolute bottom-4 left-4"><ArrowButton /></Link>
            </article>
            <article className="relative h-[210px] overflow-hidden rounded-[20px] bg-[#F2F2F2] lg:col-span-2">
              <Image src="https://www.figma.com/api/mcp/asset/88f76452-7cd9-4ebe-a233-54de61aaf2fb" alt="Event campaign" fill unoptimized className="object-cover" />
              <Link href={FALLBACK_ERROR_ROUTE} className="absolute bottom-4 left-4"><ArrowButton /></Link>
            </article>
          </div>

          <div className="mt-6 flex justify-center lg:hidden">
            <Link href={FALLBACK_ERROR_ROUTE} className="rounded-[230px] bg-[#F2F2F2] px-6 py-3 text-base leading-[21px] text-[#707070]">Explore Journal</Link>
          </div>
        </section>
      </main>

      <footer className="w-full bg-[#F2F2F2]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-4 pb-[124px] sm:px-10 lg:px-[60px]">
          <div className="flex flex-col gap-16 py-8 sm:py-20">
            <div className="flex items-start justify-between gap-8 sm:gap-6">
              <LogoMark />
              <nav className="flex flex-col items-end gap-6 text-base leading-6 text-black sm:flex-row sm:items-center sm:gap-6">
                <FooterLink href="https://docs.google.com/document/d/1rFAuSJrV4IpffI2PRfBmjHlHG5QDDF6L/edit?usp=sharing&ouid=107776713613949709441&rtpof=true&sd=true">Resume</FooterLink>
                <FooterLink href="https://www.linkedin.com/in/haekalnast/">Linkedin</FooterLink>
                <FooterLink href="https://github.com/haekalnast">Github</FooterLink>
              </nav>
            </div>
            <p className="text-base leading-6 font-light text-[#707070]">
              Copyright © 2026 Bagas Al Haekal Nasution
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              All rights reserved
            </p>
          </div>
        </div>
      </footer>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 px-4 sm:hidden">
        <nav aria-label="Mobile navigation" className="pointer-events-auto mx-auto flex w-fit items-center rounded-[56px] border border-black/10 bg-white/80 p-[5px] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.10)] backdrop-blur-[8px]">
          <Link href="/" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-base leading-[21px] text-[#707070]">Home</Link>
          <Link href="/about" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] bg-[#F2F2F2] text-base leading-[21px] text-black">About</Link>
          <Link href="/#designs" className="flex h-[46px] w-[84px] items-center justify-center rounded-[230px] text-base leading-[21px] text-[#707070]">Designs</Link>
        </nav>
      </div>
    </div>
  );
}


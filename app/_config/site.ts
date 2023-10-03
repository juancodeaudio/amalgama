export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Music Web",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Inicio",
			href: "/",
		},
    {
      label: "Cursos",
      href: "/courses",
    },
    {
      label: "Acerca de",
      href: "/about",
    },
    {
      label: "Referencias",
      href: "/references",
    },
	],
	navMenuItems: [
		{
			label: "Inicio",
			href: "/",
		},
    {
      label: "Cursos",
      href: "/courses",
    },
    {
      label: "Acerca de",
      href: "/about",
    },
    {
      label: "Referencias",
      href: "/references",
    },
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};

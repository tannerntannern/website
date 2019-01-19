// TODO: maybe do something like https://html5up.net/paradigm-shift, but maybe with arrows
// TODO: will need a search bar or tag filtering thing

enum Type {
	Professional, Personal
}

enum Category {
	Website, Package, Framework
}

enum Technology {
	HTML, Pug,
	CSS, SASS,
	JavaScript, TypeScript,
	'Node.js',
	'Vue.js', React,
	Materialize,
	php, Laravel, 'Laravel Voyager',
	GameMaker
}

type Timeline = {start: string, end?: string};

type Project = {
	type: Type,
	category: Category,
	technologies: Technology[],
	timeline: Timeline,
	openSource: boolean,
	title: string,
	description: string,
	links: {
		website?: string,
		demo?: string,
		source?: string,
		install?: string,
		download?: string,
		blogPost?: string
	}
}

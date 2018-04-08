module.exports = {
  navbar: [
    {text: "Home", href: "#top-of-page"},
    {text: "About me", href: "#about-me"},
    {text: "My work", href: "#my-work"},
    {text: "Contact", href: "#contact"}
  ],
  availableForHire: false,
  skills: {
    languages: {
      "HTML": "95",
      "Pug": "95",
      "CSS": "70",
      "Sass": "65",
      "JavaScript": "95",
      "TypeScript": "70",
      "PHP": "75",
      "SQL": "50",
      "Java": "65",
      "C/C++": "15",
      "Bash": "20",
      "Python": "50"
    },
    frameworks: {
      "Node.js": "65",
      "Vue.js": "75",
      "Riot.js": "45",
      "jQuery": "70",
      "Lodash": "80",
      "Backbone.js": "30",
      "Laravel": "90"
    }
  },
  projects: [
	  {
		  "name": "SportsLab360",
		  "timeFrame": "2017 - Present",
		  "image" : "/img/projects/sportslab360.png",
		  "shortDescription": "An online program aimed at youth soccer clubs to help refine players' tactical abilities.",
		  "longDescription": "",
          "links": {
		    "Website": "https://sportslab360.com"
          }
	  },
      {
          "name": "Abrahamson Website",
          "timeFrame": "Jan 2018 - Mar 2018",
          "image": "/img/projects/abrahamson.png",
		  "shortDescription": "A custom business website complete with a user content management system.",
		  "longDescription": "",
          "links": {
            "Website": "https://abrahamsonnurseries.com"
          }
      },
      {
        "name": "Yob - Graph Editor",
        "timeFrame": "2014 - 2016",
        "image": "/img/projects/yob.png",
        "shortDescription": "A simple and streamlined graphical analysis add-on for Google Docs.",
        "longDescription": "",
        "links": {
          "Installation page": "https://gsuite.google.com/marketplace/app/yob_graph_editor/31608768008",
          "Documentation": "https://jordanhe2.github.io/Yob-Hosting/site/index.html"
        }
      }
  ],
  contacts: {
    "Email": {"icon": "", "link": ""},
    "LinkedIn": {"icon": "", "link": ""},
    "GitHub": {"icon": "", "link": ""}
  }
};
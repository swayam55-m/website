/* ================================================================
   THIS IS YOUR CONTENT FILE — the only JS file you need to edit!

   Everything between the { curly braces } is one item. To add a
   new project/skill/interest, copy an existing block (including
   the comma after it) and change the text.

   Rules that keep JavaScript happy:
   • Keep the quotes "" around every piece of text
   • Keep the comma , after every item except you may leave a
     trailing comma — that's fine too
   • Don't delete the [ ] brackets or the ; at the end
   ================================================================ */


/* ----------------------------------------------------------------
   PROJECTS
   ----------------------------------------------------------------
   title    → the project name
   blurb    → 1–3 sentences. What it does + what you used + result.
   tags     → short tech keywords, shown as little pills
   image    → a picture for the card.
              1. Put your image file in the  images/  folder
              2. Write its path here, e.g. "images/mbta.png"
              Leave it as "" and a nice auto-generated cover
              with the project's initials is shown instead.
   github   → link to the code. Use "" to hide the button.
   demo     → link to a live demo / report / video. "" hides it.

   ⚠ The three projects below are EXAMPLES so you can see how the
     cards look — replace them with your real work!
   ---------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "MBTA Delay Predictor",
    blurb: "Trained a model on public MBTA data to predict Green Line delays during rush hour. Cleaned 100k+ trip records with pandas and reached 78% accuracy with scikit-learn.",
    tags: ["Python", "pandas", "scikit-learn"],
    image: "",
    github: "https://github.com/swayam55-m",
    demo: "",
  },
  {
    title: "Spotify Listening Dashboard",
    blurb: "An interactive dashboard that visualizes my year of Spotify streaming history — top artists, listening moods by hour, and genre drift over the semesters.",
    tags: ["Python", "Plotly", "Streamlit"],
    image: "",
    github: "https://github.com/swayam55-m",
    demo: "",
  },
  {
    title: "BU Course Review Sentiment",
    blurb: "Scraped and analyzed thousands of course reviews with NLP to find which factors actually drive student satisfaction. Presented findings as a business case.",
    tags: ["NLP", "BeautifulSoup", "Matplotlib"],
    image: "",
    github: "",
    demo: "",
  },
];


/* ----------------------------------------------------------------
   SKILLS — grouped into columns. Edit freely.
   ---------------------------------------------------------------- */
const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "SQL", "R", "JavaScript (learning!)"],
  },
  {
    group: "Data & ML",
    items: ["pandas", "NumPy", "scikit-learn", "Matplotlib", "Jupyter"],
  },
  {
    group: "Tools",
    items: ["Git & GitHub", "Excel", "Tableau", "VS Code"],
  },
  {
    group: "Business",
    items: ["Financial analysis", "Market research", "Data storytelling"],
  },
];


/* ----------------------------------------------------------------
   INTERESTS — the "Beyond the data" cards.
   emoji → any emoji (press  Win + .  to open the emoji picker)
   ⚠ These are placeholders — make them yours!
   ---------------------------------------------------------------- */
const INTERESTS = [
  {
    emoji: "🏀",
    title: "Basketball",
    blurb: "Pickup games at FitRec and arguing about advanced stats. Yes, I have opinions about efficiency ratings.",
  },
  {
    emoji: "🍜",
    title: "Food adventures",
    blurb: "Working my way through Boston's ramen and dumpling spots, one neighborhood at a time.",
  },
  {
    emoji: "📷",
    title: "Photography",
    blurb: "Golden hour along the Charles River Esplanade is undefeated.",
  },
  {
    emoji: "✈️",
    title: "Travel",
    blurb: "Every trip is an excuse to build a spreadsheet — and then abandon the itinerary completely.",
  },
];

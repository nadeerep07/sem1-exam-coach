export interface UnitInfo {
  unitNumber: number;
  title: string;
  subjectCode: string;
  summary: string;
  importantTopics: string[];
}

export const UNIT_MAPPINGS: Record<string, UnitInfo[]> = {
  DCA1110: [
    { unitNumber: 1, title: 'Introduction & Multidisciplinary Nature of Environmental Studies', subjectCode: 'DCA1110', summary: 'Scope, importance, public awareness, and natural resources.', importantTopics: ['Multidisciplinary Nature', 'Commercial Energy Sources', 'Deforestation'] },
    { unitNumber: 2, title: 'Ecosystems & Ecological Succession', subjectCode: 'DCA1110', summary: 'Ecosystem structure, energy flow, food webs, hydrosere, and xerosere.', importantTopics: ['Biotic & Abiotic Components', 'Hydrosere & Xerosere', 'Ecological Succession'] },
    { unitNumber: 3, title: 'Biodiversity and Its Conservation', subjectCode: 'DCA1110', summary: 'Genetic, species, ecosystem diversity, threats, and conservation methods.', importantTopics: ['HIPPO Threats', 'In-Situ vs Ex-Situ Conservation', 'Biogeographic Zones'] },
    { unitNumber: 4, title: 'Environmental Pollution', subjectCode: 'DCA1110', summary: 'Air, water, soil, noise, thermal, and nuclear pollution causes & effects.', importantTopics: ['Water Pollution Causes & Health Impact', 'Point & Non-point Sources', 'Eutrophication'] },
    { unitNumber: 5, title: 'Social Issues and the Environment', subjectCode: 'DCA1110', summary: 'Sustainable development, water conservation, climate change, and acid rain.', importantTopics: ['Renewable vs Non-Renewable Energy', 'Rainwater Harvesting', 'Climate Change'] },
    { unitNumber: 6, title: 'Human Population and the Environment', subjectCode: 'DCA1110', summary: 'Population growth, family welfare program, environment & human health.', importantTopics: ['Population Growth Factors', 'Human Health & Environment'] },
    { unitNumber: 7, title: 'Environmental Protection Acts & Disaster Management', subjectCode: 'DCA1110', summary: 'Environmental legislation in India, disaster management phases.', importantTopics: ['Water & Air Act', 'Disaster Management 4 Phases'] },
  ],
  DCA1106: [
    { unitNumber: 1, title: 'Basics of Technical Communication', subjectCode: 'DCA1106', summary: 'Communication process, principles (7 Cs), barriers, and types.', importantTopics: ['Process of Communication', '7 Cs Principles', 'Barriers to Communication'] },
    { unitNumber: 2, title: 'Vocabulary Building & Word Formation', subjectCode: 'DCA1106', summary: 'Affixes, compound words, homophones, synonyms, and antonyms.', importantTopics: ['Affixes & Root Words', 'Compound Words', 'Homophones'] },
    { unitNumber: 3, title: 'Grammar & Sentence Construction', subjectCode: 'DCA1106', summary: 'Parts of speech, active/passive voice, direct/indirect speech.', importantTopics: ['Active vs Passive Voice', 'Common Grammar Errors', 'Direct/Indirect Speech'] },
    { unitNumber: 4, title: 'Professional Writing & Business Documents', subjectCode: 'DCA1106', summary: 'Emails, memos, formal letters, and technical reports.', importantTopics: ['Professional Email Structure', 'Business Memos', 'Technical Reports'] },
    { unitNumber: 5, title: 'Resume Writing & LinkedIn Optimization', subjectCode: 'DCA1106', summary: 'ATS-friendly resumes, cover letters, and LinkedIn profile setup.', importantTopics: ['ATS-Friendly Resume Components', 'LinkedIn Profile Optimization'] },
    { unitNumber: 6, title: 'Presentation Skills & Visual Aids', subjectCode: 'DCA1106', summary: 'Slide design, visual aid engagement, body language, and voice modulation.', importantTopics: ['Effective Presentation Elements', 'Role of Visual Aids', 'Body Language'] },
    { unitNumber: 7, title: 'Public Speaking & Handling Questions', subjectCode: 'DCA1106', summary: 'Overcoming stage fear, audience analysis, and Q&A techniques.', importantTopics: ['Public Speaking Techniques', 'Audience Question Handling'] },
  ],
  DCA1108: [
    { unitNumber: 1, title: 'Introduction to Computer Systems & Hardware', subjectCode: 'DCA1108', summary: 'Generations of computers, CPU architecture, input/output hardware.', importantTopics: ['5 Computer Generations', 'Hardware Diagram', 'Types of Computers'] },
    { unitNumber: 2, title: 'Input & Output Devices', subjectCode: 'DCA1108', summary: 'Keyboards, scanners, printers, monitors, and digitizers.', importantTopics: ['Monitors & Printers', 'Flatbed vs Sheet-fed Scanners'] },
    { unitNumber: 3, title: 'Storage Devices & Memory Systems', subjectCode: 'DCA1108', summary: 'Primary RAM/ROM, secondary optical drives, SSDs, and hard disks.', importantTopics: ['Optical Storage Devices', 'RAM vs ROM'] },
    { unitNumber: 4, title: 'Number Systems & Codes', subjectCode: 'DCA1108', summary: 'Binary, Octal, Decimal, Hexadecimal conversions, BCD, ASCII.', importantTopics: ['Number System Conversions', 'Base 2, 8, 10, 16'] },
    { unitNumber: 5, title: 'Boolean Algebra & Logic Gates', subjectCode: 'DCA1108', summary: 'Logic gates, De Morgan’s laws, K-Maps with don’t-care conditions.', importantTopics: ['De Morgan’s Laws', 'K-Map Simplification', 'Logic Gates'] },
    { unitNumber: 6, title: 'Combinational Circuits & Adders', subjectCode: 'DCA1108', summary: 'Adders, subtractors, magnitude comparators, multiplexers.', importantTopics: ['Carry Propagation Delay', 'Magnitude Comparators'] },
    { unitNumber: 7, title: 'Sequential Circuits & Flip-Flops', subjectCode: 'DCA1108', summary: 'SR, JK, D, T flip-flops, master-slave flip-flops.', importantTopics: ['Flip-Flop Types', 'Asynchronous Counter Construction'] },
    { unitNumber: 8, title: 'Counters & Shift Registers', subjectCode: 'DCA1108', summary: 'Asynchronous/synchronous counters, Johnson counter, shift registers.', importantTopics: ['4-bit Johnson Counter', 'MOD-8 Counter', 'Shift Registers'] },
  ],
  DCA1109: [
    { unitNumber: 1, title: 'Introduction to Web Programming & HTML Basics', subjectCode: 'DCA1109', summary: 'Web architecture, HTML document structure, tags, head & body.', importantTopics: ['HTML Document Structure', 'MIME Types'] },
    { unitNumber: 2, title: 'HTML Lists, Tables & Links', subjectCode: 'DCA1109', summary: 'Ordered/unordered lists, tables, cell padding, cell spacing, links.', importantTopics: ['HTML Lists', 'Table Attributes', 'Hyperlinks (<a>)'] },
    { unitNumber: 3, title: 'HTML5 Semantic Elements & Media', subjectCode: 'DCA1109', summary: 'HTML5 article, section, header, footer, audio, video tags.', importantTopics: ['HTML5 New Elements', 'Audio/Video Tags'] },
    { unitNumber: 4, title: 'HTML Forms & Validation', subjectCode: 'DCA1109', summary: 'Form inputs, attributes, validation techniques, accessibility.', importantTopics: ['HTML Form Structure', 'Form Input Types & Validation'] },
    { unitNumber: 5, title: 'CSS Fundamentals & Styling', subjectCode: 'DCA1109', summary: 'Inline, internal, external CSS, text-align, fonts, box model.', importantTopics: ['Inline vs Internal vs External CSS', 'Selectors & Box Model'] },
    { unitNumber: 6, title: 'JavaScript Fundamentals & Syntax', subjectCode: 'DCA1109', summary: 'JS variables (let, const), primitive & reference data types, operators.', importantTopics: ['JS Data Types & Variables', 'Strict Equality (===)'] },
    { unitNumber: 7, title: 'DOM & Event Handling', subjectCode: 'DCA1109', summary: 'Keyboard, window, form events, DOM manipulation.', importantTopics: ['Keyboard/Form/Window Events', 'DOM Manipulation'] },
    { unitNumber: 8, title: 'JSON & Web APIs', subjectCode: 'DCA1109', summary: 'JSON structure, parse(), stringify(), AJAX requests, REST APIs.', importantTopics: ['JSON.parse() & JSON.stringify()', 'AJAX HTTP Methods', 'REST APIs'] },
  ],
  DCA1105: [
    { unitNumber: 1, title: 'Functions & Relations', subjectCode: 'DCA1105', summary: 'Domain, range, one-to-one functions, composite functions.', importantTopics: ['Domain & Range', 'One-to-One Functions', 'Composite Functions (f o g)'] },
    { unitNumber: 2, title: 'Limits & Continuity', subjectCode: 'DCA1105', summary: 'Limit evaluations, standard limits, continuity tests.', importantTopics: ['Limit Evaluations', 'Continuity'] },
    { unitNumber: 3, title: 'Differentiation & First Principles', subjectCode: 'DCA1105', summary: 'Derivative from first principle, product rule, quotient rule, chain rule.', importantTopics: ['First Principle Derivative', 'Product & Chain Rules'] },
    { unitNumber: 4, title: 'Mean Value Theorems', subjectCode: 'DCA1105', summary: 'Rolle’s theorem, Lagrange’s mean value theorem, verification.', importantTopics: ['Rolle’s Theorem Verification', 'Mean Value Theorems'] },
    { unitNumber: 5, title: 'Applications of Derivatives (Maxima & Minima)', subjectCode: 'DCA1105', summary: 'First & second derivative tests, inflection points, optimization.', importantTopics: ['Local Maxima & Minima Test', 'Optimization Problems'] },
    { unitNumber: 6, title: 'Integration Fundamentals & Partial Fractions', subjectCode: 'DCA1105', summary: 'Standard integrals, integration by substitution, partial fractions.', importantTopics: ['Decompose into Partial Fractions', 'Standard Integrals'] },
    { unitNumber: 7, title: 'Definite Integrals & Area Under Curves', subjectCode: 'DCA1105', summary: 'Definite integration, area bounded by curves, semicircles.', importantTopics: ['Definite Integral Evaluation', 'Area Under Semicircle'] },
  ],
  DCA1107: [
    { unitNumber: 1, title: 'Introduction to C & Program Structure', subjectCode: 'DCA1107', summary: 'C language characteristics, main() function, comments, compilation.', importantTopics: ['Structure of C Program', 'C Characteristics', 'printf & scanf'] },
    { unitNumber: 2, title: 'Data Types, Variables & Constants', subjectCode: 'DCA1107', summary: 'Basic data types, const keyword, scope, storage classes.', importantTopics: ['const Keyword', 'Data Types & Variables'] },
    { unitNumber: 3, title: 'Operators & Expressions', subjectCode: 'DCA1107', summary: 'Arithmetic, relational, logical, bitwise, assignment operators.', importantTopics: ['C Operators & Precedence', 'Expression Evaluation'] },
    { unitNumber: 4, title: 'Control Structures (Decision Making & Loops)', subjectCode: 'DCA1107', summary: 'if-else, switch-case, for, while, do-while, break, continue.', importantTopics: ['Switch-Case Syntax & Example', 'For vs While vs Do-While'] },
    { unitNumber: 5, title: 'Functions & Recursion', subjectCode: 'DCA1107', summary: 'Function prototypes, call by value/address, recursion pros & cons.', importantTopics: ['Function Prototypes', 'Call by Value vs Call by Address', 'Recursion'] },
    { unitNumber: 6, title: 'Arrays & Sorting Algorithms', subjectCode: 'DCA1107', summary: '1D & 2D arrays, matrix ops, Bubble Sort algorithm & working.', importantTopics: ['Arrays Initialisation & Sum', 'Bubble Sort Working'] },
    { unitNumber: 7, title: 'String Handling Functions', subjectCode: 'DCA1107', summary: 'Null-terminated char arrays, strlen, strcpy, strcat, strcmp.', importantTopics: ['Standard String Functions (strlen, strcpy, strcat, strcmp)', '<string.h>'] },
  ],
};

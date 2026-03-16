export type FoundersInsight = {
  key:
    | "custom-carpentry"
    | "finish-carpentry"
    | "trim-carpentry"
    | "woodworking"
    | "custom-woodwork";
  title: string;
  paragraph: string;
  schemaSummary: string;
};

export const foundersInsights: Record<FoundersInsight["key"], FoundersInsight> = {
  "custom-carpentry": {
    key: "custom-carpentry",
    title: "Custom Carpentry",
    paragraph:
      "Custom carpentry is where the craft really shows, every piece has to be designed and built around the space rather than pulled from a standard plan. In my experience, the difference between average work and great work is how well the carpenter adapts the design to the structure and the homeowner's needs.",
    schemaSummary:
      "Custom carpentry shaped by 14 years of founder experience, focused on adapting each build to existing structure and homeowner needs instead of standard templates.",
  },
  "finish-carpentry": {
    key: "finish-carpentry",
    title: "Finish Carpentry",
    paragraph:
      "Finish carpentry is the stage where precision matters most because every detail is visible to the homeowner. After 14 years in construction, I've learned that small details like tight joints, straight reveals, and consistent spacing are what separate professional finish work from basic installation.",
    schemaSummary:
      "Finish carpentry informed by 14 years of founder experience with emphasis on tight joints, straight reveals, and consistent spacing across visible surfaces.",
  },
  "trim-carpentry": {
    key: "trim-carpentry",
    title: "Trim Carpentry",
    paragraph:
      "Trim carpentry frames the entire look of a room and ties together walls, floors, doors, and windows into a finished space. Done correctly, trim work can make even simple construction feel high-end because it defines the lines and proportions of the room.",
    schemaSummary:
      "Trim carpentry delivered with founder-level precision to define room lines, unify transitions, and create a high-end finished look.",
  },
  woodworking: {
    key: "woodworking",
    title: "Woodworking",
    paragraph:
      "Woodworking is the foundation of carpentry and requires both technical skill and an understanding of how wood behaves over time. Experience teaches you that grain direction, moisture movement, and proper joinery are just as important as cutting and assembling the pieces.",
    schemaSummary:
      "Woodworking planned with 14 years of founder experience, balancing grain direction, moisture movement, and joinery for durable long-term performance.",
  },
  "custom-woodwork": {
    key: "custom-woodwork",
    title: "Custom Woodwork",
    paragraph:
      "Custom woodwork allows a carpenter to create pieces that fit both the architecture of the home and the personality of the client. Over the years I've found that the best custom pieces are not just functional but become focal points that add lasting character to a space.",
    schemaSummary:
      "Custom woodwork designed through founder experience to match the home's architecture while creating functional focal points with lasting character.",
  },
};

export const glossaryInsightOrder: FoundersInsight[] = [
  foundersInsights["custom-carpentry"],
  foundersInsights["finish-carpentry"],
  foundersInsights["trim-carpentry"],
  foundersInsights.woodworking,
  foundersInsights["custom-woodwork"],
];

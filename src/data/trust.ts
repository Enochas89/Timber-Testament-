export type Testimonial = {
  quote: string;
  author: string;
  location?: string;
};

export const whyChooseUs = [
  "Detail-focused carpentry that looks original to your home.",
  "Clear communication from first call to final walkthrough.",
  "Durable material choices matched to your space and daily use.",
  "Clean, respectful work areas and dependable scheduling.",
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The quality of the work exceeded our expectations. Every detail was carefully thought out, and the finished piece looks like it was always meant to be part of our home. True craftsmanship.",
    author: "Michael R.",
  },
  {
    quote:
      "From the first consultation to the final installation, the process was smooth and professional. The project was completed on time, and the results completely transformed our space.",
    author: "Sarah L.",
  },
  {
    quote:
      "It's rare to find someone who takes this much pride in their work. The custom carpentry added beauty, function, and value to our home. We couldn't be happier with the results.",
    author: "David P.",
  },
];

export const processSteps = [
  "Share photos and a short description of your project.",
  "On-site measurements and scope planning.",
  "Build and install with detail-focused craftsmanship.",
  "Final walkthrough to confirm fit, finish, and function.",
];

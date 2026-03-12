import { business } from "@/data/business";
import { cities } from "@/data/cities";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getCityBySlug(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCity(citySlug: string) {
  return projects.filter((project) => project.citySlug === citySlug);
}

export function getProjectsByService(serviceSlug: string) {
  return projects.filter((project) => project.serviceSlug === serviceSlug);
}

export function getProjectsByCityAndService(citySlug: string, serviceSlug: string) {
  return projects.filter(
    (project) =>
      project.citySlug === citySlug && project.serviceSlug === serviceSlug,
  );
}

export function getAllServiceCityCombos() {
  return cities.flatMap((city) =>
    services.map((service) => ({ citySlug: city.slug, serviceSlug: service.slug })),
  );
}

export function areaServedPlaceNames() {
  return business.serviceArea;
}

export function cityDisplayNameFromSlug(citySlug: string) {
  const city = getCityBySlug(citySlug);
  return city ? `${city.name}, ${city.state}` : citySlug;
}

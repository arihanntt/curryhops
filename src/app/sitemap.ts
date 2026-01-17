import { MetadataRoute } from 'next';
import { connectDB } from "@/lib/mongodb";
import Menu from "@/models/Menu";
import Event from "@/models/Event"; // ✅ Import your Event model

interface IMenuSection {
  id: string;
  title: string;
  menuType: "food" | "bar";
}

interface IMenu {
  sections: IMenuSection[];
}

interface IEvent {
  slug: string;
  updatedAt?: Date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://curryandhops.com'; 

  // 1. Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/contact',
    '/menu',
    '/events', // ✅ Added main events page
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  let menuPages: MetadataRoute.Sitemap = [];
  let eventPages: MetadataRoute.Sitemap = [];
  
  try {
    await connectDB();

    // 2. Fetch Menu Categories
    const menu = await Menu.findOne().lean() as unknown as IMenu;
    if (menu && menu.sections) {
      menuPages = menu.sections.map((section) => {
        const urlPath = `/menu?type=${section.menuType}&cat=${section.id}`.replace(/&/g, '&amp;');
        return {
          url: `${baseUrl}${urlPath}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      });
    }

    // 3. Fetch Individual Events from MongoDB
    const events = await Event.find({}).lean() as unknown as IEvent[];
    if (events && events.length > 0) {
      eventPages = events.map((event) => ({
        url: `${baseUrl}/events/${event.slug}`,
        lastModified: event.updatedAt || new Date(),
        changeFrequency: 'daily' as const, // Events change/expire quickly
        priority: 0.9, // Higher priority for active events
      }));
    }

  } catch (e) {
    console.error("Sitemap generation error:", e);
  }

  // Combine everything: Static + Menu Categories + Individual Events
  return [...staticPages, ...menuPages, ...eventPages];
}
// src/app/blog/[slug]/layout.tsx
import data from "../../../data/data.json";

interface BlogPost {
  _id: string;
  attributes: {
    title: string;
    desc: string;
    img: string;
    slug: string;
  };
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>; // ✅ Promise type eklendi
}

// Static params for build time
export async function generateStaticParams() {
  return (data as BlogPost[]).map((post) => ({
    slug: post.attributes.slug,
  }));
}

// ✅ generateViewport ayrı export olarak
export async function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  };
}

// ✅ SEO metadata - async ve await kullanımı
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>; // ✅ Promise type
}) {
  // ✅ params'ı await et
  const { slug } = await params;
  
  const post = (data as BlogPost[]).find(
    (p) => p.attributes.slug === slug // ✅ Artık awaited slug kullanılıyor
  );

  if (!post) {
    return {
      title: "Blog Yazısı Bulunamadı",
    };
  }

  return {
    title: post.attributes.title,
    description: post.attributes.desc,
    openGraph: {
      title: post.attributes.title,
      description: post.attributes.desc,
      images: [post.attributes.img],
    },
  };
}

export default function BlogLayout({ children }: LayoutProps) {
  return children;
}
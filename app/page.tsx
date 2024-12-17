import { Button } from '@/components/ui/button';
import { BookOpenCheck, GraduationCap, Users, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pb-16 pt-[8rem]">
        <div className="container relative">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Belajar Skill Baru dari{' '}
                <span className="text-primary">Para Ahli</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Platform pembelajaran online terbaik dengan instruktur berkualitas.
                Tingkatkan keahlianmu dan raih kesuksesan karir.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/courses">
                  <Button size="lg" className="gap-2">
                    <BookOpenCheck className="h-5 w-5" />
                    Mulai Belajar
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl" />
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
                alt="Students learning"
                className="rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Kenapa Memilih Skillopa?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Platform pembelajaran yang dirancang untuk kesuksesan Anda
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border p-6 hover:border-primary/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Instruktur Berkualitas',
    description:
      'Belajar langsung dari para ahli di bidangnya dengan pengalaman industri yang luas.',
    icon: GraduationCap,
  },
  {
    title: 'Komunitas Aktif',
    description:
      'Bergabung dengan komunitas pembelajar yang aktif dan saling mendukung.',
    icon: Users,
  },
  {
    title: 'Materi Berkualitas',
    description:
      'Kurikulum yang dirancang khusus dan selalu diperbarui mengikuti perkembangan industri.',
    icon: Star,
  },
];
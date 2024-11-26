import { PresentationIcon, Layers, Palette, Share2, Sparkles, Presentation, Users } from "lucide-react";

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/ui/NavBar';

function FeatureCard({ title, description, icon } : { title: string, description: string, icon: React.ReactNode }) {
  return (
    <Card className='p-6 hover:shadow-lg transition-shadow'>
      <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      <Navbar />
      <section className='relative px-6 lg:px-8 py-24 md:py-32 bg-gradient-to-br from-primary/5 via-primary/10 to-background'>
        <div className='mx-auto max-w-7x1'>
          <div className='text-center'>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Crie Apresentações Incríveis
              <br />
              Que Cativam Seu Público
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Crie apresentações educacionais dinâmicas e interativas que envolvam os alunos e tornam a aprendizagem mais viva. Perfeito para professores e educadores.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="h-12 px-6">
                Comece a Ensinar
                <PresentationIcon className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-6">
                Ver Exemplos
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            <FeatureCard 
              icon={<Layers className="h-6 w-6" />}
              title="Modelos prontos"
              description="Comece com modelos específicos para a matéria projetados para engajamento em sala de aula."
            />
            <FeatureCard 
              icon={<Palette className="h-6 w-6" />}
              title="Elementos Interativos"
              description="Adicione quizzes, enquetes e exercícios interativos para aumentar a participação dos alunos."
            />
            <FeatureCard 
              icon={<Share2 className="h-6 w-6" />}
              title="Compartilhamento Fácil"
              description="Compartilhe suas apresentações com qualquer pessoa, em qualquer lugar, com apenas um clique."
            />
            <FeatureCard 
              icon={<Sparkles className="h-6 w-6" />}
              title="Assistência de IA"
              description="Receba sugestões inteligentes para melhorias de conteúdo e design enquanto trabalha."
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Colaboração de Estudantes"
              description="Permita que os alunos participem e contribuam em tempo real."
            />
            <FeatureCard
              icon={<Presentation className="w-6 h-6" />}
              title="Aprendizado Híbrido"
              description="Apresente de forma integrada em sala de aula ou remotamente com ferramentas integradas."
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Pronto para revolucionar seu ensino?
            </h2>
            <p className="mt-4 mb-8 text-lg text-muted-foreground">
              Junte-se a outros educadores criando aulas envolventes com a EducaMotion.
            </p>
            <Button size="lg" className="text-lg">
              Comece a Ensinar Hoje
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Zap, 
  FormInput, 
  Database, 
  Clock, 
  Shield, 
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Download,
  Users,
  Target,
  Sparkles,
  Chrome,
  Globe,
  BarChart3,
  Menu,
  X
} from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: FormInput,
      title: 'Preenchimento Automático',
      description: 'Grave uma vez e reutilize infinitas vezes. Automatize formulários complexos em segundos.',
      color: 'text-blue-600'
    },
    {
      icon: Database,
      title: 'Extração de Dados',
      description: 'Extraia dados de tabelas, listas e elementos web sem programação.',
      color: 'text-green-600'
    },
    {
      icon: Chrome,
      title: 'Extensão do Chrome',
      description: 'Funciona em qualquer site através da nossa extensão intuitiva.',
      color: 'text-purple-600'
    },
    {
      icon: Globe,
      title: 'Dashboard Web',
      description: 'Gerencie seus modelos e monitore atividades em um painel completo.',
      color: 'text-orange-600'
    },
    {
      icon: Shield,
      title: 'Seguro e Confiável',
      description: 'Seus dados são processados localmente com máxima segurança.',
      color: 'text-red-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics Detalhado',
      description: 'Acompanhe economia de tempo e produtividade com relatórios completos.',
      color: 'text-indigo-600'
    }
  ]

  const pricing = [
    {
      name: 'Starter',
      price: 'R$ 5',
      credits: 50,
      description: 'Ideal para uso pessoal',
      features: [
        '50 créditos inclusos',
        'Preenchimento de formulários',
        'Extração básica de dados',
        'Suporte por email'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: 'R$ 18',
      credits: 200,
      description: 'Melhor custo-benefício',
      features: [
        '200 créditos inclusos',
        'Todos os recursos do Starter',
        'Modelos ilimitados',
        'Analytics avançado',
        'Suporte prioritário'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'R$ 40',
      credits: 500,
      description: 'Para uso intensivo',
      features: [
        '500 créditos inclusos',
        'Todos os recursos do Professional',
        'API personalizada',
        'Integração com sistemas',
        'Suporte dedicado'
      ],
      popular: false
    }
  ]

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Gerente de Vendas',
      company: 'TechCorp',
      content: 'O FormGenius revolucionou nosso processo de cadastro de clientes. Economizamos 3 horas por dia!',
      rating: 5
    },
    {
      name: 'João Santos',
      role: 'Analista de Dados',
      company: 'DataFlow',
      content: 'Extrair dados de sites nunca foi tão fácil. A ferramenta é intuitiva e muito poderosa.',
      rating: 5
    },
    {
      name: 'Ana Costa',
      role: 'Assistente Administrativa',
      company: 'Consultoria ABC',
      content: 'Automatizei todos os formulários repetitivos. Agora posso focar em tarefas mais estratégicas.',
      rating: 5
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Formulários Automatizados' },
    { number: '500+', label: 'Empresas Atendidas' },
    { number: '95%', label: 'Taxa de Satisfação' },
    { number: '2,000h', label: 'Tempo Economizado/Mês' }
  ]

  const handleGetStarted = () => {
    window.open('http://localhost:5173', '_blank')
  }

  const handleDownloadExtension = () => {
    alert('Em breve na Chrome Web Store!')
  }

  const handleSubmitEmail = (e) => {
    e.preventDefault()
    alert(`Obrigado! Entraremos em contato em ${email}`)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FormGenius</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Recursos</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Preços</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Depoimentos</a>
              <Button variant="outline" onClick={handleDownloadExtension}>
                <Download className="w-4 h-4 mr-2" />
                Extensão
              </Button>
              <Button onClick={handleGetStarted}>
                Começar Agora
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900">Recursos</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900">Preços</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Depoimentos</a>
                <Button variant="outline" onClick={handleDownloadExtension} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Extensão
                </Button>
                <Button onClick={handleGetStarted} className="w-full">
                  Começar Agora
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              <Sparkles className="w-4 h-4 mr-1" />
              Automação Inteligente
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Automatize Formulários e
              <span className="text-blue-600"> Extraia Dados</span> em Segundos
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Pare de perder tempo com tarefas repetitivas. O FormGenius automatiza preenchimento de formulários 
              e extração de dados de qualquer site com apenas alguns cliques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted} className="text-lg px-8 py-3">
                <Play className="w-5 h-5 mr-2" />
                Começar Gratuitamente
              </Button>
              <Button size="lg" variant="outline" onClick={handleDownloadExtension} className="text-lg px-8 py-3">
                <Download className="w-5 h-5 mr-2" />
                Baixar Extensão
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ✨ Sem cartão de crédito • ⚡ Configuração em 2 minutos • 🔒 100% Seguro
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recursos Poderosos para Máxima Produtividade
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra como o FormGenius pode transformar sua rotina de trabalho
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600">
              Três passos simples para automatizar suas tarefas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Instale a Extensão</h3>
              <p className="text-gray-600">
                Baixe nossa extensão do Chrome e faça login em sua conta FormGenius
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Grave ou Extraia</h3>
              <p className="text-gray-600">
                Grave o preenchimento de formulários ou selecione dados para extração
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Automatize</h3>
              <p className="text-gray-600">
                Reutilize seus modelos quantas vezes quiser e economize horas de trabalho
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Preços Simples e Transparentes
            </h2>
            <p className="text-xl text-gray-600">
              Pague apenas pelos créditos que usar, sem mensalidades
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">Mais Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-4xl font-bold text-gray-900 mt-4">
                    {plan.price}
                  </div>
                  <div className="text-gray-600">{plan.credits} créditos</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={handleGetStarted}
                  >
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              💳 <strong>Como funciona:</strong> 1 crédito = 1 preenchimento | 2 créditos = 1 extração
            </p>
            <p className="text-sm text-gray-500">
              Créditos não expiram • Sem taxas ocultas • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que Nossos Clientes Dizem
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 500 empresas confiam no FormGenius
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para Automatizar sua Produtividade?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já economizam horas todos os dias com o FormGenius
          </p>
          
          <form onSubmit={handleSubmitEmail} className="max-w-md mx-auto mb-8">
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white"
                required
              />
              <Button type="submit" variant="secondary">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={handleGetStarted} className="text-lg px-8 py-3">
              <Target className="w-5 h-5 mr-2" />
              Acessar Dashboard
            </Button>
            <Button size="lg" variant="outline" onClick={handleDownloadExtension} className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
              <Chrome className="w-5 h-5 mr-2" />
              Baixar Extensão
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">FormGenius</span>
              </div>
              <p className="text-gray-400">
                Automatização inteligente de formulários e extração de dados para profissionais modernos.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Extensão Chrome</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoriais</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FormGenius. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


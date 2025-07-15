import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu.jsx'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  User, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Play,
  Edit,
  Trash2,
  Copy,
  Download,
  CreditCard,
  Activity,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Target,
  Database,
  FormInput
} from 'lucide-react'
import './App.css'

// Componente de Login
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('test@formgenius.com')
  const [password, setPassword] = useState('123456')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simula login
    setTimeout(() => {
      onLogin({
        id: 1,
        username: 'testuser',
        email: email,
        credits: 150,
        plan: 'professional'
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">FormGenius</CardTitle>
          <CardDescription>
            Entre na sua conta para acessar o dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Conta de teste:</p>
            <p>Email: test@formgenius.com</p>
            <p>Senha: 123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente de Header
function Header({ user, onLogout }) {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold">FormGenius</h1>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">{user.credits} créditos</span>
            <Badge variant={user.plan === 'professional' ? 'default' : 'secondary'}>
              {user.plan}
            </Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt={user.username} />
                  <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

// Componente de Sidebar
function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'models', label: 'Modelos', icon: FileText },
    { id: 'history', label: 'Histórico', icon: Clock },
    { id: 'credits', label: 'Créditos', icon: CreditCard },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ]

  return (
    <aside className="w-64 bg-gray-50 border-r">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}

// Dados de exemplo
const statsData = [
  { name: 'Jan', preenchimentos: 45, extracoes: 32 },
  { name: 'Fev', preenchimentos: 52, extracoes: 41 },
  { name: 'Mar', preenchimentos: 61, extracoes: 38 },
  { name: 'Abr', preenchimentos: 58, extracoes: 45 },
  { name: 'Mai', preenchimentos: 67, extracoes: 52 },
  { name: 'Jun', preenchimentos: 73, extracoes: 48 }
]

const pieData = [
  { name: 'Preenchimentos', value: 356, color: '#3b82f6' },
  { name: 'Extrações', value: 256, color: '#10b981' }
]

const recentModels = [
  { id: 1, name: 'Cadastro de Cliente', type: 'form_fill', lastUsed: '2 horas atrás', usage: 45 },
  { id: 2, name: 'Extração de Produtos', type: 'data_extract', lastUsed: '1 dia atrás', usage: 23 },
  { id: 3, name: 'Formulário de Contato', type: 'form_fill', lastUsed: '3 dias atrás', usage: 12 },
  { id: 4, name: 'Lista de Preços', type: 'data_extract', lastUsed: '1 semana atrás', usage: 8 }
]

const recentOperations = [
  { id: 1, type: 'form_fill', model: 'Cadastro de Cliente', status: 'completed', time: '10:30', credits: 1 },
  { id: 2, type: 'data_extract', model: 'Extração de Produtos', status: 'completed', time: '09:15', credits: 2 },
  { id: 3, type: 'form_fill', model: 'Formulário de Contato', status: 'failed', time: '08:45', credits: 0 },
  { id: 4, type: 'data_extract', model: 'Lista de Preços', status: 'completed', time: '08:20', credits: 1 }
]

// Componente do Dashboard
function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral das suas atividades no FormGenius
        </p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Operações
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">612</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Preenchimentos
            </CardTitle>
            <FormInput className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">356</div>
            <p className="text-xs text-muted-foreground">
              +8% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Extrações
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256</div>
            <p className="text-xs text-muted-foreground">
              +18% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Sucesso
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Atividade Mensal</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="preenchimentos" fill="#3b82f6" name="Preenchimentos" />
                <Bar dataKey="extracoes" fill="#10b981" name="Extrações" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Distribuição de Operações</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Modelos recentes e operações */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Modelos Mais Usados</CardTitle>
            <CardDescription>
              Seus modelos com maior atividade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentModels.map((model) => (
                <div key={model.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      {model.type === 'form_fill' ? (
                        <FormInput className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Database className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{model.name}</p>
                      <p className="text-xs text-muted-foreground">{model.lastUsed}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{model.usage} usos</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operações Recentes</CardTitle>
            <CardDescription>
              Últimas atividades realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOperations.map((operation) => (
                <div key={operation.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {operation.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{operation.model}</p>
                      <p className="text-xs text-muted-foreground">{operation.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{operation.credits} créditos</p>
                    <Badge 
                      variant={operation.status === 'completed' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {operation.status === 'completed' ? 'Sucesso' : 'Falha'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Componente de Modelos
function ModelsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const models = [
    { 
      id: 1, 
      name: 'Cadastro de Cliente', 
      type: 'form_fill', 
      description: 'Preenchimento automático de formulários de cadastro',
      lastUsed: '2024-01-15T10:30:00Z',
      usage: 45,
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Extração de Produtos', 
      type: 'data_extract', 
      description: 'Extração de dados de produtos de e-commerce',
      lastUsed: '2024-01-14T09:15:00Z',
      usage: 23,
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Formulário de Contato', 
      type: 'form_fill', 
      description: 'Preenchimento de formulários de contato',
      lastUsed: '2024-01-12T14:20:00Z',
      usage: 12,
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Lista de Preços', 
      type: 'data_extract', 
      description: 'Extração de tabelas de preços',
      lastUsed: '2024-01-08T16:45:00Z',
      usage: 8,
      status: 'inactive'
    }
  ]

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || model.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Modelos</h2>
          <p className="text-muted-foreground">
            Gerencie seus modelos de preenchimento e extração
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Modelo
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar modelos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterType('all')}>
              Todos os tipos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType('form_fill')}>
              Preenchimento de formulários
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType('data_extract')}>
              Extração de dados
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Lista de modelos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredModels.map((model) => (
          <Card key={model.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    {model.type === 'form_fill' ? (
                      <FormInput className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Database className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <Badge variant={model.type === 'form_fill' ? 'default' : 'secondary'}>
                      {model.type === 'form_fill' ? 'Preenchimento' : 'Extração'}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Play className="mr-2 h-4 w-4" />
                      Executar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {model.description}
              </CardDescription>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Usado {model.usage} vezes</span>
                <span>
                  {new Date(model.lastUsed).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Componente de Créditos
function CreditsPage({ user, onUpdateUser }) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)

  const creditPackages = [
    {
      id: 'small',
      name: 'Pacote Pequeno',
      credits: 50,
      price: 5.00,
      popular: false,
      description: 'Ideal para uso pessoal'
    },
    {
      id: 'medium',
      name: 'Pacote Médio',
      credits: 200,
      price: 18.00,
      popular: true,
      description: 'Melhor custo-benefício'
    },
    {
      id: 'large',
      name: 'Pacote Grande',
      credits: 500,
      price: 40.00,
      popular: false,
      description: 'Para uso intensivo'
    }
  ]

  const recentTransactions = [
    { id: 1, type: 'purchase', amount: 18.00, credits: 200, date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'usage', amount: -1, credits: -1, date: '2024-01-14', status: 'completed', description: 'Preenchimento de formulário' },
    { id: 3, type: 'usage', amount: -2, credits: -2, date: '2024-01-14', status: 'completed', description: 'Extração de dados' },
    { id: 4, type: 'purchase', amount: 5.00, credits: 50, date: '2024-01-10', status: 'completed' }
  ]

  const handlePurchase = async (packageData) => {
    setIsLoading(true)
    setSelectedPackage(packageData.id)
    
    try {
      // Simular processo de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simular sucesso do pagamento
      const newCredits = user.credits + packageData.credits
      onUpdateUser({ ...user, credits: newCredits })
      
      alert(`Compra realizada com sucesso! ${packageData.credits} créditos adicionados à sua conta.`)
      
    } catch (error) {
      console.error('Erro na compra:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setIsLoading(false)
      setSelectedPackage(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Créditos</h2>
        <p className="text-muted-foreground">
          Gerencie seus créditos e histórico de transações
        </p>
      </div>

      {/* Status atual */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Créditos Disponíveis
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.credits}</div>
            <p className="text-xs text-muted-foreground">
              Suficiente para ~{Math.floor(user.credits / 1.5)} operações
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Plano Atual
            </CardTitle>
            <Badge variant="default">{user.plan}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Professional</div>
            <p className="text-xs text-muted-foreground">
              Acesso completo a todas as funcionalidades
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Economia Total
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 245,80</div>
            <p className="text-xs text-muted-foreground">
              Economizado em automação este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pacotes de créditos */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Comprar Créditos</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {creditPackages.map((pkg) => (
            <Card key={pkg.id} className={`relative ${pkg.popular ? 'border-blue-500 shadow-lg' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500">Mais Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
                <div className="text-3xl font-bold">
                  R$ {pkg.price.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {pkg.credits} créditos
                </div>
                <div className="text-xs text-muted-foreground">
                  R$ {(pkg.price / pkg.credits).toFixed(3)} por crédito
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handlePurchase(pkg)}
                  disabled={isLoading}
                  variant={pkg.popular ? 'default' : 'outline'}
                >
                  {isLoading && selectedPackage === pkg.id ? (
                    'Processando...'
                  ) : (
                    'Comprar Agora'
                  )}
                </Button>
                <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Preenchimentos:</span>
                    <span>~{pkg.credits} operações</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Extrações:</span>
                    <span>~{Math.floor(pkg.credits / 2)} operações</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Histórico de transações */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Histórico de Transações</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'purchase' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {transaction.type === 'purchase' ? (
                        <Plus className="w-4 h-4" />
                      ) : (
                        <Activity className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {transaction.type === 'purchase' 
                          ? `Compra de ${transaction.credits} créditos`
                          : transaction.description
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      transaction.type === 'purchase' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'purchase' 
                        ? `+${transaction.credits} créditos`
                        : `${transaction.credits} créditos`
                      }
                    </p>
                    {transaction.type === 'purchase' && (
                      <p className="text-xs text-muted-foreground">
                        R$ {transaction.amount.toFixed(2)}
                      </p>
                    )}
                    <Badge 
                      variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {transaction.status === 'completed' ? 'Concluído' : 'Pendente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações sobre créditos */}
      <Card>
        <CardHeader>
          <CardTitle>Como funcionam os créditos?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <FormInput className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium">Preenchimento de Formulários</p>
              <p className="text-sm text-muted-foreground">1 crédito por formulário preenchido</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Database className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium">Extração de Dados</p>
              <p className="text-sm text-muted-foreground">2 créditos por extração realizada</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="font-medium">Validade</p>
              <p className="text-sm text-muted-foreground">Créditos não expiram e podem ser acumulados</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente principal da aplicação
function App() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setActiveTab('dashboard')
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'models' && <ModelsPage />}
          {activeTab === 'history' && (
            <div className="p-6">
              <h2 className="text-3xl font-bold tracking-tight">Histórico</h2>
              <p className="text-muted-foreground">Histórico de operações em desenvolvimento...</p>
            </div>
          )}
          {activeTab === 'credits' && <CreditsPage user={user} onUpdateUser={setUser} />}
          {activeTab === 'settings' && (
            <div className="p-6">
              <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
              <p className="text-muted-foreground">Configurações em desenvolvimento...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App


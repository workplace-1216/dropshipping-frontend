/**
 * @fileoverview Language context for managing multi-language support
 * Provides language switching functionality and current language state
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation resources
const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.products': 'Products',
    'nav.orders': 'Orders',
    'nav.inventory': 'Inventory',
    'nav.wallet': 'Wallet',
    'nav.settings': 'Settings',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.admin': 'Admin',
    'nav.seller': 'Seller',
    'nav.operator': 'Operator',
    // Authentication
    'auth.login': 'Sign In',
    'auth.register': 'Sign Up',
    'auth.logout': 'Sign Out',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.resetPassword': 'Reset Password',
    'auth.rememberMe': 'Remember Me',
    'auth.createAccount': 'Create Account',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.signInWith': 'Sign in with',
    'auth.signUpWith': 'Sign up with',
    'auth.twoFactorAuth': 'Two-Factor Authentication',
    'auth.enterCode': 'Enter verification code',
    'auth.welcome': 'Welcome back',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.accountType': 'Account Type',
    'auth.seller': 'Seller',
    'auth.buyer': 'Buyer',
    'auth.sellProducts': 'Sell products',
    'auth.buyProducts': 'Buy products',
    'auth.createAccountSubtitle': 'Create your account to get started',
    'auth.welcomeTitle': 'Welcome to Workana Hourly',
    'auth.welcomeSubtitle': 'Join thousands of sellers and buyers in our marketplace. Start your journey today.',
    'auth.feature1': 'Easy product management',
    'auth.feature2': 'Multi-marketplace integration',
    'auth.feature3': 'Real-time analytics',
    'auth.feature4': '24/7 customer support',
    'auth.orContinueWith': 'Or continue with',
    'auth.signInWithGoogle': 'Sign in with Google',
    'auth.signInWithFacebook': 'Sign in with Facebook',
    'auth.signInWithEmail': 'Sign in with Email',
    'auth.creatingAccount': 'Creating Account...',
    'auth.forgotPasswordTitle': 'Forgot Password?',
    'auth.forgotPasswordSubtitle': 'No worries! Enter your email address and we\'ll send you a reset link.',
    'auth.resetPassword': 'Reset Password',
    'auth.resetPasswordSubtitle': 'Enter your email to receive reset instructions',
    'auth.emailAddress': 'Email Address',
    'auth.enterEmailAddress': 'Enter your email address',
    'auth.sendResetLink': 'Send Reset Link',
    'auth.sendingResetLink': 'Sending Reset Link...',
    'auth.backToSignIn': 'Back to Sign In',
    'auth.goToHomepage': 'Go to Homepage',
    'auth.rememberPassword': 'Remember your password?',
        'auth.signInHere': 'Sign in here',
        'auth.signUpHere': 'Sign up here',
        'auth.signingIn': 'Signing In...',
        'auth.invalidCredentials': 'Invalid email or password',
        'auth.loginFailed': 'Login failed. Please try again.',
    'auth.emailSent': 'Email Sent!',
    'auth.emailSentDescription': 'We\'ve sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.',
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.totalOrders': 'Total Orders',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.totalProducts': 'Total Products',
    'dashboard.activeUsers': 'Active Users',
    'dashboard.pendingTasks': 'Pending Tasks',
    'dashboard.recentOrders': 'Recent Orders',
    'dashboard.topProducts': 'Top Products',
        'dashboard.alerts': 'Alerts',
        'dashboard.notifications': 'Notifications',
        'dashboard.lowStockAlert': 'Low stock alert for Product #123',
        'dashboard.paymentProcessed': 'Payment processed successfully',
        'dashboard.newCustomerRegistration': 'New customer registration',
        'dashboard.viewAll': 'View All',
        'dashboard.vsLastMonth': 'vs last month',
        'dashboard.newOrderReceived': 'New order received',
        'dashboard.newMessageFromCustomer': 'New message from customer',
        'dashboard.viewAllNotifications': 'View all notifications',
        'dashboard.welcomeSubtitle': 'Here\'s what\'s happening with your',
        'dashboard.time2hoursAgo': '2 hours ago',
        'dashboard.time4hoursAgo': '4 hours ago',
        'dashboard.time6hoursAgo': '6 hours ago',
        'dashboard.time8hoursAgo': '8 hours ago',
        'dashboard.time5minAgo': '5 min ago',
        'dashboard.time1hourAgo': '1 hour ago',
        'dashboard.time2minAgo': '2 min ago',
        'dashboard.time3hoursAgo': '3 hours ago',
        'dashboard.time5hoursAgo': '5 hours ago',
    // Products
    'products.title': 'Products',
    'products.addProduct': 'Add Product',
    'products.editProduct': 'Edit Product',
    'products.deleteProduct': 'Delete Product',
    'products.productName': 'Product Name',
    'products.description': 'Description',
    'products.price': 'Price',
    'products.stock': 'Stock',
    'products.category': 'Category',
    'products.sku': 'SKU',
    'products.status': 'Status',
    'products.active': 'Active',
    'products.inactive': 'Inactive',
    'products.outOfStock': 'Out of Stock',
    'products.lowStock': 'Low Stock',
    'products.inStock': 'In Stock',
    // Orders
    'orders.title': 'Orders',
    'orders.orderId': 'Order ID',
    'orders.customer': 'Customer',
    'orders.total': 'Total',
    'orders.status': 'Status',
    'orders.date': 'Date',
    'orders.created': 'Created',
    'orders.paid': 'Paid',
    'orders.separated': 'Separated',
    'orders.packed': 'Packed',
        'orders.shipped': 'Shipped',
        'orders.delivered': 'Delivered',
        'orders.returned': 'Returned',
        'orders.cancelled': 'Cancelled',
        'orders.processing': 'Processing',
    'orders.viewDetails': 'View Details',
    'orders.printLabel': 'Print Label',
    'orders.packingList': 'Packing List',
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Info',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.reset': 'Reset',
    'common.clear': 'Clear',
    'common.select': 'Select',
    'common.all': 'All',
    'common.none': 'None',
    'common.today': 'Today',
    'common.yesterday': 'Yesterday',
    'common.thisWeek': 'This Week',
    'common.thisMonth': 'This Month',
        'common.thisYear': 'This Year',
        'common.account': 'account',
        // Home page
        'home.welcomeTo': 'Welcome to',
        'home.workanaHourly': 'Workana Hourly',
        'home.subtitle': 'A comprehensive dropshipping and marketplace platform connecting sellers and buyers worldwide.',
        'home.getStarted': 'Get Started',
        'home.forSellers': 'For Sellers',
        'home.sellersDescription': 'List your products and reach customers worldwide',
        'home.easyProductManagement': 'Easy product management',
        'home.orderTracking': 'Order tracking',
        'home.analyticsDashboard': 'Analytics dashboard',
        'home.securePayments': 'Secure payments',
        'home.forBuyers': 'For Buyers',
        'home.buyersDescription': 'Discover and purchase products from verified sellers',
        'home.wideProductSelection': 'Wide product selection',
        'home.secureCheckout': 'Secure checkout',
        'home.orderHistory': 'Order history',
        'home.customerSupport': 'Customer support',
        'home.securePlatform': 'Secure Platform',
        'home.securePlatformDescription': 'Built with security and reliability in mind',
        'home.jwtAuthentication': 'JWT authentication',
        'home.dataEncryption': 'Data encryption',
        'home.monitoring247': '24/7 monitoring',
        'home.trustedByThousands': 'Trusted by Thousands',
        'home.joinCommunity': 'Join our growing community of sellers and buyers',
        'home.activeUsers': 'Active Users',
        'home.productsListed': 'Products Listed',
        'home.totalSales': 'Total Sales',
        'home.uptime': 'Uptime'
  },
  pt: {
    // Navigation
    'nav.dashboard': 'Painel',
    'nav.products': 'Produtos',
    'nav.orders': 'Pedidos',
    'nav.inventory': 'Estoque',
    'nav.wallet': 'Carteira',
    'nav.settings': 'Configurações',
    'nav.profile': 'Perfil',
    'nav.logout': 'Sair',
    'nav.admin': 'Admin',
    'nav.seller': 'Vendedor',
    'nav.operator': 'Operador',
    // Authentication
    'auth.login': 'Entrar',
    'auth.register': 'Cadastrar',
    'auth.logout': 'Sair',
    'auth.email': 'E-mail',
    'auth.password': 'Senha',
    'auth.confirmPassword': 'Confirmar Senha',
    'auth.forgotPassword': 'Esqueceu a senha?',
    'auth.resetPassword': 'Redefinir Senha',
    'auth.rememberMe': 'Lembrar de mim',
    'auth.createAccount': 'Criar Conta',
    'auth.alreadyHaveAccount': 'Já tem uma conta?',
    'auth.dontHaveAccount': 'Não tem uma conta?',
    'auth.signInWith': 'Entrar com',
    'auth.signUpWith': 'Cadastrar com',
    'auth.twoFactorAuth': 'Autenticação de Dois Fatores',
    'auth.enterCode': 'Digite o código de verificação',
    'auth.welcome': 'Bem-vindo de volta',
    'auth.firstName': 'Primeiro Nome',
    'auth.lastName': 'Sobrenome',
    'auth.accountType': 'Tipo de Conta',
    'auth.seller': 'Vendedor',
    'auth.buyer': 'Comprador',
    'auth.sellProducts': 'Vender produtos',
    'auth.buyProducts': 'Comprar produtos',
    'auth.createAccountSubtitle': 'Crie sua conta para começar',
    'auth.welcomeTitle': 'Bem-vindo ao Workana Hourly',
    'auth.welcomeSubtitle': 'Junte-se a milhares de vendedores e compradores em nosso marketplace. Comece sua jornada hoje.',
    'auth.feature1': 'Gerenciamento fácil de produtos',
    'auth.feature2': 'Integração multi-marketplace',
    'auth.feature3': 'Análises em tempo real',
    'auth.feature4': 'Suporte ao cliente 24/7',
    'auth.orContinueWith': 'Ou continue com',
    'auth.signInWithGoogle': 'Entrar com Google',
    'auth.signInWithFacebook': 'Entrar com Facebook',
    'auth.signInWithEmail': 'Entrar com E-mail',
    'auth.creatingAccount': 'Criando Conta...',
    'auth.forgotPasswordTitle': 'Esqueceu a Senha?',
    'auth.forgotPasswordSubtitle': 'Sem problemas! Digite seu endereço de e-mail e enviaremos um link de redefinição.',
    'auth.resetPassword': 'Redefinir Senha',
    'auth.resetPasswordSubtitle': 'Digite seu e-mail para receber instruções de redefinição',
    'auth.emailAddress': 'Endereço de E-mail',
    'auth.enterEmailAddress': 'Digite seu endereço de e-mail',
    'auth.sendResetLink': 'Enviar Link de Redefinição',
    'auth.sendingResetLink': 'Enviando Link de Redefinição...',
    'auth.backToSignIn': 'Voltar para Entrar',
    'auth.goToHomepage': 'Ir para Página Inicial',
    'auth.rememberPassword': 'Lembrou da sua senha?',
        'auth.signInHere': 'Entre aqui',
        'auth.signUpHere': 'Cadastre-se aqui',
        'auth.signingIn': 'Entrando...',
        'auth.invalidCredentials': 'E-mail ou senha inválidos',
        'auth.loginFailed': 'Falha no login. Por favor, tente novamente.',
    'auth.emailSent': 'E-mail Enviado!',
    'auth.emailSentDescription': 'Enviamos um link de redefinição de senha para o seu endereço de e-mail. Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.',
    // Dashboard
    'dashboard.welcome': 'Bem-vindo de volta',
    'dashboard.totalOrders': 'Total de Pedidos',
    'dashboard.totalRevenue': 'Receita Total',
    'dashboard.totalProducts': 'Total de Produtos',
    'dashboard.activeUsers': 'Usuários Ativos',
    'dashboard.pendingTasks': 'Tarefas Pendentes',
    'dashboard.recentOrders': 'Pedidos Recentes',
    'dashboard.topProducts': 'Produtos em Destaque',
        'dashboard.alerts': 'Alertas',
        'dashboard.notifications': 'Notificações',
        'dashboard.lowStockAlert': 'Alerta de estoque baixo para Produto #123',
        'dashboard.paymentProcessed': 'Pagamento processado com sucesso',
        'dashboard.newCustomerRegistration': 'Novo cadastro de cliente',
        'dashboard.viewAll': 'Ver Todos',
        'dashboard.vsLastMonth': 'vs mês passado',
        'dashboard.newOrderReceived': 'Novo pedido recebido',
        'dashboard.newMessageFromCustomer': 'Nova mensagem do cliente',
        'dashboard.viewAllNotifications': 'Ver todas as notificações',
        'dashboard.welcomeSubtitle': 'Aqui está o que está acontecendo com sua',
        'dashboard.time2hoursAgo': '2 horas atrás',
        'dashboard.time4hoursAgo': '4 horas atrás',
        'dashboard.time6hoursAgo': '6 horas atrás',
        'dashboard.time8hoursAgo': '8 horas atrás',
        'dashboard.time5minAgo': '5 min atrás',
        'dashboard.time1hourAgo': '1 hora atrás',
        'dashboard.time2minAgo': '2 min atrás',
        'dashboard.time3hoursAgo': '3 horas atrás',
        'dashboard.time5hoursAgo': '5 horas atrás',
    // Products
    'products.title': 'Produtos',
    'products.addProduct': 'Adicionar Produto',
    'products.editProduct': 'Editar Produto',
    'products.deleteProduct': 'Excluir Produto',
    'products.productName': 'Nome do Produto',
    'products.description': 'Descrição',
    'products.price': 'Preço',
    'products.stock': 'Estoque',
    'products.category': 'Categoria',
    'products.sku': 'SKU',
    'products.status': 'Status',
    'products.active': 'Ativo',
    'products.inactive': 'Inativo',
    'products.outOfStock': 'Sem Estoque',
    'products.lowStock': 'Estoque Baixo',
    'products.inStock': 'Em Estoque',
    // Orders
    'orders.title': 'Pedidos',
    'orders.orderId': 'ID do Pedido',
    'orders.customer': 'Cliente',
    'orders.total': 'Total',
    'orders.status': 'Status',
    'orders.date': 'Data',
    'orders.created': 'Criado',
    'orders.paid': 'Pago',
    'orders.separated': 'Separado',
    'orders.packed': 'Empacotado',
        'orders.shipped': 'Enviado',
        'orders.delivered': 'Entregue',
        'orders.returned': 'Devolvido',
        'orders.cancelled': 'Cancelado',
        'orders.processing': 'Processando',
    'orders.viewDetails': 'Ver Detalhes',
    'orders.printLabel': 'Imprimir Etiqueta',
    'orders.packingList': 'Lista de Embalagem',
    // Common
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.delete': 'Excluir',
    'common.edit': 'Editar',
    'common.view': 'Visualizar',
    'common.search': 'Pesquisar',
    'common.filter': 'Filtrar',
    'common.sort': 'Ordenar',
    'common.export': 'Exportar',
    'common.import': 'Importar',
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.warning': 'Aviso',
    'common.info': 'Informação',
    'common.yes': 'Sim',
    'common.no': 'Não',
    'common.confirm': 'Confirmar',
    'common.close': 'Fechar',
    'common.back': 'Voltar',
    'common.next': 'Próximo',
    'common.previous': 'Anterior',
    'common.submit': 'Enviar',
    'common.reset': 'Resetar',
    'common.clear': 'Limpar',
    'common.select': 'Selecionar',
    'common.all': 'Todos',
    'common.none': 'Nenhum',
    'common.today': 'Hoje',
    'common.yesterday': 'Ontem',
    'common.thisWeek': 'Esta Semana',
    'common.thisMonth': 'Este Mês',
        'common.thisYear': 'Este Ano',
        'common.account': 'conta',
        // Home page
        'home.welcomeTo': 'Bem-vindo ao',
        'home.workanaHourly': 'Workana Hourly',
        'home.subtitle': 'Uma plataforma abrangente de dropshipping e marketplace conectando vendedores e compradores em todo o mundo.',
        'home.getStarted': 'Começar',
        'home.forSellers': 'Para Vendedores',
        'home.sellersDescription': 'Liste seus produtos e alcance clientes em todo o mundo',
        'home.easyProductManagement': 'Gerenciamento fácil de produtos',
        'home.orderTracking': 'Rastreamento de pedidos',
        'home.analyticsDashboard': 'Painel de análises',
        'home.securePayments': 'Pagamentos seguros',
        'home.forBuyers': 'Para Compradores',
        'home.buyersDescription': 'Descubra e compre produtos de vendedores verificados',
        'home.wideProductSelection': 'Ampla seleção de produtos',
        'home.secureCheckout': 'Checkout seguro',
        'home.orderHistory': 'Histórico de pedidos',
        'home.customerSupport': 'Suporte ao cliente',
        'home.securePlatform': 'Plataforma Segura',
        'home.securePlatformDescription': 'Construída com segurança e confiabilidade em mente',
        'home.jwtAuthentication': 'Autenticação JWT',
        'home.dataEncryption': 'Criptografia de dados',
        'home.monitoring247': 'Monitoramento 24/7',
        'home.trustedByThousands': 'Confiado por Milhares',
        'home.joinCommunity': 'Junte-se à nossa crescente comunidade de vendedores e compradores',
        'home.activeUsers': 'Usuários Ativos',
        'home.productsListed': 'Produtos Listados',
        'home.totalSales': 'Vendas Totais',
        'home.uptime': 'Tempo de Atividade'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client flag
    setIsClient(true);
    
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: string) => {
    if (!isClient) return;
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  const t = (key: string): string => {
    // Fallback for server-side rendering
    if (!isClient) {
      return translations.en[key as keyof typeof translations.en] || key;
    }
    
    const currentTranslations = translations[currentLanguage as keyof typeof translations];
    const result = currentTranslations[key as keyof typeof currentTranslations] || key;
    
    
    return result;
  };

  const isRTL = currentLanguage === 'ar'; // Arabic support for future

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    t,
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
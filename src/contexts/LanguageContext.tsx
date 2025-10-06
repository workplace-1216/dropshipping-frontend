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
    'common.thisYear': 'This Year'
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
    'common.thisYear': 'Este Ano'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  const t = (key: string): string => {
    // Fallback for server-side rendering
    if (typeof window === 'undefined') {
      return translations.en[key as keyof typeof translations.en] || key;
    }
    
    const currentTranslations = translations[currentLanguage as keyof typeof translations];
    const result = currentTranslations[key as keyof typeof currentTranslations] || key;
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`Translation: ${key} -> ${result} (lang: ${currentLanguage})`);
    }
    
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
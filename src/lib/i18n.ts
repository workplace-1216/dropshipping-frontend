/**
 * @fileoverview Internationalization configuration for multi-language support
 * Supports Brazilian Portuguese and English for the marketplace platform
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Dashboard',
        products: 'Products',
        orders: 'Orders',
        inventory: 'Inventory',
        wallet: 'Wallet',
        settings: 'Settings',
        profile: 'Profile',
        logout: 'Logout',
        admin: 'Admin',
        seller: 'Seller',
        operator: 'Operator'
      },
      // Authentication
      auth: {
        login: 'Sign In',
        register: 'Sign Up',
        logout: 'Sign Out',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        forgotPassword: 'Forgot Password?',
        resetPassword: 'Reset Password',
        rememberMe: 'Remember Me',
        createAccount: 'Create Account',
        alreadyHaveAccount: 'Already have an account?',
        dontHaveAccount: "Don't have an account?",
        signInWith: 'Sign in with',
        signUpWith: 'Sign up with',
        twoFactorAuth: 'Two-Factor Authentication',
        enterCode: 'Enter verification code',
        welcome: 'Welcome back'
      },
      // Dashboard
      dashboard: {
        welcome: 'Welcome back',
        totalOrders: 'Total Orders',
        totalRevenue: 'Total Revenue',
        totalProducts: 'Total Products',
        activeUsers: 'Active Users',
        pendingTasks: 'Pending Tasks',
        recentOrders: 'Recent Orders',
        topProducts: 'Top Products',
        alerts: 'Alerts',
        notifications: 'Notifications'
      },
      // Products
      products: {
        title: 'Products',
        addProduct: 'Add Product',
        editProduct: 'Edit Product',
        deleteProduct: 'Delete Product',
        productName: 'Product Name',
        description: 'Description',
        price: 'Price',
        stock: 'Stock',
        category: 'Category',
        sku: 'SKU',
        status: 'Status',
        active: 'Active',
        inactive: 'Inactive',
        outOfStock: 'Out of Stock',
        lowStock: 'Low Stock',
        inStock: 'In Stock'
      },
      // Orders
      orders: {
        title: 'Orders',
        orderId: 'Order ID',
        customer: 'Customer',
        total: 'Total',
        status: 'Status',
        date: 'Date',
        created: 'Created',
        paid: 'Paid',
        separated: 'Separated',
        packed: 'Packed',
        shipped: 'Shipped',
        delivered: 'Delivered',
        returned: 'Returned',
        cancelled: 'Cancelled',
        viewDetails: 'View Details',
        printLabel: 'Print Label',
        packingList: 'Packing List'
      },
      // Common
      common: {
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        export: 'Export',
        import: 'Import',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Info',
        yes: 'Yes',
        no: 'No',
        confirm: 'Confirm',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        submit: 'Submit',
        reset: 'Reset',
        clear: 'Clear',
        select: 'Select',
        all: 'All',
        none: 'None',
        today: 'Today',
        yesterday: 'Yesterday',
        thisWeek: 'This Week',
        thisMonth: 'This Month',
        thisYear: 'This Year'
      }
    }
  },
  pt: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Painel',
        products: 'Produtos',
        orders: 'Pedidos',
        inventory: 'Estoque',
        wallet: 'Carteira',
        settings: 'Configurações',
        profile: 'Perfil',
        logout: 'Sair',
        admin: 'Admin',
        seller: 'Vendedor',
        operator: 'Operador'
      },
      // Authentication
      auth: {
        login: 'Entrar',
        register: 'Cadastrar',
        logout: 'Sair',
        email: 'E-mail',
        password: 'Senha',
        confirmPassword: 'Confirmar Senha',
        forgotPassword: 'Esqueceu a senha?',
        resetPassword: 'Redefinir Senha',
        rememberMe: 'Lembrar de mim',
        createAccount: 'Criar Conta',
        alreadyHaveAccount: 'Já tem uma conta?',
        dontHaveAccount: 'Não tem uma conta?',
        signInWith: 'Entrar com',
        signUpWith: 'Cadastrar com',
        twoFactorAuth: 'Autenticação de Dois Fatores',
        enterCode: 'Digite o código de verificação',
        welcome: 'Bem-vindo de volta'
      },
      // Dashboard
      dashboard: {
        welcome: 'Bem-vindo de volta',
        totalOrders: 'Total de Pedidos',
        totalRevenue: 'Receita Total',
        totalProducts: 'Total de Produtos',
        activeUsers: 'Usuários Ativos',
        pendingTasks: 'Tarefas Pendentes',
        recentOrders: 'Pedidos Recentes',
        topProducts: 'Produtos em Destaque',
        alerts: 'Alertas',
        notifications: 'Notificações'
      },
      // Products
      products: {
        title: 'Produtos',
        addProduct: 'Adicionar Produto',
        editProduct: 'Editar Produto',
        deleteProduct: 'Excluir Produto',
        productName: 'Nome do Produto',
        description: 'Descrição',
        price: 'Preço',
        stock: 'Estoque',
        category: 'Categoria',
        sku: 'SKU',
        status: 'Status',
        active: 'Ativo',
        inactive: 'Inativo',
        outOfStock: 'Sem Estoque',
        lowStock: 'Estoque Baixo',
        inStock: 'Em Estoque'
      },
      // Orders
      orders: {
        title: 'Pedidos',
        orderId: 'ID do Pedido',
        customer: 'Cliente',
        total: 'Total',
        status: 'Status',
        date: 'Data',
        created: 'Criado',
        paid: 'Pago',
        separated: 'Separado',
        packed: 'Empacotado',
        shipped: 'Enviado',
        delivered: 'Entregue',
        returned: 'Devolvido',
        cancelled: 'Cancelado',
        viewDetails: 'Ver Detalhes',
        printLabel: 'Imprimir Etiqueta',
        packingList: 'Lista de Embalagem'
      },
      // Common
      common: {
        save: 'Salvar',
        cancel: 'Cancelar',
        delete: 'Excluir',
        edit: 'Editar',
        view: 'Visualizar',
        search: 'Pesquisar',
        filter: 'Filtrar',
        sort: 'Ordenar',
        export: 'Exportar',
        import: 'Importar',
        loading: 'Carregando...',
        error: 'Erro',
        success: 'Sucesso',
        warning: 'Aviso',
        info: 'Informação',
        yes: 'Sim',
        no: 'Não',
        confirm: 'Confirmar',
        close: 'Fechar',
        back: 'Voltar',
        next: 'Próximo',
        previous: 'Anterior',
        submit: 'Enviar',
        reset: 'Resetar',
        clear: 'Limpar',
        select: 'Selecionar',
        all: 'Todos',
        none: 'Nenhum',
        today: 'Hoje',
        yesterday: 'Ontem',
        thisWeek: 'Esta Semana',
        thisMonth: 'Este Mês',
        thisYear: 'Este Ano'
      }
    }
  }
};

// Only initialize i18n on the client side
if (typeof window !== 'undefined') {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en', // default language
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
}

export default i18n;
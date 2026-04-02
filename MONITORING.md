# Monitoring & Error Tracking with Sentry

Este proyecto incluye integración con **Sentry** para monitoreo de errores y rendimiento en producción.

## Configuración

### 1. Crear cuenta en Sentry

1. Ir a https://sentry.io/
2. Crear una cuenta gratuita
3. Crear un nuevo proyecto para "Node.js"
4. Copiar el DSN (Data Source Name)

### 2. Configurar variable de entorno

Agregar a tu archivo `.env`:

```bash
SENTRY_DSN=https://your-key@sentry.io/your-project-id
```

### 3. Comportamiento según ambiente

- **Development**: Sentry está en modo debug, trace sampling 100%
- **Production**: Trace sampling 10% (para no sobrecargar)
- **Disabled**: Si SENTRY_DSN no está configurado, se usa logging local

## Características

### Captura de Errores Automática

Sentry captura automáticamente:
- ✅ Excepciones no manejadas (uncaught exceptions)
- ✅ Promesas rechazadas no manejadas (unhandled rejections)
- ✅ Errores de HTTP (4xx, 5xx)
- ✅ Errores en middlewares

### Request Context

Cada error incluye contexto de la solicitud:
- Método HTTP (GET, POST, etc.)
- URL solicitada
- Headers
- IP del cliente
- Información de usuario (si disponible)

### Breadcrumbs

Sentry registra "migas de pan" (eventos previos) para debugging:
- Solicitudes HTTP
- Cambios en estado
- Eventos del usuario

## Uso en código

### Capturar excepción manualmente

```typescript
import { captureException } from './src/config/sentry';

try {
  // tu código
} catch (error) {
  captureException(error as Error, {
    userId: user.id,
    action: 'send_email'
  });
}
```

### Capturar mensaje

```typescript
import { captureMessage } from './src/config/sentry';

captureMessage('Payment processed successfully', 'info');
captureMessage('Configuration issue detected', 'warning');
```

### Establecer contexto de usuario

```typescript
import { setUserContext } from './src/middleware/sentry';

// Después de autenticar usuario
setUserContext(user.id, user.email, user.username);

// Limpiar contexto (ej. logout)
setUserContext();
```

### Agregar breadcrumb

```typescript
import { addBreadcrumb } from './src/middleware/sentry';

addBreadcrumb('Email sent', { recipient: email, status: 'success' });
```

## Dashboard Sentry

En el dashboard de Sentry puedes:
- 📊 Ver gráficos de errores por tiempo
- 🔍 Inspeccionar detalles de cada error
- 👥 Agrupar errores por usuario
- 🏷️ Etiquetar y filtrar errores
- 📈 Monitorear performance
- ⚠️ Configurar alertas

## Variables de Entorno

```bash
# Requerido para habilitar Sentry
SENTRY_DSN=https://...

# Automático (desde .env)
NODE_ENV=production
```

## Niveles de Log

Sentry soporta estos niveles:
- `fatal` - Error crítico que detiene la aplicación
- `error` - Error que afecta funcionalidad
- `warning` - Advertencia, funcionalidad degradada
- `info` - Información general
- `debug` - Detalles de debugging

## Promedio de Costos

- **Gratuito**: 5,000 eventos/mes
- **Pro**: $29/mes - eventos ilimitados
- **Enterprise**: Contactar sales

El plan gratuito es suficiente para la mayoría de proyectos pequeños a medianos.

## Buenas Prácticas

1. ✅ Usar try-catch en operaciones críticas
2. ✅ Establecer contexto de usuario cuando esté disponible
3. ✅ Agregar breadcrumbs para eventos importantes
4. ✅ Configurar alertas para errores críticos
5. ❌ No capturar información sensible (contraseñas, tokens)

## Referencias

- [Sentry Documentation](https://docs.sentry.io/)
- [Node.js Integration](https://docs.sentry.io/platforms/node/)
- [Error Handling Best Practices](https://docs.sentry.io/platforms/node/guides/express/)

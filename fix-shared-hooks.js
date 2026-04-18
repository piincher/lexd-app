const fs = require('fs');

const mapping = {
  'useGetOrderOfUserById': '@src/shared/hooks/useOrders',
  'useGetActiveOrder': '@src/shared/hooks/useOrders',
  'useViewSmsBalance': '@src/shared/hooks/useOrders',
  'useGetCurrentUser': '@src/shared/hooks/useUser',
  'useGetOrderDetail': '@src/shared/hooks/useOrderDetail',
  'useGetOrderDetails': '@src/shared/hooks/useOrderDetail',
  'useGetRoutes': '@src/shared/hooks/useRoutes',
  'useGetSeaRoutes': '@src/shared/hooks/useRoutes',
};

const files = [
  'src/features/orders/screens/Orders.tsx',
  'src/features/stats/screens/hooks/useStatsScreen.ts',
  'src/features/stats/screens/hooks/useAdminStats.ts',
  'src/features/home/components/OrderList.tsx',
  'src/features/admin/users/screens/ClientDetail.tsx',
  'src/features/admin/orders/screens/UserActiveOrders.tsx',
  'src/features/admin/orders/screens/OrderDetailScreen.tsx',
  'src/features/admin/orders/screens/EditOrder.tsx',
  'src/features/admin/orders/screens/ActiveOrderDetails.tsx',
  'src/features/admin/orders/screens/BatchUpdateDetail.tsx',
  'src/features/admin/orders/screens/ActiveOrders.tsx',
  'src/features/admin/communications/screens/SendSms.tsx',
  'src/features/admin/dashboard/hooks/useAdminDashboard.ts',
];

for (const file of files) {
  if (!fs.existsSync(file)) { console.log('MISSING: ' + file); continue; }
  let content = fs.readFileSync(file, 'utf8');
  const regex = /import\s+\{([^}]+)\}\s+from\s+['"]@src\/shared\/hooks['"];?/g;
  let changed = false;
  content = content.replace(regex, (match, importsStr) => {
    changed = true;
    const imports = importsStr.split(',').map(s => s.trim()).filter(Boolean);
    const lines = [];
    for (const imp of imports) {
      const name = imp.replace(/^type\s+/, '').trim();
      if (mapping[name]) {
        const prefix = imp.startsWith('type ') ? 'type ' : '';
        lines.push(`import { ${prefix}${name} } from '${mapping[name]}';`);
      } else {
        console.log('UNKNOWN import ' + name + ' in ' + file);
        lines.push(`import { ${imp} } from '@src/shared/hooks';`);
      }
    }
    return lines.join('\n');
  });
  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Updated: ' + file);
  }
}

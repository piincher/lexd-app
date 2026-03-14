// Test imports to identify undefined exports
console.log('Testing imports...');

// Test admin feature imports
try {
  const admin = require('./features/admin');
  console.log('✓ features/admin keys:', Object.keys(admin).slice(0, 20));
  
  // Check specific exports
  if (admin.RouteListScreen === undefined) {
    console.error('✗ RouteListScreen is undefined');
  } else {
    console.log('✓ RouteListScreen is defined');
  }
  
  if (admin.useToggleRouteStatus === undefined) {
    console.error('✗ useToggleRouteStatus is undefined');
  } else {
    console.log('✓ useToggleRouteStatus is defined');
  }
  
  if (admin.AdminGoodsDetailScreen === undefined) {
    console.error('✗ AdminGoodsDetailScreen is undefined');
  } else {
    console.log('✓ AdminGoodsDetailScreen is defined');
  }
} catch (e: any) {
  console.error('✗ features/admin:', e.message);
}

console.log('\nImport test complete.');


const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');

async function debugSeeding() {
  let app;
  
  try {
    console.log('🔍 Debugging seeding issues...');
    app = await NestFactory.createApplicationContext(AppModule);
    console.log('✅ App context created');
    console.log('\n📋 Available providers:');
    try {
      const providers = app.get('APP_INTERCEPTOR');
      console.log('  - APP_INTERCEPTOR: Found');
    } catch (error) {
      console.log('  - APP_INTERCEPTOR: Not found');
    }
    
    try {
      const providers = app.get('APP_FILTER');
      console.log('  - APP_FILTER: Found');
    } catch (error) {
      console.log('  - APP_FILTER: Not found');
    }
    console.log('\n🔧 Testing basic services:');
    
    try {
      const recipeService = app.get('RecipeService');
      console.log('  - RecipeService: Found');
    } catch (error) {
      console.log('  - RecipeService: Not found');
    }
    
    try {
      const seedService = app.get('SeedRecipesService');
      console.log('  - SeedRecipesService: Found');
    } catch (error) {
      console.log('  - SeedRecipesService: Not found');
      console.log(`    Error: ${error.message}`);
    }
    console.log('\n📁 Module structure:');
    try {
      const moduleRef = app.get('ModuleRef');
      console.log('  - ModuleRef: Found');
      const modules = app.get('ModuleRef');
      console.log('  - ModuleRef details: Available');
    } catch (error) {
      console.log('  - ModuleRef: Not found');
    }
    
    console.log('\n💡 Recommendations:');
    console.log('  1. Use simple seeding: npm run seed:simple');
    console.log('  2. Check if database is running: node test-db.js');
    console.log('  3. Verify database structure: node test-seeding.js');
    
  } catch (error) {
    console.error('❌ Debug error:', error.message);
  } finally {
    if (app) {
      await app.close();
    }
  }
}
debugSeeding();




import db from './models/index.js';
import { DB_HOST, DB_PASSWORD, DB_USER, DB_NAME } from './config/env.js';

const syncDatabase = async () => {
  try {
    console.log('🔄 Starting database sync...');
    
    // Test connection
    await db.sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync all models
    await db.sequelize.sync({ 
      force: process.env.NODE_ENV === 'development' && process.argv.includes('--force'),
      alter: true 
    });
    
    console.log('✅ Database models synced successfully.');
    
    // Create sample data if needed
    if (process.argv.includes('--seed')) {
      console.log('🌱 Seeding database...');
      await seedDatabase();
      console.log('✅ Database seeded successfully.');
    }
    
    console.log('🎉 Database setup complete!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  const { User, Category, Product } = db;
  
  try {
    // Create admin user
    const adminUser = await User.findOrCreate({
      where: { email: 'admin@onlinestore.com' },
      defaults: {
        username: 'admin',
        email: 'admin@onlinestore.com',
        password: 'Admin123!',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      }
    });
    
    console.log('👤 Admin user created/found');

    // Create sample categories
    const categories = [
      { name: 'Electronics', description: 'Electronic devices and gadgets', slug: 'electronics' },
      { name: 'Clothing', description: 'Fashion and apparel', slug: 'clothing' },
      { name: 'Books', description: 'Books and publications', slug: 'books' },
      { name: 'Home & Garden', description: 'Home and garden supplies', slug: 'home-garden' },
      { name: 'Sports', description: 'Sports and fitness equipment', slug: 'sports' },
      { name: 'Toys', description: 'Toys and games', slug: 'toys' },
    ];

    const createdCategories = [];
    for (const categoryData of categories) {
      const [category] = await Category.findOrCreate({
        where: { slug: categoryData.slug },
        defaults: categoryData
      });
      createdCategories.push(category);
    }
    
    console.log('📂 Categories created/found');

    // Create sample products
    const sampleProducts = [
      {
        name: 'Smartphone Pro Max',
        description: 'Latest smartphone with advanced features and high-quality camera.',
        shortDescription: 'Premium smartphone with excellent camera',
        slug: 'smartphone-pro-max',
        sku: 'SPM-001',
        price: 999.99,
        salePrice: 899.99,
        stock: 50,
        categoryId: createdCategories[0].id, // Electronics
        isFeatured: true,
        tags: ['smartphone', 'electronics', 'mobile'],
        images: ['https://via.placeholder.com/400x400/007bff/ffffff?text=Smartphone']
      },
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation.',
        shortDescription: 'Premium wireless headphones',
        slug: 'wireless-headphones',
        sku: 'WH-001',
        price: 199.99,
        stock: 100,
        categoryId: createdCategories[0].id, // Electronics
        isFeatured: true,
        tags: ['headphones', 'audio', 'wireless'],
        images: ['https://via.placeholder.com/400x400/28a745/ffffff?text=Headphones']
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple colors.',
        shortDescription: '100% cotton comfortable t-shirt',
        slug: 'cotton-t-shirt',
        sku: 'CTS-001',
        price: 24.99,
        stock: 200,
        categoryId: createdCategories[1].id, // Clothing
        tags: ['t-shirt', 'cotton', 'casual'],
        images: ['https://via.placeholder.com/400x400/dc3545/ffffff?text=T-Shirt']
      },
      {
        name: 'JavaScript: The Complete Guide',
        description: 'Comprehensive guide to JavaScript programming for beginners and experts.',
        shortDescription: 'Complete JavaScript programming guide',
        slug: 'javascript-complete-guide',
        sku: 'JSG-001',
        price: 39.99,
        stock: 75,
        categoryId: createdCategories[2].id, // Books
        isFeatured: true,
        tags: ['javascript', 'programming', 'web development'],
        images: ['https://via.placeholder.com/400x400/ffc107/000000?text=JS+Book']
      }
    ];

    for (const productData of sampleProducts) {
      await Product.findOrCreate({
        where: { sku: productData.sku },
        defaults: productData
      });
    }
    
    console.log('🛍️ Sample products created/found');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

// Run the sync
syncDatabase();

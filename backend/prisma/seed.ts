import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test user
  const hashedPassword = await bcrypt.hash('TestPassword123!', 10);
  const testUser = await prisma.user.create({
    data: {
      email: 'demo@spiceroutes.wiki',
      password: hashedPassword,
      name: 'Demo User',
      isActive: true,
      isEmailVerified: true,
      bio: 'A passionate spice enthusiast and home chef.',
      preferences: {
        favoriteSpices: ['black-pepper', 'cinnamon', 'turmeric'],
        dietaryRestrictions: [],
        skillLevel: 'intermediate'
      }
    }
  });

  console.log('✅ Created test user:', testUser.email);

  // Create popular spices
  const spices = [
    {
      name: 'Black Pepper',
      scientificName: 'Piper nigrum',
      description: 'Known as the "king of spices," black pepper is one of the most widely used spices in the world. Native to the Western Ghats of India, it adds a sharp, pungent flavor to dishes.',
      origin: ['India', 'Vietnam', 'Indonesia', 'Brazil'],
      imageUrl: '/images/spices/black-pepper.jpg',
      flavorProfile: {
        sweet: 1,
        savory: 8,
        bitter: 3,
        sour: 0,
        umami: 2,
        pungent: 9,
        heatLevel: 3
      },
      heatLevel: 3,
      culinaryUses: ['Seasoning', 'Marinades', 'Sauces', 'Preservation'],
      substitutes: ['White pepper', 'Green pepper', 'Pink pepper'],
      pairings: ['Salt', 'Garlic', 'Thyme', 'Rosemary'],
      seasonality: 'Year-round',
      isPopular: true
    },
    {
      name: 'Cinnamon',
      scientificName: 'Cinnamomum verum',
      description: 'A warm, sweet spice obtained from the inner bark of cinnamon trees. Ceylon cinnamon is considered "true cinnamon" and is prized for its delicate flavor.',
      origin: ['Sri Lanka', 'India', 'Madagascar', 'Brazil'],
      imageUrl: '/images/spices/cinnamon.jpg',
      flavorProfile: {
        sweet: 9,
        savory: 2,
        bitter: 1,
        sour: 0,
        umami: 0,
        pungent: 4,
        heatLevel: 1
      },
      heatLevel: 1,
      culinaryUses: ['Baking', 'Desserts', 'Beverages', 'Curries'],
      substitutes: ['Cassia', 'Nutmeg', 'Allspice'],
      pairings: ['Cloves', 'Nutmeg', 'Cardamom', 'Ginger'],
      seasonality: 'Year-round',
      isPopular: true
    },
    {
      name: 'Turmeric',
      scientificName: 'Curcuma longa',
      description: 'A vibrant yellow spice that is a key ingredient in curry powder. Known for its earthy, slightly bitter flavor and numerous health benefits.',
      origin: ['India', 'Indonesia', 'China', 'Thailand'],
      imageUrl: '/images/spices/turmeric.jpg',
      flavorProfile: {
        sweet: 2,
        savory: 6,
        bitter: 5,
        sour: 1,
        umami: 3,
        pungent: 4,
        heatLevel: 0
      },
      heatLevel: 0,
      culinaryUses: ['Curries', 'Rice dishes', 'Marinades', 'Golden milk'],
      substitutes: ['Saffron', 'Curry powder', 'Mustard powder'],
      pairings: ['Black pepper', 'Ginger', 'Cumin', 'Coriander'],
      seasonality: 'Year-round',
      isPopular: true
    },
    {
      name: 'Saffron',
      scientificName: 'Crocus sativus',
      description: 'The world\'s most expensive spice by weight, saffron consists of the dried stigmas of the saffron crocus. It imparts a golden color and unique flavor to dishes.',
      origin: ['Iran', 'Kashmir', 'Spain', 'Greece'],
      imageUrl: '/images/spices/saffron.jpg',
      flavorProfile: {
        sweet: 5,
        savory: 4,
        bitter: 3,
        sour: 1,
        umami: 2,
        pungent: 2,
        heatLevel: 0
      },
      heatLevel: 0,
      culinaryUses: ['Rice dishes', 'Desserts', 'Beverages', 'Breads'],
      substitutes: ['Turmeric', 'Safflower', 'Annatto'],
      pairings: ['Rose', 'Cardamom', 'Vanilla', 'Honey'],
      seasonality: 'Fall harvest',
      isPopular: true
    },
    {
      name: 'Cardamom',
      scientificName: 'Elettaria cardamomum',
      description: 'Known as the "queen of spices," cardamom has a complex flavor that is sweet, floral, and slightly citrusy. It\'s the third most expensive spice after saffron and vanilla.',
      origin: ['India', 'Guatemala', 'Sri Lanka', 'Tanzania'],
      imageUrl: '/images/spices/cardamom.jpg',
      flavorProfile: {
        sweet: 7,
        savory: 3,
        bitter: 2,
        sour: 2,
        umami: 1,
        pungent: 5,
        heatLevel: 1
      },
      heatLevel: 1,
      culinaryUses: ['Coffee', 'Tea', 'Desserts', 'Curries'],
      substitutes: ['Cinnamon', 'Nutmeg', 'Ginger'],
      pairings: ['Rose', 'Saffron', 'Cinnamon', 'Cloves'],
      seasonality: 'Year-round',
      isPopular: true
    },
    {
      name: 'Star Anise',
      scientificName: 'Illicium verum',
      description: 'A star-shaped spice with a strong licorice flavor. It\'s a key ingredient in Chinese five-spice powder and Vietnamese pho.',
      origin: ['China', 'Vietnam', 'India', 'Japan'],
      imageUrl: '/images/spices/star-anise.jpg',
      flavorProfile: {
        sweet: 8,
        savory: 2,
        bitter: 3,
        sour: 0,
        umami: 1,
        pungent: 6,
        heatLevel: 0
      },
      heatLevel: 0,
      culinaryUses: ['Broths', 'Marinades', 'Baking', 'Beverages'],
      substitutes: ['Anise seed', 'Fennel seed', 'Chinese five-spice'],
      pairings: ['Cinnamon', 'Cloves', 'Ginger', 'Sichuan pepper'],
      seasonality: 'Fall harvest',
      isPopular: true
    }
  ];

  for (const spiceData of spices) {
    const spice = await prisma.spice.create({
      data: spiceData
    });
    console.log(`✅ Created spice: ${spice.name}`);

    // Add medicinal properties
    if (spice.name === 'Turmeric') {
      await prisma.medicinalProperty.create({
        data: {
          spiceId: spice.id,
          property: 'Anti-inflammatory',
          description: 'Curcumin in turmeric has powerful anti-inflammatory effects and is a very strong antioxidant.',
          evidence: 'Multiple clinical studies'
        }
      });
    }

    // Add nutritional info
    await prisma.nutritionalInfo.create({
      data: {
        spiceId: spice.id,
        nutrient: 'Dietary Fiber',
        amount: Math.random() * 10 + 5,
        unit: 'g per 100g',
        dailyValue: Math.random() * 20 + 10
      }
    });
  }

  // Create sample recipes
  const blackPepper = await prisma.spice.findUnique({ where: { name: 'Black Pepper' } });
  const turmeric = await prisma.spice.findUnique({ where: { name: 'Turmeric' } });

  if (blackPepper && turmeric) {
    const recipe = await prisma.recipe.create({
      data: {
        title: 'Golden Turmeric Latte',
        description: 'A warming, anti-inflammatory beverage perfect for cold evenings. This golden milk combines the healing properties of turmeric with creamy coconut milk.',
        authorId: testUser.id,
        imageUrl: '/images/recipes/golden-latte.jpg',
        cuisine: 'Indian',
        difficulty: 'Easy',
        prepTime: 5,
        cookTime: 10,
        servings: 2,
        calories: 120,
        isFeatured: true,
        ingredients: {
          create: [
            { name: 'Coconut milk', quantity: '2', unit: 'cups', order: 1 },
            { name: 'Fresh ginger', quantity: '1', unit: 'inch piece', order: 2 },
            { name: 'Honey', quantity: '2', unit: 'tablespoons', order: 3 },
            { name: 'Coconut oil', quantity: '1', unit: 'teaspoon', order: 4 }
          ]
        },
        instructions: {
          create: [
            {
              stepNumber: 1,
              content: 'In a saucepan, combine coconut milk, grated ginger, turmeric, and black pepper.',
              duration: 2
            },
            {
              stepNumber: 2,
              content: 'Heat over medium heat, whisking frequently, until hot but not boiling.',
              duration: 5
            },
            {
              stepNumber: 3,
              content: 'Strain through a fine mesh sieve to remove ginger pieces.',
              duration: 1
            },
            {
              stepNumber: 4,
              content: 'Stir in honey and coconut oil until dissolved. Serve warm.',
              duration: 2
            }
          ]
        },
        spices: {
          create: [
            {
              spiceId: turmeric.id,
              quantity: '1',
              unit: 'teaspoon',
              notes: 'Fresh turmeric can be used for stronger flavor'
            },
            {
              spiceId: blackPepper.id,
              quantity: '1/4',
              unit: 'teaspoon',
              notes: 'Enhances turmeric absorption'
            }
          ]
        }
      }
    });

    console.log(`✅ Created recipe: ${recipe.title}`);

    // Add a rating
    await prisma.rating.create({
      data: {
        userId: testUser.id,
        recipeId: recipe.id,
        value: 5,
        review: 'Delicious and healthy! I make this every morning now.'
      }
    });

    // Create a collection
    const collection = await prisma.collection.create({
      data: {
        userId: testUser.id,
        name: 'Favorite Beverages',
        description: 'My go-to drink recipes',
        isPublic: true,
        recipes: {
          create: {
            recipeId: recipe.id
          }
        }
      }
    });

    console.log(`✅ Created collection: ${collection.name}`);
  }

  // Create tags
  const tags = ['Vegan', 'Gluten-Free', 'Quick', 'Healthy', 'Comfort Food'];
  for (const tagName of tags) {
    await prisma.tag.create({
      data: { name: tagName }
    });
    console.log(`✅ Created tag: ${tagName}`);
  }

  console.log('🎉 Database seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
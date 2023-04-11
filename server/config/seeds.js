const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Electronics' },
    { name: 'Furntire & Decour' },
    { name: 'Games' },
    { name: 'Sports & Outdoors' },
    { name: 'Toys' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Pre built PC',
      description:
        'The best PC there was 20 years ago! Will run anything with ease.',
      image: 'png',  
      category: categories[0]._id,
      price: 1500,
      quantity: 5
    },
    {
      name: 'Mutator RC car by Tyco!!',
      description:
        'The core feature of the Mutator is it’s ability to ‘morph’ into several different stances combined with the 4WD at a maximum speed of 17km/h (11mph).',
      image: 'mutator.png',
      category: categories[0]._id,
      price: 140,
      quantity: 3
    },
    {
      name: 'Beachcroft outdoor furniture set',
      category: categories[1]._id,
      description:
        'This set includes an L shape outdoor couch, end table and coffe table.',
      image: 'beachcroft.png',
      price: 200,
      quantity: 20
    },
    {
      name: '20 person tent',
      category: categories[1]._id,
      description:
        'This tent will sleep 20 people uncomfortably and repel wild life. The best choice for any adventurer!!',
      image: 'rei.png',
      price: 500,
      quantity: 10
    },
    {
      name: '43 gallon compost tumbler',
      category: categories[1]._id,
      description:
        'Grow your green thumb with a 43-gallon outdoor dual-chamber tumbling composter! It is an ideal choice for your backyard and your garden plants to thrive.',
      image: 'compost.png',
      price: 89.99,
      quantity: 15
    },
    {
      name: 'Refurbished N64 bundle',
      category: categories[2]._id,
      description:
        'This Nintendo 64 system and all its games and accessories are refurbished and cleaned. Our systems are in great condition and free from most cosmetic flaws.',
      image: 'n64.png',
      price: 399.99,
      quantity: 30
    },
    {
      name: 'Used copy Diablo II LOD',
      category: categories[2]._id,
      description:
        'This is a hack and slash action role-playing game made originally for PC in 2001.',
      image: 'diablo.png',
      price: 18.99,
      quantity: 30
    },
    {
      name: '9ft Black Diamond billiards table',
      category: categories[3]._id,
      description:
        'The Black Diamond billiard table is an affordable, contemporary billiard table with a black laminate and has metal corner caps & trim. The laminate is burn and scratch-resistant.',
      image: 'billiards.png',
      price: 2500,
      quantity: 3
    },
    {
      name: 'Pogs',
      category: categories[4]._id,
      description: '100+ vintage pogs all from the 90’s with 3 slammers, metal and plastic, and a heavy duty brass slammer that weighs about 1.2 oz.',
      image: 'pogs.png',
      price: 29.99,
      quantity: 10
    },
    {
      name: 'Creepy Crawlers Workshop',
      category: categories[4]._id,
      description:
        'This set comes with a series of die-cast metal moulds resembling various bug-like creatures, into which is poured a liquid chemical substance called "Plasti-Goop", which comes in assorted colours.',
      image: 'creepy.png',
      price: 49.99,
      quantity: 2
    },
    {
      name: 'Juchi Kopi',
      category: categories[4]._id,
      description:
        'Bobs Burgers Kuchi Kopi glow in the dark 5" vinyl figure.',
      image: 'kopi.png',
      price: 16.99,
      quantity: 1
    },
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Number',
    lastName: 'One',
    email: 'Numberone@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Number',
    lastName: 'Two',
    email: 'Numbertwo@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});

const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Electronics' },
    { name: 'Furniture & Decour' },
    { name: 'Games' },
    { name: 'Sports & Outdoors' },
    { name: 'Toys' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'VENGEANCE i7300 Gaming PC',
      description:
        'The Vengeance PC is stylish, silent, and has high-end performance that keeps my stream running smooth with plenty of power to spare. Has current PC parts. Trust us.',
      image: 'corsair.png',  
      category: categories[0]._id,
      price: 999.99,
      quantity: 5
    },
    {
      name: 'Samsung - Odyssey Ark 55”',
      description:
        'LED Curved 4K UHD Gaming Monitor.',
      image: 'odysseyArk.png',  
      category: categories[0]._id,
      price: 399.99,
      quantity: 5
    },
    {
      name: 'Apple iPhone 14 Pro',
      description:
        'With the most impressive dual-camera system on iPhone. Capture stunning photos in low light and bright light.',
      image: 'iPhone14.png',
      category: categories[0]._id,
      price: 59.99,
      quantity: 3
    },
    {
      name: 'Canon Eos Rebel T7 Digital SLR Camera',
      description:
        'Compact and capable, the Canon EOS Rebel T7 is a sleek entry-level DSLR featuring versatile imaging capabilities and a helpful feature-set.',
      image: 'canon.png',
      category: categories[0]._id,
      price: 99.99,
      quantity: 3
    },
    {
      name: 'Mutator RC car by Tyco!!',
      description:
        'The core feature of the Mutator is it’s ability to ‘morph’ into several different stances combined with the 4WD at a maximum speed of 17km/h (11mph).',
      image: 'mutator.png',
      category: categories[0]._id,
      price: 139.99,
      quantity: 3
    },
    {
      name: 'Beachcroft outdoor furniture set',
      category: categories[1]._id,
      description:
        'This set includes an L shape outdoor couch, end table and coffe table.',
      image: 'beachcroft.png',
      price: 199.99,
      quantity: 20
    },
    {
      name: 'ATY 3 Piece Living Room Set',
      category: categories[1]._id,
      description:
        'Includes 3-seater couch, loveseat and single chair, with 5 pillows, decor of button and copper nail on arms and back.',
      image: 'merax.png',
      price: 999.99,
      quantity: 10
    },
    {
      name: 'Merax Modern Large U-Shape Sectional Sofa',
      category: categories[1]._id,
      description:
        '7 seat fabric sectional sofa set with movable ottoman, L shape sectional sofa corner couch with 3 pillows for living room apartment or office.',
      image: 'meraxmodern.png',
      price: 759.99,
      quantity: 15
    },
    {
      name: 'WATERPAR LED Bathroom Mirror',
      category: categories[1]._id,
      description:
        '96x36 wall mounted vanity mirror with backlit and front light with dimmable 3 colors anti-fog smart memory vertical/horizontal.',
      image: 'waterpar.png',
      price: 199.99,
      quantity: 12
    },
    {
      name: 'Amerlife Wall Unit Entertainment Center with Fireplace and Bookshelves',
      category: categories[1]._id,
      description:
        '70" fireplace TV stand, 2 x wall cabinets & 2 x end tables, modern LED light console table for living room, black/ivory.',
      image: 'amerlife.png',
      price: 799.99,
      quantity: 12
    },
    {
      name: 'Playstation 5 Console',
      category: categories[2]._id,
      description:
        'White disc version PS5 console - 4K-TV gaming, 120Hz 8K output, 16GB GDDR6, 825GB SSD, WiFi 6 and bluetooth 5.1.',
      image: 'ps5.png',
      price: 599.99,
      quantity: 50
    },
    {
      name: 'Microsoft Xbox Series X',
      category: categories[2]._id,
      description:
        '1TB console clack + 1 Xbox wireless controller, true 4K streaming, Wi-Fi, 3D Spatial Sound and high speed HDMI cable.',
      image: 'xbox.png',
      price: 499.99,
      quantity: 100
    },
    {
      name: 'Refurbished N64 bundle',
      category: categories[2]._id,
      description:
        'This Nintendo 64 system and all its games and accessories are refurbished and cleaned. Our systems are in great condition and free from most cosmetic flaws.',
      image: 'n64.png',
      price: 399.99,
      quantity: 20
    },
    {
      name: 'Diablo II Resurrected',
      category: categories[2]._id,
      description:
        'This is a hack and slash action role-playing game made originally for PC in 2001, now for PS5 and Xbox.',
      image: 'diablo.png',
      price: 13.99,
      quantity: 30
    },
    {
      name: 'Hogwarts Legacy PS5',
      category: categories[2]._id,
      description:
        'An immersive, open-world action RPG set in the world first introduced in the Harry Potter books. For the first time, experience Hogwarts in the 1800s.',
      image: 'hogwarts.png',
      price: 59.99,
      quantity: 15
    },
    {
      name: '9ft Black Diamond billiards table',
      category: categories[3]._id,
      description:
        'The Black Diamond billiard table is an affordable, contemporary billiard table with a black laminate and has metal corner caps & trim. The laminate is burn and scratch-resistant.',
      image: 'billiards.png',
      price: 499.99,
      quantity: 3
    },
    {
      name: 'Golf Putting Game Set',
      category: categories[3]._id,
      description:
        'Golf putting green mat with 2 putters, 6 golf balls and 1 portable bag and golf pong game for indoor, outdoor, backyard party, home or office use.',
      image: 'putt.png',
      price: 49.99,
      quantity: 10
    },
    {
      name: 'GSE Portable Badminton Volleyball Combo Set',
      category: categories[3]._id,
      description:
        'Combo Set for backyard lawn/beach with volleyball/badminton net, PU volleyball with pump, 4 badminton rackets, 3 shuttlecocks and carrying bag.',
      image: 'net.png',
      price: 95.99,
      quantity: 10
    },
    {
      name: 'Sttoraboks Basketball Rack',
      category: categories[3]._id,
      description:
        '4-Layer ball rack organizer with baseball bat holder & hooks sport equipment storage cart with wheels for football, volleyball and soccer.',
      image: 'rack.png',
      price: 59.99,
      quantity: 10
    },
    {
      name: 'Electric Scooter',
      category: categories[3]._id,
      description:
        '5600W dual motor max speed 50MPH, 60V33AH lithium battery 60 mile range, 11" vacuum off-road tires and a high power dual drive.',
      image: 'scooter.png',
      price: 649.99,
      quantity: 5
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
      name: 'Kuchi Kopi',
      category: categories[4]._id,
      description:
        'Bobs Burgers Kuchi Kopi glow in the dark 5" vinyl figure.',
      image: 'kopi.png',
      price: 16.99,
      quantity: 1
    },
    {
      name: 'Pbooo Dancing Cactus',
      category: categories[4]._id,
      description:
        'Talking, repeat and singing sunny toy cactus.',
      image: 'cactus.png',
      price: 16.99,
      quantity: 1
    },
    {
      name: 'Pokemon TCG',
      category: categories[4]._id,
      description:
        'Random Cards from every series, 50 cards in each lot.',
      image: 'pokemon.png',
      price: 15.99,
      quantity: 13
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

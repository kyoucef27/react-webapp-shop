const Products = [
    {  id: 1,
        name: "T-Shirt",
        price: 4500,
        desc: "Comfortable cotton t-shirt",
        fullDesc: "This premium cotton t-shirt offers exceptional comfort for everyday wear. Features a classic fit, reinforced stitching, and breathable fabric. Available in multiple colors and sizes from S to XXL. Machine washable and designed to maintain shape after multiple washes.",
        gender: "Man",
        views: 1,
        stars: 3,
        reviews: [
            { name: "John", comment: "Great fit!" },
            { name: "Emma", comment: "Very comfortable." },
            { name: "Tom", comment: "Love the color." }
        ],
        sold: 95
    },
    {
    id: 2,
    name: "Jeans",
    price: 6500,
    desc: "Classic blue denim",
    fullDesc: "These high-quality slim fit jeans are made from durable denim that offers both style and comfort. Features a modern cut with slight stretch for improved mobility. The classic blue wash pairs easily with any casual outfit. Available in waist sizes 28-38 with various length options.",
    gender: "Woman",
    views: 3,
    stars: 3,
    reviews: [
        { name: "Alice", comment: "Fits great!" },
        { name: "Sophia", comment: "Good material." },
        { name: "Rachel", comment: "Love them!" }
    ],
    sold: 2
},
{
    id: 3,
    name: "Hoodie",
    price: 9000,
    desc: "Warm fleece hoodie",
    fullDesc: "Stay warm and comfortable in this premium fleece hoodie. Features a spacious kangaroo pocket, adjustable hood, and ribbed cuffs and hem. The brushed interior provides exceptional softness and warmth. Perfect for lounging or outdoor activities in cooler weather.",
    gender: "Man",
    views: 3,
    stars: 4,
    reviews: [
        { name: "David", comment: "Warm and cozy." },
        { name: "Liam", comment: "Perfect for winter." },
        { name: "Luke", comment: "Nice quality." }
    ],
    sold: 2
},
{
    id: 4,
    name: "Sneakers",
    price: 21000,
    desc: "Stylish and comfortable",
    fullDesc: "These versatile sneakers combine modern style with all-day comfort. The cushioned insole and flexible outsole provide support for extended wear. Breathable mesh panels keep your feet cool, while the durable construction ensures these sneakers will last. Available in multiple color combinations.",
    gender: "Woman",
    views: 203,
    stars: 5,
    reviews: [
        { name: "Jessica", comment: "Very comfortable." },
        { name: "Olivia", comment: "Love the design!" },
        { name: "Chloe", comment: "Perfect for running." }
    ],
    sold: 102
},
{
    id: 5,
    name: "Jacket",
    price: 25000,
    desc: "Regular Fit Napped",
    fullDesc: "Regular-fit jacket in napped fabric with a comfortable, classic silhouette. Collar, metal buttons at front, chest pockets with flap and button, and welt side pockets. Long sleeves with button at cuffs. Adjustable tab at sides of hem with buttons.",
    gender: "Man",
    views: 87,
    stars: 5,
    reviews: [
        { name: "Daniel", comment: "Great quality!" },
        { name: "Ethan", comment: "Nice fit." },
        { name: "Nathan", comment: "Very warm!" }
    ],
    sold: 50
},
{
    id: 6,
    name: "Dress",
    price: 16000,
    desc: "Elegant evening dress",
    fullDesc: "Make a statement in this elegant evening dress designed for special occasions. The flattering silhouette and quality fabric create a sophisticated look. Features a concealed zipper, subtle stretch for comfort, and a lined design. Available in several rich colors that transition perfectly from cocktail events to formal dinners.",
    gender: "Woman",
    views: 5,
    stars: 5,
    reviews: [
        { name: "Sophia", comment: "Perfect for events." },
        { name: "Isabella", comment: "Elegant and classy." },
        { name: "Mia", comment: "Love the fabric!" }
    ],
    sold: 4
},
{
    id: 7,
    name: "Sweater",
    price: 6000,
    desc: "Cozy knit sweater",
    fullDesc: "This luxurious knit sweater combines warmth with style. Made from a premium blend of wool and cotton for the perfect balance of comfort and durability. The classic design features ribbed cuffs and hem for a snug fit that retains its shape. Versatile enough for office wear or casual outings.",
    gender: "Man",
    views: 109,
    stars: 4,
    reviews: [
        { name: "Lucas", comment: "Super warm!" },
        { name: "Henry", comment: "Nice material." },
        { name: "James", comment: "Fits perfectly." }
    ],
    sold: 60
},
{
    id: 8,
    name: "Skirt",
    price: 8500,
    desc: "Flowy midi skirt",
    fullDesc: "This versatile midi skirt features a flowing silhouette that moves beautifully with every step. The elastic waistband provides all-day comfort, while the quality fabric ensures the skirt drapes elegantly. Pair with a blouse for work or a casual top for weekend activities. Available in solid colors and subtle patterns.",
    gender: "Woman",
    views: 134,
    stars: 4,
    reviews: [
        { name: "Ella", comment: "Love the flow." },
        { name: "Hannah", comment: "Comfortable fit." },
        { name: "Zoe", comment: "Beautiful design!" }
    ],
    sold: 53
},
{
    id: 9,
    name: "Jersey Pyjama",
    price: 4500,
    desc: "Soft cotton sleepwear",
    fullDesc: "Comfortable jersey pyjama set perfect for kids of all ages. Made with soft, breathable cotton fabric that's gentle on the skin. Features fun, colorful patterns that kids will love. Easy to wash and maintain, this pyjama set is designed for both comfort and durability.",
    gender: "Kid",
    views: 98,
    stars: 4,
    reviews: [
        { name: "Lily", comment: "Cute design." },
        { name: "Ava", comment: "Comfortable and soft." },
        { name: "Emma", comment: "Great for bedtime." }
    ],
    sold: 30
},
{
    id: 10,
    name: "Stitch Pyjama",
    price: 4500,
    desc: "Character themed sleepwear",
    fullDesc: "Adorable Stitch-themed pyjama set that any child will adore. Features the beloved character from the popular Disney movie on soft, comfortable fabric. The set includes a matching top and bottom with elastic waistband for a comfortable fit. Perfect for bedtime stories and sweet dreams.",
    gender: "Kid",
    views: 157,
    stars: 5,
    reviews: [
        { name: "Charlotte", comment: "My child loves it!" },
        { name: "Megan", comment: "Great quality." },
        { name: "Isabelle", comment: "Perfect for my daughter." }
    ],
    sold: 113
},

{
    id: 11,
    name: "SpiderMan Pyjama",
    price: 4500,
    desc: "Superhero themed sleepwear",
    fullDesc: "Let your little one feel like a superhero in this Spider-Man themed pajama set. Made from high-quality cotton with vibrant, fade-resistant prints of the iconic superhero. The comfortable fit allows for easy movement during sleep or play. Machine washable and designed to withstand countless nights of superhero dreams.",
    gender: "Kid",
    views: 189,
    stars: 5,
    reviews: [
        { name: "Noah", comment: "My son won't take it off!" },
        { name: "Sarah", comment: "Great quality material." },
        { name: "Michael", comment: "Perfect gift for any kid." }
    ],
    sold: 145
},
{
    id: 12,
    name: "Marvel Shoes",
    price: 4500,
    desc: "Superhero casual footwear",
    fullDesc: "These Marvel-themed shoes combine style and comfort for young superhero fans. Featuring colorful designs with favorite Marvel characters, these shoes have cushioned insoles for all-day comfort. The durable rubber outsoles provide good traction for active kids. Available in various sizes with easy-to-use closure systems for independent dressing.",
    gender: "Kid",
    views: 143,
    stars: 4,
    reviews: [
        { name: "Ben", comment: "Very durable and comfortable." },
        { name: "Lisa", comment: "My son loves these shoes!" },
        { name: "Kevin", comment: "Great for active kids." }
    ],
    sold: 110
},
{
    id: 13,
    name: "Pikatchu Hat",
    price: 1200,
    desc: "Pokemon character hat",
    fullDesc: "This adorable Pikachu hat brings Pokémon fun to any outfit. The cute design features Pikachu's iconic face and ears, made with soft, warm materials perfect for keeping little heads cozy. The adjustable fit ensures comfort for different head sizes. A must-have accessory for young Pokémon enthusiasts that adds playful charm to winter wardrobes.",
    gender: "Kid",
    views: 122,
    stars: 4,
    reviews: [
        { name: "Amy", comment: "So cute and fun!" },
        { name: "Paul", comment: "Great quality, stays on well." },
        { name: "Olivia", comment: "My daughter wears it everywhere." }
    ],
    sold: 98
},
{
    id: 14,
    name: "Modern Minimalist",
    price: 10000,
    desc: "Clean subtle scent",
    fullDesc: "Modern Minimalist perfume embodies understated elegance with its clean, subtle fragrance profile. Opening with light citrus notes that blend into a heart of soft florals and white musk. The minimalist bottle design complements the sophisticated scent within. Perfect for everyday wear in professional settings where a refined but not overpowering fragrance is desired.",
    gender: "Parfume",
    views: 167,
    stars: 4,
    reviews: [
        { name: "Claire", comment: "Subtle and perfect for office." },
        { name: "Robert", comment: "Elegant scent that lasts." },
        { name: "Jennifer", comment: "My signature fragrance now." }
    ],
    sold: 125
},
{
    id: 15,
    name: "Social Butterfly",
    price: 10000,
    desc: "Vibrant floral fragrance",
    fullDesc: "Social Butterfly perfume captures the essence of charisma and vivacity in a bottle. This vibrant fragrance opens with sparkling top notes of mandarin and peach, leading to a floral heart of jasmine and rose. The lasting base notes of vanilla and amber provide warmth and depth. An attention-grabbing scent perfect for social occasions and evenings out.",
    gender: "Parfume",
    views: 196,
    stars: 5,
    reviews: [
        { name: "Elizabeth", comment: "Gets so many compliments!" },
        { name: "Maria", comment: "Perfect for special occasions." },
        { name: "Victoria", comment: "Lasts all night long." }
    ],
    sold: 160
},
{
    id: 16,
    name: "Chick Solitaire",
    price: 10000,
    desc: "Bold sophisticated scent",
    fullDesc: "Chick Solitaire is a bold, sophisticated fragrance for the independent spirit. This complex perfume layers rich spices over a heart of exotic flowers, with base notes of sandalwood and patchouli for lasting impression. The luxurious formulation ensures the scent evolves beautifully throughout the day. Presented in an artistic bottle that makes a statement on any vanity.",
    gender: "Parfume",
    views: 178,
    stars: 4,
    reviews: [
        { name: "Diana", comment: "Unique and memorable." },
        { name: "Catherine", comment: "Bold without being overwhelming." },
        { name: "Alexandra", comment: "My confidence booster." }
    ],
    sold: 135
},
{
    id: 17,
    name: "Lose Cargo Jeans",
    price: 4500,
    desc: "Relaxed utility pants",
    fullDesc: "These loose cargo jeans combine comfort with practicality. The relaxed fit through the leg provides unrestricted movement, while multiple utility pockets offer convenient storage. Made from durable cotton with subtle distressing for a lived-in look. Perfect for casual outings or weekend activities when both style and functionality matter.",
    gender: "Man",
    views: 142,
    stars: 4,
    reviews: [
        { name: "Andrew", comment: "Perfect fit and very comfortable." },
        { name: "Mark", comment: "Great for casual wear." },
        { name: "Chris", comment: "Love all the pockets!" }
    ],
    sold: 108
},
{
    id: 18,
    name: "FairFax Baggy Jeans",
    price: 7500,
    desc: "Trendy oversized denim",
    fullDesc: "FairFax Baggy Jeans embrace the return of 90s fashion with their trendy oversized silhouette. Featuring a loose fit from waist to ankle, these jeans offer supreme comfort while making a style statement. The premium denim fabric has been specially washed for a soft feel and authentic look. Pairs perfectly with both fitted and loose tops for a balanced outfit.",
    gender: "Man",
    views: 3,
    stars: 3,
    reviews: [
        { name: "Jason", comment: "Great 90s vibe, very comfortable." },
        { name: "Ryan", comment: "Runs a bit large but love the style." },
        { name: "Eric", comment: "Perfect for streetwear looks." }
    ],
    sold: 2
},
{
    id: 19,
    name: "Slim Fit Polo Shirt",
    price: 6200,
    desc: "Tailored classic top",
    fullDesc: "This slim fit polo shirt offers a modern, tailored look for the style-conscious man. The carefully constructed cut provides a flattering silhouette without restricting movement. Made from high-quality cotton pique fabric that maintains its shape and color through repeated washing. The classic design features a three-button placket and ribbed collar for timeless appeal.",
    gender: "Man",
    views: 187,
    stars: 5,
    reviews: [
        { name: "Thomas", comment: "Perfect fit, very flattering." },
        { name: "William", comment: "High quality fabric that lasts." },
        { name: "Alex", comment: "My go-to for business casual." }
    ],
    sold: 142
},
{
    id: 20,
    name: "Linen-Blend Polo Shirt",
    price: 7000,
    desc: "Breathable summer essential",
    fullDesc: "Stay cool and stylish with this linen-blend polo shirt, perfect for warm weather. The natural linen fibers combined with cotton create a breathable fabric that wicks moisture away from the skin. The relaxed fit and lightweight construction make it ideal for summer outings or vacation wear. Available in several earthy tones that complement a seasonal wardrobe.",
    gender: "Man",
    views: 132,
    stars: 4,
    reviews: [
        { name: "Greg", comment: "Perfect for hot days." },
        { name: "Patrick", comment: "Stylish and comfortable." },
        { name: "Brian", comment: "Love the breathable fabric." }
    ],
    sold: 105
},
{
    id: 21,
    name: "Running Belt Bag",
    price: 4000,
    desc: "Sports utility pouch",
    fullDesc: "This running belt bag combines functionality with comfort for active lifestyles. Designed to sit securely around the waist, it features water-resistant pockets for essentials like phone, keys, and cards. The adjustable strap ensures a perfect fit during movement, while reflective elements enhance visibility during early morning or evening runs. Lightweight yet durable for everyday fitness use.",
    gender: "Man",
    views: 119,
    stars: 5,
    reviews: [
        { name: "Matthew", comment: "Perfect for my morning runs." },
        { name: "Scott", comment: "Stays in place, very secure." },
        { name: "Jeff", comment: "Fits everything I need." }
    ],
    sold: 90
},
{
    id: 22,
    name: "Bleecker Wide Leg Jeans",
    price: 6500,
    desc: "Fashionable relaxed denim",
    fullDesc: "The Bleecker Wide Leg Jeans offer a fashionable silhouette with maximum comfort. These statement jeans feature a high waist and dramatically wide legs that create a striking profile. The premium denim has just enough stretch to maintain shape while moving with you throughout the day. Versatile enough to pair with heels for an elevated look or sneakers for casual chic appeal.",
    gender: "Woman",
    views: 156,
    stars: 4,
    reviews: [
        { name: "Nicole", comment: "So flattering and comfortable." },
        { name: "Rebecca", comment: "Love the wide leg trend!" },
        { name: "Michelle", comment: "Perfect length and fit." }
    ],
    sold: 118
},
{
    "id": 23,
    "name": "Tie-belt Shirt Dress",
    "price": 8000,
    "desc": "Elegant belted shirt dress",
    "fullDesc": "A versatile and elegant shirt dress featuring a tie-belt waist that flatters every figure. Designed for comfort and style, this dress is perfect for both casual and formal occasions.",
    "gender": "Woman",
    "views": 120,
    "stars": 4,
    "reviews": [
        { "name": "Julia", "comment": "Flattering on all body types." },
        { "name": "Stephanie", "comment": "Perfect for work or dinner out." },
        { "name": "Laura", "comment": "The tie belt is so versatile." }
    ],
    "sold": 95
},
{
    "id": 24,
    "name": "Flared skirt",
    "price": 5500,
    "desc": "Feminine flowy midi skirt",
    "fullDesc": "A classic flared skirt that brings effortless femininity to any outfit. Its soft, breathable fabric and flattering silhouette make it ideal for everyday wear or special moments.",
    "gender": "Woman",
    "views": 156,
    "stars": 4,
    "reviews": [
        { "name": "Amanda", "comment": "So flattering and swishy!" },
        { "name": "Katie", "comment": "The perfect midi length." },
        { "name": "Natalie", "comment": "Great quality fabric." }
    ],
    "sold": 120
},
{
    "id": 25,
    "name": "Jacket with Slit Cuffs",
    "price": 11000,
    "desc": "Stylish slit-cuff jacket",
    "fullDesc": "Make a statement with this modern jacket featuring elegant slit cuffs and a tailored fit. Perfect for layering, it adds sophistication to any wardrobe with a touch of bold fashion.",
    "gender": "Woman",
    "views": 3,
    "stars": 5,
    "reviews": [
        { "name": "Rachel", "comment": "Unique design, gets compliments." },
        { "name": "Samantha", "comment": "Perfect statement piece." },
        { "name": "Taylor", "comment": "Love the slit cuff detail!" }
    ],
    "sold": 3
}
];

export default Products;








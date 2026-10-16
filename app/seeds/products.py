from app.models import db, Product


def seed_products():
    first = Product(user_id=2,name='Newest 2022 Lenovo V14 Business Laptop, 14-inch Full HD Display, AMD Athlon Gold',
                    description='The PC memory has been upgraded to 8GB DDR4 SDRAM for enhanced high bandwidth to easily switch back and forth between open applications; Hard drive has been upgraded to 256GB PCIe NVMe M.2 SSD for fast boot up and speedy data transfer AMD Athlon Gold 3150U 2.4 GHz Processor (up to 3.3 GHz Max Boost, 2 Cores, 4 Threads) Windows 11 Pro Power jack | HDMI | Headphone/mic combo | 4-in-1 SD card reader | 2 x USB 3.1 | USB 2.0 | Bluetooth 5.0 | Wi-Fi 4" Full HD (1920 x 1080) TN 220 nits Non-Touch Anti-Glare Display',
                    image_url='https://m.media-amazon.com/images/I/612kykhspkL._AC_SX679_.jpg'
    ,price=419,category='electronics',quantity=10)

    second = Product(user_id=2,name='HP Elite Desktop PC Computer Intel Core i5 3.1-GHz, 8 gb Ram, 1 TB Hard Drive',description='This product works and looks like new. Backed by the 90-day Amazon Renewed Guarantee. - This pre-owned product has been professionally inspected, tested and cleaned by Amazon-qualified suppliers. There will be no visible cosmetic imperfections when held at an arms length. Products with batteries will exceed 80% capacity relative to new. Accessories may not be original, but will be compatible and fully functional. Product may come in generic box.'
,image_url="https://m.media-amazon.com/images/I/718sn7oOcfL._AC_UY327_FMwebp_QL65_.jpg"
    ,price=181,category='electronics',quantity=4)

    third= Product(user_id=3,name='Electric Cordless Air Duster, Replaces Compressed Spray Gas Cans',description="Besides the environmental impact of fluorocarbons, compressed air cans have a number of other drawbacks. If you hold the trigger down for too long or aim the outlet at an angle, for example, then some of the compressed gases can be emitted as a liquid. Thats not ideal when you are dealing with sensitive computer components.",image_url='https://m.media-amazon.com/images/I/51xurNOMd6S._AC_SX466_.jpg'
    ,price=59,category='electronics',quantity=10)

    fourth = Product(user_id=1,name='Samsung Galaxy Buds Live, True Wireless Earbuds W/Active Noise Cancelling',description='SOUND THAT ROCKS: The AKG-tuned 12mm speaker and enhanced bass tone play everything in studio-quality sound. An open design creates a live listening environment, suiting those who prefer a natural, spacious sound NEW STYLE. NEW SOUND: Equal parts earbuds and ear bling, Galaxy Buds Live come in three colors you will want to rock all day',image_url='https://m.media-amazon.com/images/I/71qsNVFefKL._AC_SX466_.jpg'
    ,price=97,category='electronics',quantity=3)


    fifth= Product(user_id=2,name="Under Armour Women's Tech Short Sleeve V-Neck - Solid",description='100% Polyester. Imported. Machine Wash. UA Tech fabric is quick-drying, ultra-soft & has a more natural feelMaterial wicks sweat & dries really fast. 4-way stretch construction moves better in every direction Deep V-neck collar & slimmer fit deliver a sleek, more feminine silhouette Under Armours mission is to make all athletes better through passion, design and the relentless pursuit of innovation',image_url='https://m.media-amazon.com/images/I/51c5K0DI-WL._AC_UX679_.jpg'
    ,price=18,category='fashion',quantity=5)
    fifth2= Product(user_id=1,name='Gildan Adult Fleece Hooded Sweatshirt, Style G18500',description='Rib cuffs and bottom band with spandex for enhanced stretch and recovery and made to last double-needle stitching at shoulders, armholes, neck, waistband, and cuffs. Double-lined hood for additional warmth with color matched draw cord. Pouch pocket for storing your essentials',image_url='https://m.media-amazon.com/images/I/81yRtzd2b5L._AC_UX569_.jpg'
    ,price=36,category='fashion',quantity=4)
    fifth3= Product(user_id=2,name="Hanes Men's Full-Zip Eco-Smart Hoodie",description='50% Cotton, 50% Polyester, Imported, Zipper closure, Machine Wash, 7.8 ounce fleece sweatshirt made with up to 5 percent polyester created from recycled plastic, Double-needle cover-seamed neck and armholes stays strong Pill-resistant fabric with high-stitch density for durability, Ribbed waistband and cuffs for a comfortable fit Roomy front pockets 50% Cotton, 50% Polyester with up to 5% polyester created from recycled plastic, Ash 50% Cotton, 50% Polyester, Light Steel 50% Cotton, 50% Polyester, Charcoal Heather 65% Cotton 35% Polyester',image_url='https://m.media-amazon.com/images/I/81S2WhcTf7L._AC_UX569_.jpg'
    ,price=50,category='fashion',quantity=3)
    fifth4= Product(user_id=3,name="Baby Boy Clothes Newborn Boy Outfits Infant Summer Outfit Bodysuit Romper Pants Set Baby Boy's Clothing",description='Baby Boy Clothes for Spring and Summer: Material of this baby boy clothes is made of 95% cotton 5% spandex. Skin-friendly baby boy outfits, must have baby boy stuff and baby boy gift. Newborn Boy Outfits for Indoor and Outdoor: This newborn boy clothes feature with short sleeve bodysuit, and camouflage/stripe/mustache pattern baby boy pants. Adorable baby boy summer clothes. Baby Boy Outfits for Casual and Formal: Perfect for newborn boy clothes, baby boy clothes, infant boy clothes, baby boy’s clothing, baby boy summer clothes, baby boy stuff, baby boy gift.',image_url='https://m.media-amazon.com/images/I/71kD7y88tdL._AC_UX569_.jpg'
    ,price=20,category='fashion',quantity=4)

    fifth5= Product(user_id=2,name='YYcearken Twin Size Metal Frame Daybed with Trundle,Heavy Duty Steel Slat',description='Made by strong and sturdy metal provides durability and stability.Heavy duty bed frame:daybed 400lbs,trundle bed 400lbs.Overall bed frame dimension 77.32"L x 40.94"W x 41.73"H .Trundle Bed Dimensions:70.86"L x 40.55"W. Equipped with 4 easy-glide casters under the trundle - 2 locking and 2 non-locking. Just pull it out and lock it in place with the easy-glide casters. Perfect for pajama parties or overnight guests. Each daybed with trundle comes with a clear and detailed assembly instruction guide and all necessary tools are provided to get your bed assembled in no time.Please feel free to contact us if there is missing or damaged part during the process of shipping',image_url='https://m.media-amazon.com/images/I/81kzMYQ8GhS._AC_UL480_FMwebp_QL65_.jpg'
    ,price=259,category='furniture',quantity=1)
    fifth6= Product(user_id=2,name='OSP Home Furnishings Wicker Papasan Chair with 360-Degree Swivel,',description='Create a laid back vibe in your home with our twist on the classic papasan chair design. Overall Size: 40” W x 36” D x 35.25” H; Seat Size: 40” W x 17” D x 4.5” T; Back Size: 40” W x 18” H x 4.5” T. Enjoy the boho styling of our durable resin wicker wrapped over a metal frame and nest into the generously large Dacron-filled cushion. Complete with a 360° swivel to twist and turn to your heart’s content',image_url='https://m.media-amazon.com/images/I/619-XaDfWvL._AC_SX466_.jpg'
    ,price=183,category='furniture',quantity=10)
    fifth7= Product(user_id=3,name='GDFStudio Christopher Knight Home Karen Traditional Chesterfield Loveseat Sofa',description='Deep button tufting: featuring deep button tufting, our Loveseat offers both design and comfort. The tufting allows for breathing space while you relax, limiting the amount of heat that is generated. Nail head accents: expertly styled, this Loveseat has tasteful nail head accents on the front end of the scrolled arms to draw the eye in and complement the deep button tufting. Each nail head is individually applied for a beautiful, hand-crafted touch. Scrolled arms: to complete the Chesterfield look, this Loveseat features scrolled arms. Not only does it add an air of class to the piece and your room, but it also provides a more comfortable place to lean against while relaxing on your loveseat.',image_url='https://m.media-amazon.com/images/I/71-mt2P7J0L._AC_SX466_.jpg'
    ,price=616,category='furniture',quantity=3)
    fifth8= Product(user_id=3,name='VASAGLE Coat Rack, Hall Tree with Shoe Bench for Entryway, Industrial Accent',description='Something Certain: Some furniture looks good, but isn’t very practical. Others are functional, but look cold and boring. Not this hallway coat rack, however—with rustic brown tones, stable shelves, and coat hooks, you can get both style and functionality',image_url='https://m.media-amazon.com/images/I/71tLU8MDcrL._AC_SX466_.jpg'
    ,price=15,category='furniture',quantity=6)

    fifth9= Product(user_id=3,name='Healthy Snacks Care Package Grab And Go Variety Pack (20 Count)',description='QUALITY SNACKS: We do not compromise on quality. Our priority is to ensure that you get great value for your money. The snacks are perfect for both adults and kids. They will delight your taste buds and have you enjoy an incredible time. PERFECT CARE PACKAGE: office, meetings, schools, college, university, holidays, Halloween, Christmas, Valentines, Easter, on-the-go snacks, lunch or outing events, movie, movies, birthday, birthdays, celebration, hospitals, churches, get well soon, abroad, car driving, road trips, picnics, party, parties, after surgery, healing, finals week, deployment, summer, camp, cancer, chemo, sick, celebrate, graduation, sympathy, love, thank you, appreciation, congratulations, anniversary, wedding',image_url='https://m.media-amazon.com/images/I/81RZlUfikpL._AC_UL480_FMwebp_QL65_.jpg'
    ,price=25,category='food',quantity=2)
    fifth10= Product(user_id=2,name='Pringles Potato Crisps Chips, Lunch Snacks, Office and Kids Snacks, Snack',description='Enjoy snacking moments everywhere with the outrageously delicious flavor and fun shape of these ready-to-go. Pringles Potato Crisps in all your favorite flavors Convenient cups of stackable potato crisp varieties seasoned to savory perfection from edge to edge. Includes 27 cups of ready to eat potato crisps; 6, cups of Original; 6 cups of Sour Cream and Onion; 6 cups of Cheddar Cheese; 3 cups of BBQ; 3 cups of Sour Cream and Cheddar; 3 cups of Pizza; Packaged for freshness. Variety Pack contains milk and wheat ingredients Stack, snack, and savor at home and on the go; Pop open a cup anytime; Pack into a school lunch box, backpack or tote bag.',image_url='https://m.media-amazon.com/images/I/81CIge4tiwL._AC_UL480_FMwebp_QL65_.jpg'
    ,price=12,category='food',quantity=1)
    fifth11= Product(user_id=2,name='Pop-Tarts Toaster Pastries, 4 Flavor Variety Pack, Breakfast Foods',description='Soft toaster pastries with the flavors of frosted strawberry, blueberry, brown sugar cinnamon, or cookies and crème topped with delicious frosting; Sweet, fully baked, and ready to eat. Start your day with crumbly pastry crust and yummy filling; A delicious, family-favorite morning treat; Great for the whole family. Includes 1, 6.349-pound case containing 60 toaster pastries; 30 packages total; 2 pastries per package; Packaged for freshness and great taste',image_url='https://m.media-amazon.com/images/I/81za90qtEZL._AC_UL480_FMwebp_QL65_.jpg'
    ,price=19,category='food',quantity=7)
    fifth12= Product(user_id=2,name='Chef Boyardee Beef in Tomato & Meat Sauce Ravioli, 7.5 Oz',description='Chef Boyardee Beef Ravioli in tomato and meat sauce is a fun meal for the kids, and is ready to serve in less than one minute. Fits a low carb lifestyle with 25 grams net carbs per serving (28 grams total carbs minus 3 grams dietary fiber)',image_url='https://m.media-amazon.com/images/I/81Ny0u-LjxL._AC_UL480_FMwebp_QL65_.jpg'
    ,price=11,category='food',quantity=8)

    fifth13= Product(user_id=2,name='Minecraft Ultimate Ender Dragon Figure, 20-in Mist-Breathing Creature ',description='This thrilling large-scale Ender Dragon is a must-have addition to any Minecraft collection. Figure really comes to life as it expels a misty dragon breath that shows color-change battle damage on the included Steve figure! Ender Dragon also emits intimidating lights and sounds authentic to Minecraft!',image_url='https://m.media-amazon.com/images/I/71-1LCdiXEL._AC_UL480_FMwebp_QL65_.jpg'
    ,price=43,category='toys',quantity=9)
    fifth14= Product(user_id=2,name='TEMI Kids Bow and Arrow Set - LED Light Up Archery Toy Set with 10 Suction Cup ',description='Durable Design - Premium elasticity material of bows and arrows ensure its durable features, not easily broken. It has a smooth surface, which makes it safe for children. Sucker can be adsorbed on the smooth glass, wall, and targets(provided). Gift Ideas - Easy to wear quiver with strap, you can enjoy it even travelling or camping. Perfect for kids/ boys/ girls birthday party, class party, indoor outdoor activity. This is a safe and fun outdoor activity for everyone. Educational & Fun - Kids will practice their accuracy skills, hand-eye coordination, fine motor skills and aim right on target in the most fun and interactive way',image_url='https://m.media-amazon.com/images/I/71xzZpt0DyL._AC_UL480_FMwebp_QL65_.jpg'
    ,price=23,category='toys',quantity=4)
    fifth15= Product(user_id=3,name='Lydaz Bubble Lawn Mower for Toddlers, Kids Bubble Blower Maker Machine',description='The push mower features realistic sounds and bubble maker, which encourages pretend garden play, bring tons of bubbles. The push mower features realistic sounds and bubble maker, which encourages pretend garden play, bring tons of bubbles. utomatic bubble blowing gardening mower tool, pushing toys for baby, inspire your kids love sport, love walking outside',image_url='https://m.media-amazon.com/images/I/71Zvn0rRMwL._AC_UL480_FMwebp_QL65_.jpg'
    ,price=26,category='toys',quantity=2)
    fifth16= Product(user_id=1,name='League of Legends: Realms of Runeterra (Official Companion)',description="Unlock the mysteries and magic within League of Legends, one of the world's most popular video games, in this encyclopedic and collectible companion book that explores the game's epic lore. Embark on a journey through the realms of Runeterra in this first-ever collectible companion book, published to celebrate the game's tenth anniversary. Spanning the farthest reaches of this universe and venturing into uncharted territory, this encyclopedic compendium connects players to the rich storytelling that inspires all the action. Inside, you'll find",image_url='https://images-na.ssl-images-amazon.com/images/I/51wUNgIcO+L._SX258_BO1,204,203,200_.jpg'
    ,price=20,category='toys',quantity=6)


    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.add(fourth)
    db.session.add(fifth)
    db.session.add(fifth16)
    db.session.add(fifth2)
    db.session.add(fifth3)
    db.session.add(fifth4)
    db.session.add(fifth5)
    db.session.add(fifth6)
    db.session.add(fifth7)
    db.session.add(fifth8)
    db.session.add(fifth9)
    db.session.add(fifth10)
    db.session.add(fifth11)
    db.session.add(fifth12)
    db.session.add(fifth13)
    db.session.add(fifth14)
    db.session.add(fifth15)


    db.session.commit()


# Products featured on the homepage. Added by name if missing, so existing
# databases pick them up on the next deploy without re-seeding everything.
FEATURED_PRODUCTS = [
    dict(user_id=2, name='Echo Dot Smart speaker with clock and Alexa',
         description='Meet Echo Dot with clock: our most popular smart speaker with an LED display that shows the time, outdoor temperature, and timers. Ask Alexa to play music, answer questions, set alarms, and control compatible smart home devices.',
         image_url='https://m.media-amazon.com/images/I/51MzOVciT3L._AC_UY218_.jpg',
         price=60, category='electronics', quantity=10),
    dict(user_id=2, name='League of Legends Gift Card',
         description='Redeem for Riot Points in League of Legends. Unlock champions, skins, and more. Digital code delivered after purchase.',
         image_url='https://m.media-amazon.com/images/I/71iUrQk82KL._SY500_.jpg',
         price=100, category='toys', quantity=10),
]


def seed_featured_products():
    for data in FEATURED_PRODUCTS:
        if not Product.query.filter_by(name=data['name']).first():
            db.session.add(Product(**data))
    db.session.commit()


def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()

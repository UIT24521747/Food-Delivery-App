export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurantId: string;
  category: string;
  badge?: "Chef's Choice" | "Popular" | "Signature" | "New";
  prepTime: string;
  isAvailable: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  description: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  address: string;
  imageUrl: string;
  coverImageUrl: string;
  badge: string;
  isOpen: boolean;
  openingHours: string;
  menu: MenuItem[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  schedule: string;
  status: string;
  description: string;
  iconName: "wine" | "music" | "sparkles" | "utensils";
}

export const FINE_DINING_EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-jazz-cocktails",
    title: "Jazz & Cocktails",
    schedule: "Mỗi Thứ Sáu • 19:30 - 22:30",
    status: "Reserve",
    description: "Đêm nhạc Jazz acoustic sống động cùng bộ sưu tập Signature Cocktails pha chế thủ công.",
    iconName: "music",
  },
  {
    id: "exp-wine-tasting",
    title: "Wine Tasting & Sommelier",
    schedule: "Thứ Bảy hàng tuần • 18:30",
    status: "Reserve",
    description: "Thưởng thức 5 dòng vang Grand Cru tuyển chọn từ vùng Tuscany & Bordeaux cùng chuyên gia.",
    iconName: "wine",
  },
  {
    id: "exp-chefs-table",
    title: "Chef's Table 7-Course",
    schedule: "Đặt trước 24h • 20:00",
    status: "Limited",
    description: "Trải nghiệm thực đơn 7 món nghệ thuật trình bày trực tiếp bởi Bếp trưởng điều hành.",
    iconName: "sparkles",
  },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: "storia-fine-dining",
    name: "Storià Fine Dining",
    tagline: "The Art Of Fine Plating",
    description:
      "Đắm mình trong không gian ẩm thực Ý đương đại, nơi mỗi đĩa thức ăn là một tác phẩm nghệ thuật được chế biến từ nguyên liệu thượng hạng nhập khẩu trực tiếp từ Milan và vùng Piemonte.",
    cuisine: "Ẩm thực Ý Đương Đại",
    rating: 4.9,
    reviewCount: 428,
    deliveryTime: "25 - 35 phút",
    deliveryFee: 25000,
    address: "88 Đồng Khởi, Quận 1, TP. Hồ Chí Minh",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    coverImageUrl:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=80",
    badge: "Best Restaurant",
    isOpen: true,
    openingHours: "17:00 - 23:30",
    menu: [
      {
        id: "storia-1",
        name: "Saffron Risotto Milanese",
        description:
          "Gạo Arborio nấu chậm cùng nhụy hoa nghệ tây Iran, sò điệp Hokkaido áp chảo và phô mai Parmigiano 36 tháng.",
        price: 420000,
        imageUrl:
          "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
        restaurantId: "storia-fine-dining",
        category: "Signature",
        badge: "Chef's Choice",
        prepTime: "20 phút",
        isAvailable: true,
      },
      {
        id: "storia-2",
        name: "Tarta Risotto & Black Truffle",
        description:
          "Risotto kem nấm Truffle đen vùng Umbria, phủ bò Wagyu tartar thái tay và vàng lá 24K thực phẩm.",
        price: 380000,
        imageUrl:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        restaurantId: "storia-fine-dining",
        category: "Signature",
        badge: "Popular",
        prepTime: "18 phút",
        isAvailable: true,
      },
      {
        id: "storia-3",
        name: "Tagliolini Al Tartufo",
        description:
          "Mì tươi thủ công 40 lòng đỏ trứng gà, sốt bơ Pháp êm dịu và nấm Truffle đen bào tươi tại bàn.",
        price: 360000,
        imageUrl:
          "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
        restaurantId: "storia-fine-dining",
        category: "Main Course",
        badge: "Signature",
        prepTime: "15 phút",
        isAvailable: true,
      },
      {
        id: "storia-4",
        name: "Fiorentina Wagyu Ribeye",
        description:
          "Thăn lưng bò Wagyu MB9+ nướng củi sồi (250g), dùng kèm tủy bò nướng, măng tây xanh và sốt rượu vang Chianti.",
        price: 890000,
        imageUrl:
          "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
        restaurantId: "storia-fine-dining",
        category: "Main Course",
        badge: "Chef's Choice",
        prepTime: "25 phút",
        isAvailable: true,
      },
      {
        id: "storia-5",
        name: "Burrata & Heirloom Tomato",
        description:
          "Phô mai tươi Burrata vùng Puglia béo ngậy, cà chua cổ điển Đà Lạt, dầu oliu Extra Virgin và giấm Balsamic 15 năm.",
        price: 260000,
        imageUrl:
          "https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?auto=format&fit=crop&w=800&q=80",
        restaurantId: "storia-fine-dining",
        category: "Starter",
        prepTime: "10 phút",
        isAvailable: true,
      },
      {
        id: "storia-6",
        name: "Tiramisu Alla Storià",
        description:
          "Bánh Savoiardi thấm đẫm Espresso Arabica và rượu Marsala, lớp kem Mascarpone mịn màng phủ bột cacao nguyên chất.",
        price: 195000,
        imageUrl:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
        restaurantId: "storia-fine-dining",
        category: "Dessert",
        badge: "Popular",
        prepTime: "10 phút",
        isAvailable: true,
      },
    ],
  },
  {
    id: "latelier-de-saigon",
    name: "L'Atelier de Saigon",
    tagline: "Symphony Of French Haute Cuisine",
    description:
      "Tinh hoa ẩm thực Pháp cổ điển kết hợp kỹ thuật Gastronomy hiện đại. Thực đơn được thiết kế tinh tế với gan ngỗng Pháp, tôm hùm xanh Brittany và các loại sốt truyền thống nấu suốt 48 giờ.",
    cuisine: "Ẩm thực Pháp Cao Cấp",
    rating: 4.8,
    reviewCount: 315,
    deliveryTime: "30 - 40 phút",
    deliveryFee: 30000,
    address: "24 Lê Thánh Tôn, Quận 1, TP. Hồ Chí Minh",
    imageUrl:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80",
    coverImageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
    badge: "Michelin Selected",
    isOpen: true,
    openingHours: "11:30 - 22:30",
    menu: [
      {
        id: "atelier-1",
        name: "Foie Gras Poêlé Aux Figues",
        description:
          "Gan ngỗng Pháp áp chảo vàng giòn bên ngoài, tan chảy bên trong, dùng kèm sung tươi caramel hóa và bánh Brioche nướng bơ.",
        price: 490000,
        imageUrl:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        restaurantId: "latelier-de-saigon",
        category: "Starter",
        badge: "Chef's Choice",
        prepTime: "15 phút",
        isAvailable: true,
      },
      {
        id: "atelier-2",
        name: "Homard Bleu Thermidor",
        description:
          "Tôm hùm xanh đút lò sốt kem nấm Cognac, phô mai Gruyère thượng hạng và thảo mộc tươi vùng Provence.",
        price: 950000,
        imageUrl:
          "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=800&q=80",
        restaurantId: "latelier-de-saigon",
        category: "Signature",
        badge: "Signature",
        prepTime: "25 phút",
        isAvailable: true,
      },
      {
        id: "atelier-3",
        name: "Magret de Canard À L'Orange",
        description:
          "Ức vịt Pháp áp chảo da giòn hồng đào, sốt cam Grand Marnier thanh tao kèm khoai tây nghiền bơ nấm Truffle.",
        price: 440000,
        imageUrl:
          "https://images.unsplash.com/photo-1514944298352-f4d732142f74?auto=format&fit=crop&w=800&q=80",
        restaurantId: "latelier-de-saigon",
        category: "Main Course",
        badge: "Popular",
        prepTime: "20 phút",
        isAvailable: true,
      },
      {
        id: "atelier-4",
        name: "Boeuf Bourguignon Tradition",
        description:
          "Má bò Úc hầm rượu vang đỏ Burgundy suốt 12 giờ cùng hành ngọc trai, nấm mỡ và thịt xông khói.",
        price: 410000,
        imageUrl:
          "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80",
        restaurantId: "latelier-de-saigon",
        category: "Main Course",
        prepTime: "18 phút",
        isAvailable: true,
      },
      {
        id: "atelier-5",
        name: "Soupe À L'Oignon Gratinée",
        description:
          "Súp hành tây Pháp nấu nước dùng bê cô đặc, phủ bánh mì Baguette nướng và lớp phô mai Comté kéo sợi.",
        price: 220000,
        imageUrl:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
        restaurantId: "latelier-de-saigon",
        category: "Starter",
        prepTime: "12 phút",
        isAvailable: true,
      },
      {
        id: "atelier-6",
        name: "Crème Brûlée Vanilla Tahiti",
        description:
          "Kem trứng nướng truyền thống với hạt vani Tahiti nguyên bản và lớp đường nâu khò lửa giòn rụm.",
        price: 185000,
        imageUrl:
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=800&q=80",
        restaurantId: "latelier-de-saigon",
        category: "Dessert",
        badge: "Popular",
        prepTime: "10 phút",
        isAvailable: true,
      },
    ],
  },
  {
    id: "kuroshio-omakase",
    name: "Kuroshio Omakase & Kaiseki",
    tagline: "Crafted By Master Itamae",
    description:
      "Trải nghiệm nghệ thuật Omakase Nhật Bản chuẩn mực với hải sản đánh bắt tự nhiên được vận chuyển đường hàng không mỗi sáng từ chợ Toyosu (Tokyo) và Hokkaido.",
    cuisine: "Ẩm thực Nhật Bản Omakase",
    rating: 4.9,
    reviewCount: 512,
    deliveryTime: "20 - 30 phút",
    deliveryFee: 25000,
    address: "15 Ngô Đức Kế, Quận 1, TP. Hồ Chí Minh",
    imageUrl:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80",
    coverImageUrl:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=80",
    badge: "Chef's Pick",
    isOpen: true,
    openingHours: "17:30 - 23:00",
    menu: [
      {
        id: "kuroshio-1",
        name: "Otoro & Uni Premium Don",
        description:
          "Cơm giấm đỏ Akazu phủ bụng cá ngừ vây xanh Otoro béo ngậy, cầu gai Bafun Uni Hokkaido và trứng cá tầm Caviar.",
        price: 780000,
        imageUrl:
          "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
        restaurantId: "kuroshio-omakase",
        category: "Signature",
        badge: "Chef's Choice",
        prepTime: "15 phút",
        isAvailable: true,
      },
      {
        id: "kuroshio-2",
        name: "Omakase Nigiri 10 Tuyệt Phẩm",
        description:
          "10 miếng Nigiri thượng hạng do bếp trưởng tuyển chọn trong ngày: Otoro, Chutoro, Kinmedai, Botan Ebi, Anago...",
        price: 920000,
        imageUrl:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
        restaurantId: "kuroshio-omakase",
        category: "Signature",
        badge: "Signature",
        prepTime: "20 phút",
        isAvailable: true,
      },
      {
        id: "kuroshio-3",
        name: "A5 Miyazaki Wagyu Sando",
        description:
          "Bánh mì sữa Hokkaido nướng bơ kẹp thăn nội bò Wagyu A5 Miyazaki chiên giòn lớp vỏ mỏng, sốt tương Truffle đen.",
        price: 650000,
        imageUrl:
          "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
        restaurantId: "kuroshio-omakase",
        category: "Main Course",
        badge: "Popular",
        prepTime: "18 phút",
        isAvailable: true,
      },
      {
        id: "kuroshio-4",
        name: "Gindara Saikyo Yaki (Cá Tuyết Đen)",
        description:
          "Cá tuyết đen Alaska ướp tương ngọt Saikyo Miso suốt 72 giờ, nướng than Binchotan thơm lừng và mềm tan.",
        price: 480000,
        imageUrl:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
        restaurantId: "kuroshio-omakase",
        category: "Main Course",
        prepTime: "20 phút",
        isAvailable: true,
      },
      {
        id: "kuroshio-5",
        name: "Hotate Carpaccio Yuzu Truffle",
        description:
          "Sò điệp sống Hokkaido thái lát mỏng, sốt thanh yên Yuzu Ponzu, dầu nấm Truffle trắng và trứng cá hồi Ikura.",
        price: 340000,
        imageUrl:
          "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
        restaurantId: "kuroshio-omakase",
        category: "Starter",
        prepTime: "12 phút",
        isAvailable: true,
      },
      {
        id: "kuroshio-6",
        name: "Uji Matcha Lava Terrine",
        description:
          "Bánh socola trắng kết hợp trà xanh Uji Kyoto thượng hạng, nhân chảy ấm nóng dùng kèm kem tươi Hokkaido.",
        price: 210000,
        imageUrl:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
        restaurantId: "kuroshio-omakase",
        category: "Dessert",
        badge: "New",
        prepTime: "10 phút",
        isAvailable: true,
      },
    ],
  },
  {
    id: "trattoria-bella-notte",
    name: "Trattoria Bella Notte",
    tagline: "Authentic Wood-Fired & Mediterranean Soul",
    description:
      "Hương vị Địa Trung Hải nồng nàn với lò nướng củi truyền thống 450 độ C, hải sản tươi sống vùng Amalfi và các món mì tươi chế biến theo công thức gia truyền 3 thế hệ.",
    cuisine: "Địa Trung Hải & Nướng Củi",
    rating: 4.7,
    reviewCount: 289,
    deliveryTime: "20 - 30 phút",
    deliveryFee: 20000,
    address: "42 Xuân Thủy, Thảo Điền, TP. Thủ Đức",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    coverImageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80",
    badge: "Top Rated",
    isOpen: true,
    openingHours: "10:30 - 23:00",
    menu: [
      {
        id: "bella-1",
        name: "Pizza Tartufo & Burrata Nướng Củi",
        description:
          "Đế bánh lên men tự nhiên 48h nướng lò củi, phủ sốt kem nấm Truffle đen, nấm rừng Porcini và nguyên trái Burrata tươi.",
        price: 390000,
        imageUrl:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        restaurantId: "trattoria-bella-notte",
        category: "Signature",
        badge: "Chef's Choice",
        prepTime: "15 phút",
        isAvailable: true,
      },
      {
        id: "bella-2",
        name: "Linguine Allo Scoglio (Hải Sản Amalfi)",
        description:
          "Mì Linguine xào tôm sú biển, vẹm xanh, mực ống, nghêu lụa cùng rượu vang trắng Pinot Grigio và cà chua bi.",
        price: 350000,
        imageUrl:
          "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80",
        restaurantId: "trattoria-bella-notte",
        category: "Main Course",
        badge: "Popular",
        prepTime: "18 phút",
        isAvailable: true,
      },
      {
        id: "bella-3",
        name: "Polpo Alla Griglia (Bạch Tuộc Nướng)",
        description:
          "Xúc tu bạch tuộc Địa Trung Hải nướng than thơm giòn, khoai tây nghiền nghệ tây, oliu đen Taggiasca và dầu ớt.",
        price: 370000,
        imageUrl:
          "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        restaurantId: "trattoria-bella-notte",
        category: "Starter",
        badge: "Signature",
        prepTime: "16 phút",
        isAvailable: true,
      },
      {
        id: "bella-4",
        name: "Branzino Al Forno (Cá Chẽm Đút Lò)",
        description:
          "Phi lê cá chẽm biển đút lò cùng thảo mộc tươi hương thảo, chanh vàng Sorrento, nụ bạch hoa và rau củ nướng.",
        price: 430000,
        imageUrl:
          "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=800&q=80",
        restaurantId: "trattoria-bella-notte",
        category: "Main Course",
        prepTime: "22 phút",
        isAvailable: true,
      },
      {
        id: "bella-5",
        name: "Prosciutto Di Parma & Melone",
        description:
          "Đùi heo muối Parma ủ 24 tháng thái lát mỏng như lụa, kết hợp dưa lưới mật ngọt thanh và phô mai Stracciatella.",
        price: 290000,
        imageUrl:
          "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80",
        restaurantId: "trattoria-bella-notte",
        category: "Starter",
        prepTime: "10 phút",
        isAvailable: true,
      },
      {
        id: "bella-6",
        name: "Panna Cotta Raspberry Coulis",
        description:
          "Panna Cotta kem tươi vani Madagascar mềm mịn, rưới sốt phúc bồn tử tươi chua thanh và lá bạc hà.",
        price: 165000,
        imageUrl:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
        restaurantId: "trattoria-bella-notte",
        category: "Dessert",
        prepTime: "8 phút",
        isAvailable: true,
      },
    ],
  },
];

export const ALL_MENU_ITEMS: MenuItem[] = RESTAURANTS.flatMap(
  (restaurant) => restaurant.menu
);

export const SIGNATURE_DISHES: (MenuItem & { restaurantName: string })[] =
  RESTAURANTS.flatMap((restaurant) =>
    restaurant.menu
      .filter((item) => item.badge === "Chef's Choice" || item.badge === "Popular" || item.badge === "Signature")
      .slice(0, 2)
      .map((item) => ({
        ...item,
        restaurantName: restaurant.name,
      }))
  );

export function getRestaurantById(id: string): Restaurant | undefined {
  return RESTAURANTS.find((restaurant) => restaurant.id === id);
}
